import * as React from 'react';
import { AssignmentTimelineProps } from '../../components/AssignmentTimeline/AssignmentTimeline'
import { visibleTime } from '../../modules/timeline/selectors';
import { allAssignments, allAssignmentDuties } from '../../modules/assignments/selectors';
import { getAssignments, getAssignmentDuties } from '../../modules/assignments/actions';
import { updateVisibleTime } from '../../modules/timeline/actions';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import AssignmentTimeline from '../../components/AssignmentTimeline/AssignmentTimeline';
import { Assignment, AssignmentDuty } from '../../api/index';
import './DailyTimeline.css'
// import { Glyphicon } from 'react-bootstrap';


interface DailyTimelineProps {
    getAssignmentDuties?: () => void;
    getAssignments?: () => void;
    onVisibleTimeChange?: (start: any, end: any) => void
    assignmentDuties: AssignmentDuty[];
    assignments: Assignment[];
    sideBarWidth?: number;
}

class DailyTimeline extends React.Component<DailyTimelineProps>{

    componentWillMount() {
        const { getAssignmentDuties, getAssignments } = this.props;
        getAssignmentDuties && getAssignmentDuties();
        getAssignments && getAssignments();
    }

    onVisibleTimeChange(visibleTime:{visibleTimeStart:any,visibleTimeEnd:any}){
        const {onVisibleTimeChange} = this.props;
        const {visibleTimeStart,visibleTimeEnd} = visibleTime;
        onVisibleTimeChange && onVisibleTimeChange(visibleTimeStart,visibleTimeEnd);
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
                    onVisibleTimeChange={(t)=>this.onVisibleTimeChange(t)}
                    {...rest} />

                {/* <div style={{ display: 'flex', backgroundColor: "#003366", color: "#fff", paddingTop: 10,paddingBottom:10, fontSize: 18 }}>
                        <div style={{ width: sideBarWidth, textAlign: "center" }} >
                            Off Duty
                            <Glyphicon style={{marginLeft:10}} glyph="arrow-down" />
                        </div>
                        <div />
                    </div>

                    <AssignmentTimeline
                        showHeader={false}
                        sideBarHeaderTitle=""
                        onDuty={false}
                        sheriffs={offDutySheriffs}
                        assignments={assignments}
                        sidebarWidth={sideBarWidth}
                        {...rest} /> */}
            </div>
        )
    }

}

const mapStateToProps = (state: RootState, props: AssignmentTimelineProps) => {
    const { visibleTimeStart, visibleTimeEnd } = visibleTime(state);

    return {
        assignmentDuties: allAssignmentDuties(state),
        assignments: allAssignments(state),
        visibleTimeStart,
        visibleTimeEnd
    };
}

const mapDispatchToProps: Partial<DailyTimelineProps> = {
    onVisibleTimeChange: updateVisibleTime,
    getAssignments: getAssignments,
    getAssignmentDuties: getAssignmentDuties
}

export default connect<DailyTimelineProps>(mapStateToProps, mapDispatchToProps)(DailyTimeline);

