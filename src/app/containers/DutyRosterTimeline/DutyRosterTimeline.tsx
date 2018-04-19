import * as React from 'react';
import {
    allAssignments,
    allAssignmentDuties
} from '../../modules/assignments/selectors';
import {
    getAssignments,
    getAssignmentDuties,
    linkAssignment,
    // unlinkAssignment
} from '../../modules/assignments/actions';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {
    Assignment,
    AssignmentDuty
} from '../../api/index';
// import * as moment from 'moment';
import './DutyRosterTimeline.css';
import AssignmentDutyCard from '../../components/AssignmentDutyCard/AssignmentDutyCard';
import { IdType, WorkSectionCode } from '../../api/Api';
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
    fetchAssignmentDuties: () => void;
    fetchAssignments: () => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType }) => void;
    // visibleTime: () => void;
    // unlinkSheriff: (link: { sheriffId: IdType, dutyId: IdType }) => void;
}

interface DutyRosterTimelineStateProps {
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

class DutyRosterTimeline extends 
    React.Component<DutyRosterTimelineProps & DutyRosterTimelineStateProps & DutyRosterTimelineDispatchProps> {

    componentWillMount() {
        const { 
                fetchAssignmentDuties, 
                fetchAssignments,
                // tslint:disable-next-line:no-shadowed-variable
                // visibleTime
        } = this.props;

        /* tslint:disable:no-unused-expression */
        fetchAssignmentDuties && fetchAssignmentDuties();
        fetchAssignments && fetchAssignments();
        // visibleTime && visibleTime();
        /* tslint:enable:no-unused-expression */
    }

    render() {
        const {
            assignments = [],
            assignmentDuties = [],
            sidebarWidth = 200,
            onVisibleTimeChange,
            linkSheriff,
            // unlinkSheriff,
            visibleTimeStart, //= moment().startOf('day').add(7, 'hours'),
            visibleTimeEnd, //= moment().endOf('day').subtract(6, 'hours'),
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
                    // onVisibleTimeChange={visibleTime()}
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
                                        // onRemove={(sheriffId) => {
                                        //     unlinkSheriff({ sheriffId, dutyId: duty.id });
                                        // }}
                                        onDropSheriff={({ id: sheriffId }, {id: sheriffDutyId}) => (
                                            linkSheriff && linkSheriff({ sheriffId, dutyId: duty.id, sheriffDutyId})
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
    // unlinkSheriff: unlinkAssignment
};

export default connect<DutyRosterTimelineStateProps, DutyRosterTimelineDispatchProps, DutyRosterTimelineProps>(
    mapStateToProps, mapDispatchToProps)(DutyRosterTimeline);
