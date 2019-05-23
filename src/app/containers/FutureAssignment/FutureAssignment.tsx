import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import {
    selectAssignment, unselectAssignments,
} from '../../modules/assignmentSchedule/actions';
import {
    IdType,
} from '../../api';
import './FutureAssignment.css';
import SheriffDropTarget from '../SheriffDropTarget';
import { AssignmentScheduleItem } from '../../api/Api';
import AssignmentSchedule, { AssignmentScheduleProps } from '../../components/AssignmentSchedule';
import { getAssignments } from '../../modules/assignments/actions';
import AssignmentScheduleCard from '../../components/AssignmentScheduleCard';
import { visibleTime, selectedAssignmentIds, allScheduledAssignments } from '../../modules/assignmentSchedule/selectors';

interface FutureAssignmentProps extends Partial<AssignmentScheduleProps> {
    sideBarWidth?: number;
    allowTimeDrag?: boolean;
}

interface FutureAssignmentDispatchProps {
    fetchAssignments: () => void;
    selectCard: (id: IdType) => void;
    unselectCard: (id: IdType) => void;
}

interface FutureAssignmentStateProps {
    assignments: AssignmentScheduleItem[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
    selectedAssignmentIds: IdType[];
}

class FutureAssignment extends React.Component<FutureAssignmentProps
    & FutureAssignmentStateProps
    & FutureAssignmentDispatchProps> {

    componentWillMount() {
        const {
            fetchAssignments,
        } = this.props;

        fetchAssignments();
    }

    private isAssignmentSelected(assignmentId: IdType): boolean {
        const { selectedAssignmentIds = [] } = this.props;
        return selectedAssignmentIds.indexOf(assignmentId) >= 0;
    }

    private toggleSelectCard(id: IdType) {
        const { selectCard, unselectCard } = this.props;
        if (this.isAssignmentSelected(id)) {
            unselectCard(id);
        } else {
            selectCard(id);
        }
    }

    render() {
        const {
            assignments = [],
            visibleTimeStart,
            visibleTimeEnd,
        } = this.props;

        return (
            <div className="scheduling-timeline">
                <AssignmentSchedule
                    assignments={assignments}
                    visibleTimeEnd={visibleTimeEnd}
                    visibleTimeStart={visibleTimeStart}
                    itemRenderer={(assignment) => {
                        return (
                            <SheriffDropTarget
                                style={{
                                    height: '100%',
                                    display: 'flex'
                                }}
                                onDropItem={(sheriff) => {  }}
                                className="shift-card"
                                onClick={() => this.toggleSelectCard(assignment.assignmentId)}
                            >
                                <AssignmentScheduleCard
                                    assignmentId={assignment.assignmentId}
                                    workSectionId={assignment.workSectionId}
                                    isSelected={this.isAssignmentSelected(assignment.assignmentId)}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignSelf: 'center',
                                            justifyContent: 'center',
                                            flex: 1,
                                            paddingTop: 5
                                        }}
                                    >
                                        <div>{assignment.title}</div>
                                    </div>
                                </AssignmentScheduleCard>
                            </SheriffDropTarget>
                        );
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: AssignmentScheduleProps) => {
    const currentVisibleTime = visibleTime(state);

    return {
        assignments: allScheduledAssignments(state),
        ...currentVisibleTime,
        selectedAssignmentIds: selectedAssignmentIds(state),
    };
};

const mapDispatchToProps = {
    fetchAssignments: getAssignments,
    selectCard: selectAssignment,
    unselectCard: unselectAssignments
};

export default connect<FutureAssignmentStateProps, FutureAssignmentDispatchProps, FutureAssignmentProps>(
    mapStateToProps, mapDispatchToProps)(FutureAssignment);