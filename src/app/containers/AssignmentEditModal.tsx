import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import AssignmentEditForm from './AssignmentEditForm';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import { IdType } from '../api';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { connect } from 'react-redux';
import { deleteAssignment } from '../modules/assignments/actions';
export interface AssignmentEditModalProps {
    assignmentId: IdType;
    allowDelete?: boolean;
    allowSave?: boolean;
}

export interface AssignmentEditModalDispatchProps {
    deleteAssignment: (id: IdType) => void;
}

class AssignmentEditModal extends React.PureComponent<
    AssignmentEditModalProps & AssignmentEditModalDispatchProps> {

    render() {
        const {
            assignmentId,
            // tslint:disable-next-line:no-shadowed-variable
            deleteAssignment,
            allowDelete = true,
            allowSave = true
        } = this.props;

        const deleteConfirmationMessage =
            // tslint:disable-next-line:max-line-length
            <p style={{ fontSize: 14 }}>Please confirm that you would like to <b>permanently delete</b> this assignment</p>;

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
                                deleteAssignment(assignmentId);
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
// tslint:disable-next-line:max-line-length
export default connect<{}, AssignmentEditModalDispatchProps, AssignmentEditModalProps>(null, { deleteAssignment })(AssignmentEditModal);