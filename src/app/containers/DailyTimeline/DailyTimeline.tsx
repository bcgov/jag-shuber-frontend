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
import AssignmentDutyCard from '../../components/AssignmentDutyCard/AssignmentDutyCard';
import { IdType, WorkSectionCode } from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';
import { getWorkSectionColour } from '../../api/utils';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { TimelineProps } from '../../components/Timeline/Timeline';
import AssignmentCard from '../../components/AssignmentCard/AssignmentCard';
import { getForegroundColor } from '../../infrastructure/colorUtils';

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

        const workSectionMap = assignments.reduce<{ [key: string]: WorkSectionCode }>(
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
                                onDropSheriff={({ id: sheriffId }) => (
                                    linkSheriff && linkSheriff({ sheriffId, dutyId: duty.id })
                                )}
                                SheriffAssignmentRenderer={(p) => (
                                    <SheriffDutyBarList
                                        {...p}
                                        BarRenderer={ConnectedSheriffDutyBar}
                                        onRemove={(sheriffId) => {
                                            unlinkSheriff({ sheriffId, dutyId: duty.id });
                                        }}
                                        dutyWorkSection={workSectionMap[duty.assignmentId]}
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

