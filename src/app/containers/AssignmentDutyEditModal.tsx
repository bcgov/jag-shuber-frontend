import * as React from 'react';
import {
    Modal
} from 'react-bootstrap';
import AssignmentDutyEditForm from './AssignmentDutyEditForm';
import { IdType } from '../api';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { connect } from 'react-redux';
import { deleteAssignmentDuty } from '../modules/assignments/actions';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';

export interface AssignmentDutyEditModalProps {
    dutyId: IdType;
    color?: string;
}

export interface AssignmentDutyEditModalDispatchProps {
    deleteAssignmentDuty: (id: IdType) => void;
}

type CompositeProps = AssignmentDutyEditModalProps & AssignmentDutyEditModalDispatchProps & IModalInjectedProps;
class AssignmentDutyEditModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            dutyId,
            // color = 'white',
            // tslint:disable-next-line:no-shadowed-variable
            deleteAssignmentDuty,
            show,
            handleHide
        } = this.props;

        const deleteConfirmationMessage =
            <p style={{ fontSize: 14 }}>Please confirm that you would like to <b>permanently delete</b> this duty.</p>;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-large"
                style={{
                    maxSize: "70%"
                }}
            >
                <Modal.Header closeButton={true}>Edit Duty</Modal.Header>
                <Modal.Body>
                    <AssignmentDutyEditForm id={dutyId} onSubmitSuccess={handleHide} />
                </Modal.Body>
                <Modal.Footer>
                    <ConfirmationModal
                        key="confirmationModal"
                        onConfirm={() => {
                            deleteAssignmentDuty(dutyId);
                            handleHide();
                        }}
                        actionBtnLabel="Delete"
                        actionBtnStyle="danger"
                        confirmBtnLabel="Delete"
                        confirmBtnStyle="danger"
                        message={deleteConfirmationMessage}
                        title="Delete Duty"
                    />,
                    <AssignmentDutyEditForm.SubmitButton key="save">Save</AssignmentDutyEditForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'AssignmentDutyEditModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, AssignmentDutyEditModalDispatchProps, AssignmentDutyEditModalProps>(
        null,
        {
            deleteAssignmentDuty
        })
        (AssignmentDutyEditModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: AssignmentDutyEditModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (dutyId: IdType) => showModal(modalConfig.name, { dutyId });
    static HideAction = () => hideModal(modalConfig.name);
}