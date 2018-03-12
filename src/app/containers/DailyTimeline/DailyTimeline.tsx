import * as React from 'react';
import {
    allAssignments,
    allAssignmentDuties
} from '../../modules/assignments/selectors';
import {
    getAssignments,
    getAssignmentDuties,
    linkAssignment,
    unlinkAssignment
} from '../../modules/assignments/actions';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {
    Assignment,
    AssignmentDuty
} from '../../api/index';
import * as moment from 'moment';
import './DailyTimeline.css';
import AssignmentDutyCard from '../../components/AssignmentDutyCard';
import { IdType, WorkSectionId } from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';
import { getWorkSectionColour } from '../../api/utils';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { TimelineProps } from '../../components/Timeline/Timeline';
import AssignmentCard from '../../components/AssignmentCard';

interface DailyTimelineProps extends TimelineProps {
    allowTimeDrag?: boolean;
}

interface DailyTimelineDispatchProps {
    fetchAssignmentDuties: () => void;
    fetchAssignments: () => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType }) => void;
    unlinkSheriff: (link: { sheriffId: IdType, dutyId: IdType }) => void;
}

interface DailyTimelineStateProps {
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
}

class DailyTimeline extends React.Component<DailyTimelineProps & DailyTimelineStateProps & DailyTimelineDispatchProps> {

    componentWillMount() {
        const { fetchAssignmentDuties, fetchAssignments } = this.props;
        if (fetchAssignmentDuties) {
            fetchAssignmentDuties();
        }

        if (fetchAssignments) {
            fetchAssignments();
        }
    }

    render() {
        const {
            assignments = [],
            assignmentDuties = [],
            sidebarWidth = 200,
            onVisibleTimeChange,
            linkSheriff,
            unlinkSheriff,
            visibleTimeStart = moment().startOf('day').add(7, 'hours'),
            visibleTimeEnd = moment().endOf('day').subtract(6, 'hours'),
            ...rest
        } = this.props;

        const workSectionMap = assignments.reduce<{ [key: string]: WorkSectionId }>(
            (map, assignment) => {
                map[assignment.id] = assignment.workSectionId;
                return map;
            },
            {});

        return (
            <div className="daily-timeline">
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
                    itemRenderer={(duty) => (
                        <AssignmentDutyCard
                            duty={duty}
                            style={{
                                backgroundColor: getWorkSectionColour(workSectionMap[duty.assignmentId])
                            }}
                            onDropSheriff={({ badgeNumber: sheriffId }) => (
                                linkSheriff && linkSheriff({ sheriffId, dutyId: duty.id })
                            )}
                            SheriffAssignmentRenderer={(p) => (
                                <SheriffDutyBarList
                                    {...p}
                                    BarRenderer={ConnectedSheriffDutyBar}
                                    onRemove={(sheriffId) => {
                                        unlinkSheriff({ sheriffId, dutyId: duty.id });
                                    }}
                                />
                            )}
                        />
                    )}
                    {...rest}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: DailyTimelineProps) => {
    return {
        assignmentDuties: allAssignmentDuties(state),
        assignments: allAssignments(state)
    };
};

const mapDispatchToProps = {
    fetchAssignments: getAssignments,
    fetchAssignmentDuties: getAssignmentDuties,
    linkSheriff: linkAssignment,
    unlinkSheriff: unlinkAssignment
};

export default connect<DailyTimelineStateProps, DailyTimelineDispatchProps, DailyTimelineProps>(
    mapStateToProps, mapDispatchToProps)(DailyTimeline);

