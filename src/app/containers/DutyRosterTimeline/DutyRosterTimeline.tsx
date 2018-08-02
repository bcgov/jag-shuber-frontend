import React from 'react';
import moment from 'moment';
import {
    allAssignments,
    allAssignmentDuties,
} from '../../modules/assignments/selectors';
import {
    getAssignments,
    getAssignmentDuties,
    linkAssignment,
} from '../../modules/assignments/actions';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import './DutyRosterTimeline.css';
import AssignmentDutyCard from '../../components/AssignmentDutyCard/AssignmentDutyCard';
import {
    IdType,
    WorkSectionCode,
    DateRange,
    Assignment,
    AssignmentDuty,
    SheriffDuty,
} from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';
import { getWorkSectionColour } from '../../api/utils';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { TimelineProps } from '../../components/Timeline/Timeline';
import AssignmentCard from '../../components/AssignmentCard/AssignmentCard';
import { getForegroundColor } from '../../infrastructure/colorUtils';
import { visibleTime, dutiesForDraggingSheriff, draggingSheriff } from '../../modules/dutyRoster/selectors';
import AssignmentDutyEditModal from '../AssignmentDutyEditModal';
import * as TimeRangeUtils from '../../infrastructure/TimeRangeUtils';
import ConfirmationModal, { ConnectedConfirmationModalProps } from '../ConfirmationModal';
import SheriffNameDisplay from '../SheriffNameDisplay';
import SheriffDutyDragSource from '../SheriffDutyDragSource';
import AssignmentSheriffDutyReassignmentModal from '../AssignmentSheriffDutyReassignmentModal';

interface DutyRosterTimelineProps extends TimelineProps {
    allowTimeDrag?: boolean;
}

interface DutyRosterTimelineDispatchProps {
    fetchAssignmentDuties: (dateRange: DateRange) => void;
    fetchAssignments: (dateRange: DateRange) => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType }) => void;
    showAssignmentDutyEditModal: (id: IdType) => void;
    showConfirmationModal: (props: ConnectedConfirmationModalProps) => void;
    showSheriffDutySplittingModal: (source: SheriffDuty, target: SheriffDuty) => void;
}

interface DutyRosterTimelineStateProps {
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
    draggingSheriffAssignmentDuties: AssignmentDuty[];
    draggingSheriffId?: IdType;
}

type CompositeProps = DutyRosterTimelineProps & DutyRosterTimelineStateProps & DutyRosterTimelineDispatchProps;
class DutyRosterTimeline extends React.Component<CompositeProps> {

    componentWillMount() {
        const {
            fetchAssignmentDuties,
            fetchAssignments,
            visibleTimeStart: startDate,
            visibleTimeEnd: endDate,
        } = this.props;

        const dateRange = { startDate, endDate };
        /* tslint:disable:no-unused-expression */
        fetchAssignments && fetchAssignments(dateRange);
        fetchAssignmentDuties && fetchAssignmentDuties(dateRange);
        /* tslint:enable:no-unused-expression */
    }

    componentWillReceiveProps(nextProps: CompositeProps) {
        const {
            visibleTimeStart: prevStartDate,
            visibleTimeEnd: prevEndDate
        } = this.props;
        const {
            visibleTimeStart: nextStartDate,
            visibleTimeEnd: nextEndDate,
            fetchAssignmentDuties,
            fetchAssignments
        } = nextProps;

        if (!moment(prevStartDate).isSame(moment(nextStartDate)) || !moment(prevEndDate).isSame(moment(nextEndDate))) {
            const dateRange = { startDate: nextStartDate, endDate: nextEndDate };
            // tslint:disable:no-unused-expression
            fetchAssignments && fetchAssignments(dateRange);
            fetchAssignmentDuties && fetchAssignmentDuties(dateRange);
            // tslint:enable:no-unused-expression           
        }
    }

    protected isOverlappingSheriffDuties(dutyId: IdType, sheriffDutyId: IdType): boolean {
        const {
            draggingSheriffAssignmentDuties = [],
            assignmentDuties = [],
            draggingSheriffId
        } = this.props;

        const dutyWithSheriffDutyToAssign = assignmentDuties.find(ad => ad.id === dutyId);
        let sheriffDutyToAssign: SheriffDuty | undefined;
        if (dutyWithSheriffDutyToAssign !== undefined) {
            sheriffDutyToAssign = dutyWithSheriffDutyToAssign.sheriffDuties.find(sd => sd.id === sheriffDutyId);
        }

        let anyOverlap: boolean = false;
        if (dutyWithSheriffDutyToAssign) {
            if (sheriffDutyToAssign !== undefined) {
                const sdToAssignStartTime = moment(sheriffDutyToAssign.startDateTime).toISOString();
                const sdToAssignEndTime = moment(sheriffDutyToAssign.endDateTime).toISOString();

                const sheriffDutiesForDraggingSheriff =
                    draggingSheriffAssignmentDuties.reduce((sduties: SheriffDuty[], duty) => {
                        sduties.push(...duty.sheriffDuties.filter(sd => sd.sheriffId === draggingSheriffId));
                        return sduties;
                    }, []);

                anyOverlap = sheriffDutiesForDraggingSheriff.some(sd => TimeRangeUtils
                    .doTimeRangesOverlap(
                        // tslint:disable-next-line:max-line-length
                        { startTime: moment(sd.startDateTime).toISOString(), endTime: moment(sd.endDateTime).toISOString() },
                        { startTime: sdToAssignStartTime, endTime: sdToAssignEndTime }
                    ));
            }
        }

        return anyOverlap;
    }
    protected onDropSheriff(dutyId: IdType, sheriffDutyId: IdType, sheriffId: IdType) {
        const {
            linkSheriff,
            showConfirmationModal
        } = this.props;

        if (this.isOverlappingSheriffDuties(dutyId, sheriffDutyId)) {
            const confirmMessage = <h3>Assign {<SheriffNameDisplay id={sheriffId} />} to overlapping duties?</h3>;
            showConfirmationModal(
                {
                    confirmationMessage: confirmMessage,
                    confirmBtnLabel: 'OK',
                    // tslint:disable-next-line:no-unused-expression
                    onConfirm: () => { linkSheriff && linkSheriff({ sheriffId, dutyId, sheriffDutyId }); }
                }
            );
        } else {
            // tslint:disable-next-line:no-unused-expression
            linkSheriff && linkSheriff({ sheriffId, dutyId, sheriffDutyId });
        }
    }

