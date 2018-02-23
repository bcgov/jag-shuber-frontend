import * as React from 'react';
import { visibleTime } from '../../modules/timeline/selectors';
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
import { updateVisibleTime } from '../../modules/timeline/actions';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {
    default as AssignmentTimeline,
    AssignmentTimelineProps
} from '../../components/AssignmentTimeline/AssignmentTimeline';
import {
    Assignment,
    AssignmentDuty
} from '../../api/index';
import * as moment from 'moment'
import './DailyTimeline.css'
import AssignmentDutyCard from '../../components/AssignmentDutyCard';
import { IdType } from '../../api/Api';
import SheriffDutyBarList from '../../components/SheriffDutyBarList/SheriffDutyBarList';
import ConnectedSheriffDutyBar from '../SheriffDutyBar';



interface DailyTimelineProps extends Partial<AssignmentTimelineProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface DailyTimelineDispatchProps {
    onVisibleTimeChange: (start: any, end: any) => void
    getAssignmentDuties: () => void;
    getAssignments: () => void;
    linkSheriff: (link: { sheriffId: IdType, dutyId: IdType }) => void;
    unlinkSheriff: (link: { sheriffId: IdType, dutyId: IdType }) => void;
}

interface DailyTimelineStateProps {
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
}

class DailyTimeline extends React.Component<DailyTimelineProps & DailyTimelineStateProps & DailyTimelineDispatchProps>{

    componentWillMount() {
        const { getAssignmentDuties, getAssignments } = this.props;
        getAssignmentDuties && getAssignmentDuties();
        getAssignments && getAssignments();
    }

    onVisibleTimeChange(visibleStart: number, visibleEnd: number) {
        const {
            onVisibleTimeChange,
            allowTimeDrag = false,
            visibleTimeStart = moment().startOf('day').add(5, 'hours'),
            visibleTimeEnd = moment().endOf('day').subtract(2, 'hours'),
        } = this.props;

        if (onVisibleTimeChange) {
            let newVisibleTimeStart = moment.isMoment(visibleTimeStart) ? visibleTimeStart.unix() : visibleTimeStart;
            let newVisibleTimeEnd = moment.isMoment(visibleTimeEnd) ? visibleTimeEnd.unix() : visibleTimeEnd;
            if (allowTimeDrag) {
                newVisibleTimeStart = moment.unix(visibleStart);
                newVisibleTimeEnd = moment.unix(visibleEnd);
            }
            onVisibleTimeChange(moment.unix(newVisibleTimeStart), moment.unix(newVisibleTimeEnd));
        }
    }

    render() {
        const {
            assignments = [],
            assignmentDuties = [],
            sideBarWidth = 200,
            onVisibleTimeChange,
            linkSheriff,
            unlinkSheriff,
            visibleTimeEnd,
            visibleTimeStart,
            ...rest
        } = this.props;

        const newVisibleTimeEnd = moment.isMoment(visibleTimeEnd) ? visibleTimeEnd.valueOf() : visibleTimeEnd;
        const newVisibleTimeStart = moment.isMoment(visibleTimeStart) ? visibleTimeStart.valueOf() : visibleTimeStart;

        return (
            <div className="dailyTimeline">
                <AssignmentTimeline
                    items={assignmentDuties}
                    groups={assignments}
                    sidebarWidth={sideBarWidth}
                    onVisibleTimeChange={(s, e) => this.onVisibleTimeChange(s, e)}
                    visibleTimeEnd={newVisibleTimeEnd}
                    visibleTimeStart={newVisibleTimeStart}
                    itemHeightRatio={.97}
                    itemRenderer={(duty) => (
                        <AssignmentDutyCard
                            duty={duty}
                            onDropSheriff={({ badgeNumber: sheriffId }) => linkSheriff && linkSheriff({ sheriffId, dutyId: duty.id })}
                            SheriffAssignmentRenderer={(p) => (
                                <SheriffDutyBarList
                                    {...p}
                                    BarRenderer={ConnectedSheriffDutyBar}
                                    onRemove={(sheriffId) =>{
                                        unlinkSheriff({ sheriffId, dutyId: duty.id })
                                    }} />
                            )}
                        />
                    )}
                    {...rest}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, props: DailyTimelineProps) => {
    const { visibleTimeStart, visibleTimeEnd } = visibleTime(state);

    return {
        assignmentDuties: allAssignmentDuties(state),
        assignments: allAssignments(state),
        visibleTimeStart,
        visibleTimeEnd
    };
}

const mapDispatchToProps = {
    onVisibleTimeChange: updateVisibleTime,
    getAssignments: getAssignments,
    getAssignmentDuties: getAssignmentDuties,
    linkSheriff: linkAssignment,
    unlinkSheriff: unlinkAssignment
}

export default connect<DailyTimelineStateProps, DailyTimelineDispatchProps, DailyTimelineProps>(
    mapStateToProps, mapDispatchToProps)(DailyTimeline);

