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
    DateType,
    Shift,
    SheriffUnassignedRange,
} from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { TimelineProps } from '../../components/Timeline/Timeline';
import AssignmentCard from '../../components/AssignmentCard/AssignmentCard';
import {
    visibleTime,
    dutiesForDraggingSheriff,
    draggingSheriff,
} from '../../modules/dutyRoster/selectors';
import AssignmentDutyEditModal from '../AssignmentDutyEditModal';
import ConfirmationModal, { ConnectedConfirmationModalProps } from '../ConfirmationModal';
import SheriffNameDisplay from '../SheriffNameDisplay';
import SheriffDutyDragSource from '../SheriffDutyDragSource';
import AssignmentSheriffDutyReassignmentModal from '../AssignmentSheriffDutyReassignmentModal';
import { updateDraggingSheriff } from '../../modules/dutyRoster/actions';
import { TimelineMarkers, TodayMarker } from 'react-calendar-timeline';
import { doTimeRangesOverlap } from 'jag-shuber-api';
import { allShifts } from '../../modules/shifts/selectors';

interface DutyRosterTimelineProps extends TimelineProps {
    allowTimeDrag?: boolean;
}

interface DutyRosterTimelineDispatchProps {
    fetchAssignmentDuties: (dateRange: DateRange) => void;
    fetchAssignments: (dateRange: DateRange) => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType }) => void;
    showAssignmentDutyEditModal: (id: IdType) => void;
    showConfirmationModal: (props: ConnectedConfirmationModalProps) => void;
    showSheriffDutySplittingModal: (source: SheriffDuty, target: SheriffDuty, overlappingDuties: SheriffDuty[]) => void;
    setDraggingSheriff: (sheriffId?: IdType) => void;
}

interface DutyRosterTimelineStateProps {
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
    draggingSheriffAssignmentDuties: AssignmentDuty[];
    draggingSheriffId?: IdType;
    willAssigningSheriffBeDoubleBooked?: boolean;
    sheriffsOnShift: Shift[];
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

    protected getOverlappingSheriffDutiesForSheriff(
        sheriffToAssign: IdType = '',
        sheriffDutyToAssign: SheriffDuty,
        sourceSheriffDuty?: SheriffDuty): SheriffDuty[] {

        const {
            assignmentDuties = []
        } = this.props;

        const sdToAssignStartTime = moment(sheriffDutyToAssign.startDateTime).toISOString();
        const sdToAssignEndTime = moment(sheriffDutyToAssign.endDateTime).toISOString();

        const sheriffDutiesForSheriffToAssign =
            assignmentDuties.reduce((sduties: SheriffDuty[], duty) => {
                sduties.push(...duty.sheriffDuties.filter(sd => sd.sheriffId === sheriffToAssign));
                return sduties;
            }, []);

        const overlappingDuties = sheriffDutiesForSheriffToAssign.filter(sd => doTimeRangesOverlap(
                // tslint:disable-next-line:max-line-length
                { startTime: moment(sd.startDateTime).toISOString(), endTime: moment(sd.endDateTime).toISOString() },
                { startTime: sdToAssignStartTime, endTime: sdToAssignEndTime }
            ));

        return overlappingDuties;
    }

    protected getUnassignedTimeRangesForSheriff(
        dutyId: IdType = '',
    ): { [key: string]: SheriffUnassignedRange[] } {

        const {
            assignmentDuties = [],
            sheriffsOnShift,
            visibleTimeStart
        } = this.props;

        const visibleStartMoment = moment(visibleTimeStart);
        let sheriffUnassignedTimeRanges: { [key: string]: SheriffUnassignedRange[] } = {}

        sheriffsOnShift
        .filter(shift => visibleStartMoment.isSame(moment(shift.startDateTime), 'day'))
        .forEach(shift => {
            sheriffUnassignedTimeRanges[shift.sheriffId!] = sheriffUnassignedTimeRanges[shift.sheriffId!] || [];
            sheriffUnassignedTimeRanges[shift.sheriffId!].push({ 
                sheriffId: shift.sheriffId!,
                startDateTime: shift.startDateTime, 
                endDateTime: shift.endDateTime
            });
        });

        assignmentDuties
        .filter(duty => visibleTimeStart.isSame(moment(duty.startDateTime), 'day'))
        .reduce((sduties: SheriffDuty[], duty) => {
            sduties.push(...duty.sheriffDuties);
            return sduties;
        }, [])
        .forEach(sheriffDuty => {
            let unassignedTimeRanges = sheriffUnassignedTimeRanges[sheriffDuty.sheriffId!] || [];
            
            const dutyStartTime = moment(sheriffDuty.startDateTime);
            const dutyEndTime = moment(sheriffDuty.endDateTime);
            unassignedTimeRanges.forEach((unassignedTimeRange, index) => {
                const range = { startTime: moment(unassignedTimeRange.startDateTime), endTime: moment(unassignedTimeRange.endDateTime) };
                const overlap = doTimeRangesOverlap({ startTime: dutyStartTime, endTime: dutyEndTime }, range);
                if (overlap) {
                    unassignedTimeRanges.splice(index, 1);
                    if (range.startTime < dutyStartTime)
                    {
                        unassignedTimeRanges.push({ 
                            sheriffId: sheriffDuty.sheriffId!,
                            startDateTime: range.startTime, 
                            endDateTime: dutyStartTime
                        });
                    } 
                    
                    if (range.endTime > dutyEndTime)
                    {
                        unassignedTimeRanges.push({ 
                            sheriffId: sheriffDuty.sheriffId!,
                            startDateTime: dutyEndTime, 
                            endDateTime: range.endTime
                        });
                    }

                }
            });
        });

        return sheriffUnassignedTimeRanges;
    }

