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
    SheriffDutyLink,
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
import { doTimeRangesOverlap, isTimeWithin, TimeRange } from 'jag-shuber-api';
import { allShifts } from '../../modules/shifts/selectors';

interface DutyRosterTimelineProps extends TimelineProps {
    allowTimeDrag?: boolean;
}

interface DutyRosterTimelineDispatchProps {
    fetchAssignmentDuties: (dateRange: DateRange) => void;
    fetchAssignments: (dateRange: DateRange) => void;
    linkSheriff: (link: SheriffDutyLink) => void;
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

    componentDidMount() {
        setTimeout(() => {
            // Work around for react-calendar-timeline issue 411
            // Miss alignment of headers on initial load
            // #https://github.com/namespace-ee/react-calendar-timeline/issues/411
            window.dispatchEvent(new Event('resize'));
        }, 500);

        window.addEventListener("resize", this.onWindowResize);
    }

    onWindowResize() {
        // Work around for react-calendar-timeline issue 411
        // Miss alignment of headers when scrollbar is visible
        let timeline = document.getElementsByClassName('react-calendar-timeline')[0];
        if (timeline.scrollHeight > timeline.clientHeight) {
            // resize timeline component with correct width if scrollbar is visible
            let header = document.getElementsByClassName('rct-header')[0];
            header.parentElement!.style.width = `${header.parentElement!.clientWidth - 20}px`;
        }
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

    protected isSheriffDutyOutsideOfShift(
        sheriffToAssign: IdType = '',
        sheriffDuty: SheriffDuty): boolean {

        if (!sheriffToAssign) return false;
        const {
            sheriffsOnShift = [],
            visibleTimeStart
        } = this.props;

        const visibleStartMoment = moment(visibleTimeStart);
        const shiftsFound = sheriffsOnShift
        .filter(shift => shift.sheriffId == sheriffToAssign)
        .filter(shift => visibleStartMoment.isSame(moment(shift.startDateTime), 'day'))
        .filter(shift => {
            const shiftRange = { startTime: shift.startDateTime, endTime: shift.endDateTime } as TimeRange;
            const dutyRange = { startTime: sheriffDuty.startDateTime, endTime: sheriffDuty.endDateTime } as TimeRange;
            return isTimeWithin(shiftRange.startTime, dutyRange) || isTimeWithin(shiftRange.endTime, dutyRange);
        });

        return shiftsFound.length == 0;
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

    protected getUnassignedTimeRanges(): { [key: string]: SheriffUnassignedRange[] } {

        const {
            assignmentDuties = [],
            sheriffsOnShift,
            visibleTimeStart
        } = this.props;

        const visibleStartMoment = moment(visibleTimeStart);
        let sheriffUnassignedTimeRanges: { [key: string]: SheriffUnassignedRange[] } = {}

        sheriffsOnShift
        .filter(shift => shift.sheriffId)
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
        .filter(duty => duty.sheriffId)
        .sort((a,b) => moment(a.startDateTime).diff(moment(a.endDateTime)) - moment(b.startDateTime).diff(moment(b.endDateTime)))
        .forEach(sheriffDuty => {
            const unassignedTimeRanges = sheriffUnassignedTimeRanges[sheriffDuty.sheriffId!] || [];
            const dutyTimeRange = { startTime: moment(sheriffDuty.startDateTime), endTime: moment(sheriffDuty.endDateTime) } ;
            const addedUnassignedTimeRanges: SheriffUnassignedRange[] = [];
            const removedIndexes: number[] = [];
            unassignedTimeRanges.forEach((unassignedTimeRange, index) => {
                const unassignedRange = { startTime: moment(unassignedTimeRange.startDateTime), endTime: moment(unassignedTimeRange.endDateTime) };
                const overlap = doTimeRangesOverlap(dutyTimeRange, unassignedRange);
                if (overlap) {
                    removedIndexes.push(index);
                    if (unassignedRange.startTime < dutyTimeRange.startTime)
                    {
                        addedUnassignedTimeRanges.push({ 
                            sheriffId: sheriffDuty.sheriffId!,
                            startDateTime: unassignedRange.startTime, 
                            endDateTime: dutyTimeRange.startTime
                        });
                    } 
                    
                    if (unassignedRange.endTime > dutyTimeRange.endTime)
                    {
                        addedUnassignedTimeRanges.push({ 
                            sheriffId: sheriffDuty.sheriffId!,
                            startDateTime: dutyTimeRange.endTime, 
                            endDateTime: unassignedRange.endTime
                        });
                    }

                }
            });

            removedIndexes.forEach(i => unassignedTimeRanges.splice(i, 1));
            addedUnassignedTimeRanges.forEach(add => unassignedTimeRanges.push(add));
            
        });

        return sheriffUnassignedTimeRanges;
    }

    protected onDropSheriff(dutyId: IdType, sheriffDutyToAssign: SheriffDuty, sheriffId: IdType) {
        const {
            linkSheriff,
            showConfirmationModal
        } = this.props;

        const sheriffDutyId = sheriffDutyToAssign.id;

        const isOverlapping = this.getOverlappingSheriffDutiesForSheriff(sheriffId, sheriffDutyToAssign).length > 0;
        const isOutsideOfShift = this.isSheriffDutyOutsideOfShift(sheriffId, sheriffDutyToAssign);

        if ((isOutsideOfShift || isOverlapping) && sheriffDutyToAssign.sheriffId != sheriffId)
        {
            showConfirmationModal(
                {
                    confirmationMessage: <div>
                        { (isOverlapping) ? <h3>Assign {<SheriffNameDisplay id={sheriffId} />} to overlapping duties?</h3> : null }
                        { (isOutsideOfShift) ? <h3>This assignment is outside of {<SheriffNameDisplay id={sheriffId} />}'s shift. Schedule anyway?</h3> : null }
                    </div>,
                    confirmBtnLabel: 'OK',
                    onConfirm: () => { linkSheriff && linkSheriff({ sheriffId, dutyId, sheriffDutyId }); }
                }
            );
        } else {
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

        const unassignedTime = this.getUnassignedTimeRanges();
        return (
            <div className="duty-roster-timeline">
                <AssignmentTimeline
                    allowChangeTime={false}
                    items={assignmentDuties}
                    groups={assignments}
                    sidebarWidth={sidebarWidth}
                    visibleTimeStart={moment(visibleTimeStart).valueOf()}
                    visibleTimeEnd={moment(visibleTimeEnd).valueOf()}
                    itemHeightRatio={.97}
                    groupRenderer={(assignment) => (
                        <AssignmentCard assignment={assignment} />
                    )}
                    itemRenderer={(duty) => {
                        return (
                            <AssignmentDutyCard
                                unassignedTimeRanges={unassignedTime}
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
                                            const isOpen = 
                                                this.getOverlappingSheriffDutiesForSheriff(draggingSheriffId, sheriffDuty).length <= 0 &&
                                                this.isSheriffDutyOutsideOfShift(draggingSheriffId, sheriffDuty) == false;

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
