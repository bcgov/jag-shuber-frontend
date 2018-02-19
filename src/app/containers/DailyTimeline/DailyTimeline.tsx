import * as React from 'react';
import { visibleTime } from '../../modules/timeline/selectors';
import {
    allAssignments,
    allAssignmentDuties
} from '../../modules/assignments/selectors';
import {
    getAssignments,
    getAssignmentDuties
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
// import { Glyphicon } from 'react-bootstrap';


interface DailyTimelineProps extends Partial<AssignmentTimelineProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface DailyTimelineDispatchProps {
    onVisibleTimeChange?: (start: number, end: number) => void
    getAssignmentDuties?: () => void;
    getAssignments?: () => void;
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
            ...rest
        } = this.props;
        return (
            <div style={{}}>
                <AssignmentTimeline
                    items={assignmentDuties}
                    groups={assignments}
                    sidebarWidth={sideBarWidth}
                    onVisibleTimeChange={(s, e) => this.onVisibleTimeChange(s, e)}
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
    getAssignmentDuties: getAssignmentDuties
}

export default connect<DailyTimelineStateProps, DailyTimelineDispatchProps, DailyTimelineProps>(
    mapStateToProps, mapDispatchToProps)(DailyTimeline);