    render() {
        const {
            assignments = [],
            assignmentDuties = [],
            sidebarWidth = 200,
            onVisibleTimeChange,
            linkSheriff,
            visibleTimeStart,
            visibleTimeEnd,
            showAssignmentDutyEditModal,
            draggingSheriffAssignmentDuties = [],
            draggingSheriffId,
            showSheriffDutySplittingModal,
            ...rest
        } = this.props;

        const workSectionMap = assignments.reduce<{ [key: string]: WorkSectionCode }>(
            (map, assignment) => {
                map[assignment.id] = assignment.workSectionId;
                return map;
            },
            {});

        return (
            <div className="duty-roster-timeline">
                <AssignmentTimeline
                    allowChangeTime={false}
                    items={assignmentDuties}
                    groups={assignments}
                    sidebarWidth={sidebarWidth}
                    visibleTimeStart={visibleTimeStart}
                    visibleTimeEnd={visibleTimeEnd}
                    itemHeightRatio={.97}
                    groupRenderer={(assignment) => (
                        <AssignmentCard assignment={assignment} />
                    )}
                    itemRenderer={(duty) => {
                        const workSectionColor = getWorkSectionColour(workSectionMap[duty.assignmentId]);
                        const color = getForegroundColor(workSectionColor);
                        return (
                            <AssignmentDutyCard
                                duty={duty}
                                style={{
                                    borderColor: workSectionColor,
                                    color
                                }}
                                onDoubleClick={() => showAssignmentDutyEditModal(duty.id)}
                                SheriffAssignmentRenderer={(p) => (
                                    <SheriffDutyBarList
                                        {...p}
                                        BarRenderer={(barP) => {
                                            const { sheriffDuty } = barP;
                                            const isAssignedToDraggingSheriff =
                                                draggingSheriffId && sheriffDuty.sheriffId === draggingSheriffId;
                                            const isOpen = !this.isOverlappingSheriffDuties(duty.id, sheriffDuty.id);
                                            const style: React.CSSProperties = {
                                                opacity: isAssignedToDraggingSheriff || isOpen ? 1 : .6
                                            };
                                            const classNames: string[] = ['sheriff-duty'];
                                            classNames.push(!isOpen ? 'is-overlap' : '');
                                            classNames.push(color === '#FFFFFF' ? 'light' : 'dark');
                                            return (
                                                <SheriffDutyDragSource
                                                    sheriffDuty={sheriffDuty} 
                                                >
                                                    <ConnectedSheriffDutyBar
                                                        {...barP}
                                                        style={style}
                                                        canDropSheriff={() => true}
                                                        className={classNames.join(' ')}
                                                    />
                                                </SheriffDutyDragSource>
                                            );
                                        }}
                                        onDropSheriff={
                                            ({ id: sheriffId }, { id: sheriffDutyId }) =>
                                                this.onDropSheriff(duty.id, sheriffDutyId, sheriffId)}
                                        onDropSheriffDuty={
                                            (source: SheriffDuty, target: SheriffDuty) => 
                                                showSheriffDutySplittingModal(source, target)
                                        }
                                        workSection={workSectionMap[duty.assignmentId]}
                                    />
                                )}
                            />
                        );
                    }}
                    {...rest}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: DutyRosterTimelineProps) => {
    const currentVisibleTime = visibleTime(state);
    return {
        assignmentDuties: allAssignmentDuties(state),
        assignments: allAssignments(state),
        ...currentVisibleTime,
        draggingSheriffAssignmentDuties: dutiesForDraggingSheriff(state),
        draggingSheriffId: draggingSheriff(state)
    };
};

export default connect<DutyRosterTimelineStateProps, DutyRosterTimelineDispatchProps, DutyRosterTimelineProps>(
    mapStateToProps,
    {
        fetchAssignments: getAssignments,
        fetchAssignmentDuties: getAssignmentDuties,
        linkSheriff: linkAssignment,
        showAssignmentDutyEditModal: (id: IdType) => AssignmentDutyEditModal.ShowAction(id),
        showConfirmationModal: (props: ConnectedConfirmationModalProps) => ConfirmationModal.ShowAction(props),
        showSheriffDutySplittingModal: (source: SheriffDuty, target: SheriffDuty) => 
                                                AssignmentSheriffDutyReassignmentModal.ShowAction(source, target)
    }
)(DutyRosterTimeline);
