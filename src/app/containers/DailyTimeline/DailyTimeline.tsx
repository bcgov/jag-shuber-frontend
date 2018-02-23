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
import AssignmentDutyCard from '../../components/AssignmentDutyCard/AssignmentDutyCard';
import { IdType } from '../../api/Api';
import AssignedSheriffBars from './AssignedSheriffBars'
// import { Glyphicon } from 'react-bootstrap';


interface DailyTimelineProps extends Partial<AssignmentTimelineProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface DailyTimelineDispatchProps {
    onVisibleTimeChange: (start: number, end: number) => void
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
            visibleTimeStart = moment().startOf('day').add(5, 'hours').valueOf(),
            visibleTimeEnd = moment().endOf('day').subtract(2, 'hours').valueOf(),
        } = this.props;
        if (onVisibleTimeChange) {
            if (allowTimeDrag) {
                onVisibleTimeChange(visibleStart, visibleEnd);
            } else {
                onVisibleTimeChange(visibleTimeStart, visibleTimeEnd);
            }
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
            ...rest
        } = this.props;
        return (
            <div className="dailyTimeline">
                <AssignmentTimeline
                    items={assignmentDuties}
                    groups={assignments}
                    sidebarWidth={sideBarWidth}
                    onVisibleTimeChange={(s, e) => this.onVisibleTimeChange(s, e)}
                    itemHeightRatio={.97}
                    itemRenderer={(duty) => (
                        <AssignmentDutyCard
                            duty={duty}
                            onDropSheriff={({ badgeNumber: sheriffId }) => linkSheriff && linkSheriff({ sheriffId, dutyId: duty.id })}>
                            <AssignedSheriffBars
                                sheriffIds={duty.sheriffIds}
                                sheriffsRequired={duty.sheriffsRequired}
                                onRemove={(sheriffId)=>sheriffId !== undefined && unlinkSheriff({sheriffId,dutyId:duty.id})}
                            />
                        </AssignmentDutyCard>
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