    protected onDropSheriff(dutyId: IdType, sheriffDutyToAssign: SheriffDuty, sheriffId: IdType) {
        const {
            linkSheriff,
            showConfirmationModal
        } = this.props;

        const sheriffDutyId = sheriffDutyToAssign.id;

        if (this.getOverlappingSheriffDutiesForSheriff(sheriffId, sheriffDutyToAssign).length > 0) {
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
            setDraggingSheriff,
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
                        return (
                            <AssignmentDutyCard
                                unassignedTimeRanges={this.getUnassignedTimeRangesForSheriff(duty.id)}
                                duty={duty}
                                onDoubleClick={() => showAssignmentDutyEditModal(duty.id)}
                                SheriffAssignmentRenderer={(p) => (
                                    <SheriffDutyBarList
                                        {...p}
                                        BarRenderer={(barP) => {
                                            const { sheriffDuty } = barP;
                                            const isAssignedToDraggingSheriff =
                                                draggingSheriffId && sheriffDuty.sheriffId === draggingSheriffId;
                                            // tslint:disable-next-line:max-line-length
                                            const isOpen = this.getOverlappingSheriffDutiesForSheriff(draggingSheriffId, sheriffDuty).length <= 0;
                                            const style: React.CSSProperties = {
                                                opacity: isAssignedToDraggingSheriff || isOpen ? 1 : .6
                                            };
                                            const classNames: string[] = ['sheriff-duty'];
                                            classNames.push(!isOpen ? 'is-overlap' : '');
                                            classNames.push(duty && duty.style && duty.style.color === '#FFFFFF' ? 'light' : 'dark');
                                            return (
                                                <SheriffDutyDragSource
                                                    sheriffDuty={sheriffDuty}
                                                    canDrag={sd => sd.sheriffId != undefined}
                                                    beginDrag={() => setDraggingSheriff(sheriffDuty.sheriffId)}
                                                    endDrag={() => setDraggingSheriff()}
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
                                            ({ id: sheriffId }, sheriffDutyToAssign: SheriffDuty) =>
                                                this.onDropSheriff(duty.id, sheriffDutyToAssign, sheriffId)}
                                        onDropSheriffDuty={
                                            (source: SheriffDuty, target: SheriffDuty) =>
                                                showSheriffDutySplittingModal(
                                                    source,
                                                    target,
                                                    this.getOverlappingSheriffDutiesForSheriff(source.sheriffId, target, source)
                                                )
                                        }
                                        workSection={workSectionMap[duty.assignmentId]}
                                    />
                                )}
                            />
                        );
                    }}
                    {...rest}
                >
                    <TimelineMarkers>
                        <TodayMarker>
                            {({ styles }: { styles: React.CSSProperties, date: DateType }) => {
                                return <div style={{ ...styles, backgroundColor: 'red' }} />;
                            }}
                        </TodayMarker>
                    </TimelineMarkers>
                </AssignmentTimeline>
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
        draggingSheriffId: draggingSheriff(state),
        sheriffsOnShift: allShifts(state)
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
        showSheriffDutySplittingModal: (source: SheriffDuty, target: SheriffDuty, overlappingDuties: SheriffDuty[]) =>
            AssignmentSheriffDutyReassignmentModal.ShowAction(source, target, overlappingDuties),
        setDraggingSheriff: updateDraggingSheriff
    }
)(DutyRosterTimeline);
