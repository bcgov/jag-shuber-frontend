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
} from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';
import { getWorkSectionColour } from '../../api/utils';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { TimelineProps } from '../../components/Timeline/Timeline';
import AssignmentCard from '../../components/AssignmentCard/AssignmentCard';
import { getForegroundColor } from '../../infrastructure/colorUtils';
import { visibleTime } from '../../modules/timeline/selectors';
import AssignmentDutyEditModal from '../AssignmentDutyEditModal';

interface DutyRosterTimelineProps extends TimelineProps {
    allowTimeDrag?: boolean;
}

interface DutyRosterTimelineDispatchProps {
    fetchAssignmentDuties: (dateRange: DateRange) => void;
    fetchAssignments: (dateRange:DateRange) => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType }) => void;
    showAssignmentDutyEditModal: (id: IdType) => void;
}

interface DutyRosterTimelineStateProps {
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
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

        const dateRange = {startDate,endDate};
        /* tslint:disable:no-unused-expression */
        fetchAssignments && fetchAssignments(dateRange);
        fetchAssignmentDuties && fetchAssignmentDuties(dateRange);
        /* tslint:enable:no-unused-expression */
    }

    componentWillReceiveProps(nextProps: CompositeProps) {
        const { visibleTimeStart: prevStartDate, visibleTimeEnd: prevEndDate } = this.props;
        const { visibleTimeStart: nextStartDate, visibleTimeEnd: nextEndDate, fetchAssignmentDuties, fetchAssignments } = nextProps;

        if (!moment(prevStartDate).isSame(moment(nextStartDate)) || !moment(prevEndDate).isSame(moment(nextEndDate))) {
            const dateRange = { startDate: nextStartDate, endDate: nextEndDate };
            // tslint:disable:no-unused-expression
            fetchAssignments && fetchAssignments(dateRange);
            fetchAssignmentDuties && fetchAssignmentDuties(dateRange);
            // tslint:enable:no-unused-expression           
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
                                // details={details}
                                onClick={() => showAssignmentDutyEditModal(duty.id)}
                                SheriffAssignmentRenderer={(p) => (
                                    <SheriffDutyBarList
                                        {...p}
                                        BarRenderer={ConnectedSheriffDutyBar}
                                        onDropSheriff={({ id: sheriffId }, { id: sheriffDutyId }) => (
                                            linkSheriff && linkSheriff({ sheriffId, dutyId: duty.id, sheriffDutyId })
                                        )}
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
        ...currentVisibleTime
    };
};

export default connect<DutyRosterTimelineStateProps, DutyRosterTimelineDispatchProps, DutyRosterTimelineProps>(
    mapStateToProps,
    {
        fetchAssignments: getAssignments,
        fetchAssignmentDuties: getAssignmentDuties,
        linkSheriff: linkAssignment,
        showAssignmentDutyEditModal: (id: IdType) => AssignmentDutyEditModal.ShowAction(id)
    }
)(DutyRosterTimeline);
