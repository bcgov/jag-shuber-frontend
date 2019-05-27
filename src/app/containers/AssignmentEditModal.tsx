import React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import { RootState } from '../store';
import AssignmentEditForm from './AssignmentEditForm';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import { IdType } from '../api';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { connect } from 'react-redux';
import { deleteAssignment as deleteAssignmentById } from '../modules/assignments/actions';
import toTitleCase from '../infrastructure/toTitleCase';
import { getAssignment } from '../modules/assignments/selectors';
export interface AssignmentEditModalProps {
    assignmentId: IdType;
    allowDelete?: boolean;
    allowSave?: boolean;
}

export interface AssignmentEditModalStatePros {
    assignmentTitle?: string;
}
export interface AssignmentEditModalDispatchProps {
    deleteAssignment: (id: IdType[]) => void;
}

class AssignmentEditModal extends React.PureComponent<
    AssignmentEditModalProps & AssignmentEditModalDispatchProps & AssignmentEditModalStatePros> {

    render() {
        const {
            assignmentId,
            deleteAssignment,
            allowDelete = true,
            allowSave = true,
            assignmentTitle = 'Assignment'
        } = this.props;

        const deleteConfirmationMessage = (            
            <p style={{ fontSize: 14 }}>
                <b>This will impact your Duty Roster!</b><br />
                {toTitleCase(assignmentTitle)} duties for today and all future days will be removed.
            </p>
        );

        return (
            <div>
                <ModalWrapper
                    title="Edit Assignment"
                    showButton={({ handleShow }) =>
                        <Button
                            bsSize="xsmall"
                            onClick={() => handleShow()}
                        >
                            <Glyphicon glyph="pencil" />
                        </Button>}
                    body={({ handleClose }) => {
                        return (
                            <AssignmentEditForm id={assignmentId} onSubmitSuccess={handleClose} />
                        );
                    }}
                    footerComponent={({ handleClose }) => ([
                        allowDelete && <ConfirmationModal
                            key="confirmationModal"
                            onConfirm={() => {
                                deleteAssignment([assignmentId]);
                                handleClose();
                            }}
                            actionBtnLabel="Delete"
                            actionBtnStyle="danger"
                            confirmBtnLabel="Delete"
                            confirmBtnStyle="danger"
                            message={deleteConfirmationMessage}
                            title="Delete Assignment"
                        />,
                        allowSave && <AssignmentEditForm.SubmitButton key="save">Save</AssignmentEditForm.SubmitButton>
                    ])}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState, props: AssignmentEditModalProps) => {
    const assignment = getAssignment(props.assignmentId)(state);
    return {
        assignmentTitle: assignment ? assignment.title : ''
    };
};

// tslint:disable-next-line:max-line-length
export default connect<AssignmentEditModalStatePros, AssignmentEditModalDispatchProps, AssignmentEditModalProps>(mapStateToProps, { deleteAssignment: deleteAssignmentById })(AssignmentEditModal);