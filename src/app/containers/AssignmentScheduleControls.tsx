import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Glyphicon,
    Button,
    MenuItem,
    Dropdown
} from 'react-bootstrap';
import {
    updateVisibleTime as setVisibleTime,
    clearSelectedAssignments,
    selectAssignments
} from '../modules/assignmentSchedule/actions';
import { IdType, WorkSectionCode, AssignmentScheduleItem, DateType, Assignment } from '../api/Api';
import DateRangeControls from '../components/DateRangeControls';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { WORK_SECTIONS } from '../api';
import { deleteAssignment } from '../modules/assignments/actions';
import AssignmentScheduleAddModal from './AssignmentScheduleAddModal';
import { selectedAssignmentIds, visibleTime } from '../modules/assignmentSchedule/selectors';
import { allScheduledAssignments } from '../modules/assignmentSchedule/selectors';
import AssignmentScheduleEditModal from './AssignmentScheduleEditModal';
import AssignmentEditForm from './AssignmentEditForm';
import { allAssignments } from '../modules/assignments/selectors';

interface AssignmentControlsStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface AssignmentControlsProps {
    submit?: () => void;
    clear?: () => void;
    deleteAssignment?: (ids: IdType[]) => void;
    setSelectedAssignments?: (ids: IdType[]) => void;
    selectedAssignments?: IdType[];
    assignments?: AssignmentScheduleItem[];
    allAssignments?: Assignment[];
}

interface AssignmentDistpatchProps {
    updateVisibleTime: (startTime: any, endTime: any) => void;
    showAddModal: (workSectionId: WorkSectionCode, startDateTime: any, endDateTime: any, assigmnets: Assignment[]) => void;
    showEditModal: (id: IdType, assignments: Assignment[]) => void;
}

class AssignmentControls extends React.PureComponent<
    AssignmentControlsProps & AssignmentControlsStateProps & AssignmentDistpatchProps> {

    allVisibleAssignmentIds() {
        const { visibleTimeStart, visibleTimeEnd, assignments = [] } = this.props;
        return assignments
            .filter(s => moment(s.startDateTime).isBetween(visibleTimeStart, visibleTimeEnd, 'days', '[]'))
            .map(vs => vs.assignmentId);
    }

    render() {
        const {
            visibleTimeStart,
            visibleTimeEnd,
            updateVisibleTime,
            showAddModal,
            showEditModal,
            clear,
            deleteAssignment,
            selectedAssignments = [],
            setSelectedAssignments,
            allAssignments = []
        } = this.props;

        const areAssignmentsSelected = selectedAssignments.length > 0;

        return (
            <div
                style={{
                    display: 'flex',
                    paddingLeft: 0
                }}
            >

                <div className="toolbar-calendar-control">
                    <DateRangeControls
                        defaultDate={moment(visibleTimeStart)}
                        onNext={() => updateVisibleTime(
                            moment(visibleTimeStart).add('week', 1),
                            moment(visibleTimeEnd).add('week', 1)
                        )}
                        onPrevious={() => updateVisibleTime(
                            moment(visibleTimeStart).subtract('week', 1),
                            moment(visibleTimeEnd).subtract('week', 1)
                        )}
                        onSelect={(selectedDate) => updateVisibleTime(
                            moment(selectedDate).startOf('week').add(1, 'day'),
                            moment(selectedDate).endOf('week').subtract(1, 'day')
                        )}
                        onToday={() => updateVisibleTime(
                            moment().startOf('week').add(1, 'day'),
                            moment().endOf('week').subtract(1, 'day')
                        )}
                    />
                </div>

                <div
                    style={{
                        position: 'absolute',
                        right: 10,
                        paddingTop: 5
                    }}
                >
                    <Button
                        className="action-button secondary"
                        style={{ marginRight: 6 }}
                        onClick={() => setSelectedAssignments && setSelectedAssignments(this.allVisibleAssignmentIds())}
                    >
                        Select All
                    </Button>

                    <Button
                        className="action-button secondary"
                        style={{ marginRight: 40 }}
                        onClick={() => clear && clear()}
                    >
                        Deselect
                    </Button>

                    <Dropdown
                        id="task-type-dropdown"
                        style={{ marginRight: 6 }}
                    >
                        <Dropdown.Toggle noCaret={true} className="action-button">
                            <Glyphicon glyph="plus" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                Object.keys(WORK_SECTIONS).map((k) => {
                                    return (
                                        <MenuItem
                                            key={k}
                                            onSelect={() => showAddModal(k as WorkSectionCode, visibleTimeStart, visibleTimeEnd, allAssignments)}
                                        >
                                            {WORK_SECTIONS[k]}
                                        </MenuItem>
                                    );
                                })

                            }
                            <MenuItem key={'NA'} onSelect={() => showAddModal('NA' as WorkSectionCode, visibleTimeStart, visibleTimeEnd, allAssignments)}>
                                Not Applicable
                            </MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Button
                        style={{
                            marginRight: -6,
                            backgroundColor: areAssignmentsSelected ? '#327AB7' : 'grey',
                            borderColor: areAssignmentsSelected ? '#327AB7' : 'grey',
                            color: 'white'
                        }}
                        onClick={() => showEditModal(selectedAssignments[0], allAssignments)}
                        disabled={!areAssignmentsSelected}
                    >
                        <Glyphicon glyph="pencil" />
                    </Button>

                    <ConfirmationModal
                        key="confirmationModal"
                        onConfirm={() => {
                            if (deleteAssignment) {
                                deleteAssignment(selectedAssignments);
                            }
                            if (clear) {
                                clear();
                            }
                        }}
                        actionBtnLabel={<Glyphicon glyph="trash" style={{ fontSize: 18 }} />}
                        actionBtnStyle="danger"
                        confirmBtnLabel="Delete"
                        confirmBtnStyle="danger"
                        // tslint:disable-next-line:max-line-length
                        message={<p style={{ fontSize: 14 }}><b>Permanently delete</b> the selected assignments(s)?</p>}
                        title="Delete Assignment(s)"
                    />

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    const currentVisibleTime = visibleTime(state);
    return {
        ...currentVisibleTime,
        selectedAssignments: selectedAssignmentIds(state),
        assignments: allScheduledAssignments(state),
        allAssignments: allAssignments(state)
    };
};

const mapDispatchToProps = {
    updateVisibleTime: setVisibleTime,
    showAddModal: (workSectionId: WorkSectionCode, startDateTime: DateType, endDateTime: DateType, assignments: Assignment[]) => AssignmentScheduleAddModal.ShowAction({workSectionId, startDateTime, endDateTime, assignments}),
    submit: AssignmentEditForm.submitAction,
    clear: clearSelectedAssignments,
    deleteAssignment: deleteAssignment,
    setSelectedAssignments: selectAssignments,
    showEditModal: (id: IdType, assignments: Assignment[]) => AssignmentScheduleEditModal.ShowAction({assignmentId: id, assignments})
};

// tslint:disable-next-line:max-line-length
export default connect<AssignmentControlsStateProps, AssignmentDistpatchProps, AssignmentControlsProps>(
    mapStateToProps,
    mapDispatchToProps
)(AssignmentControls);