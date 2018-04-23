import * as React from 'react';
import * as moment from 'moment';
import {
    allAssignments,
    allAssignmentDuties
} from '../../modules/assignments/selectors';
import {
    getAssignments,
    getAssignmentDuties,
    linkAssignment
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
    AssignmentDuty
} from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';
import { getWorkSectionColour } from '../../api/utils';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { TimelineProps } from '../../components/Timeline/Timeline';
import AssignmentCard from '../../components/AssignmentCard/AssignmentCard';
import { getForegroundColor } from '../../infrastructure/colorUtils';
import { visibleTime } from '../../modules/timeline/selectors';

interface DutyRosterTimelineProps extends TimelineProps {
    allowTimeDrag?: boolean;
}

interface DutyRosterTimelineDispatchProps {
    fetchAssignmentDuties: (dateRange: DateRange) => void;
    fetchAssignments: () => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType }) => void;
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
            visibleTimeEnd: endDate
        } = this.props;

        /* tslint:disable:no-unused-expression */
        fetchAssignmentDuties && fetchAssignmentDuties({ startDate, endDate });
        fetchAssignments && fetchAssignments();
        /* tslint:enable:no-unused-expression */
    }

    componentWillReceiveProps(nextProps: CompositeProps) {
        const { visibleTimeStart: prevStartDate, visibleTimeEnd: prevEndDate } = this.props;
        const { visibleTimeStart: nextStartDate, visibleTimeEnd: nextEndDate, fetchAssignmentDuties } = nextProps;

        if (!moment(prevStartDate).isSame(moment(nextStartDate)) || !moment(prevEndDate).isSame(moment(nextEndDate))) {
            // tslint:disable-next-line:no-unused-expression
            fetchAssignmentDuties && fetchAssignmentDuties({ startDate: nextStartDate, endDate: nextEndDate });
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

const mapDispatchToProps = {
    fetchAssignments: getAssignments,
    fetchAssignmentDuties: getAssignmentDuties,
    linkSheriff: linkAssignment,
};

export default connect<DutyRosterTimelineStateProps, DutyRosterTimelineDispatchProps, DutyRosterTimelineProps>(
    mapStateToProps, mapDispatchToProps)(DutyRosterTimeline);
