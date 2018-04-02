import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import AssignmentDutyEditForm from './AssignmentDutyEditForm';
import ModalWrapper from './ModalWrapper';
import { IdType } from '../api';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { connect } from 'react-redux';
import { deleteAssignmentDuty } from '../modules/assignments/actions';

export interface AssignmentDutyEditModalProps {
    dutyId: IdType;
    color?: string;
}

export interface AssignmentDutyEditModalDispatchProps {
    deleteAssignmentDuty: (id: IdType) => void;
}

class AssignmentDutyEditModal extends React.PureComponent<
    AssignmentDutyEditModalProps & AssignmentDutyEditModalDispatchProps> {

    render() {
        const {
            dutyId,
            color = 'white',
            // tslint:disable-next-line:no-shadowed-variable
            deleteAssignmentDuty
         } = this.props;
        
        const deleteConfirmationMessage = 
            <p style={{fontSize: 14}}>Please confirm that you would like to <b>permanently delete</b> this duty.</p>;

        return (
            <div>
                <ModalWrapper
                    title="Edit Duty"
                    showButton={
                        ({ handleShow }) =>
                            <Button bsStyle="link" bsSize="medium" onClick={() => handleShow()}>
                                <Glyphicon glyph="pencil" style={{ color }} />
                            </Button>}
                    body={({ handleClose }) => {
                        return (
                            <AssignmentDutyEditForm id={dutyId} onSubmitSuccess={handleClose} />
                        );
                    }}
                    footerComponent={({ handleClose }) => ([
                        <ConfirmationModal
                            key="confirmationModal"
                            onConfirm={() => {
                                deleteAssignmentDuty(dutyId);
                                handleClose();
                            }}
                            actionBtnLabel="Delete"
                            actionBtnStyle="danger"
                            confirmBtnLabel="Delete"
                            confirmBtnStyle="danger"
                            cancelBtnLabel="Cancel"
                            cancelBtnStyle="default"
                            message={deleteConfirmationMessage}
                            title="Delete Duty"
                        />,
                        <AssignmentDutyEditForm.SubmitButton key="save">Save</AssignmentDutyEditForm.SubmitButton>
                    ])}
                />
            </div>
        );
    }
}
// tslint:disable-next-line:max-line-length
export default connect<{}, AssignmentDutyEditModalDispatchProps, AssignmentDutyEditModalProps>(null, { deleteAssignmentDuty })(AssignmentDutyEditModal);