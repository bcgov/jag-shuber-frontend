import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import AssignmentSheriffDutyReassignmentForm from './AssignmentSheriffDutyReassignmentForm';
import { SheriffDuty } from '../api';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';

export interface AssignmentSheriffDutyReassignmentModalProps {
    sourceSheriffDuty: SheriffDuty;
    targetSheriffDuty: SheriffDuty;
}

export interface AssignmentSheriffDutyReassignmentModalDispatchProps {
}

type CompositeProps = 
    AssignmentSheriffDutyReassignmentModalProps 
    & AssignmentSheriffDutyReassignmentModalDispatchProps 
    & IModalInjectedProps;

class AssignmentSheriffDutyReassignmentModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            show,
            handleHide,
            sourceSheriffDuty,
            targetSheriffDuty
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-large"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true}>Re-Assign Sheriff</Modal.Header>
                <Modal.Body>
                    <AssignmentSheriffDutyReassignmentForm 
                        sourceDuty={sourceSheriffDuty} 
                        targetDuty={targetSheriffDuty}
                        onSubmitSuccess={handleHide} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <AssignmentSheriffDutyReassignmentForm.SubmitButton key="save">
                        Save
                    </AssignmentSheriffDutyReassignmentForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'AssignmentSheriffDutyReassignmentModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, AssignmentSheriffDutyReassignmentModalDispatchProps, AssignmentSheriffDutyReassignmentModalProps>(
        null,
        {})
        (AssignmentSheriffDutyReassignmentModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: AssignmentSheriffDutyReassignmentModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (sourceSheriffDuty: SheriffDuty, targetSheriffDuty: SheriffDuty) => 
        showModal(modalConfig.name, { sourceSheriffDuty, targetSheriffDuty })
    static HideAction = () => hideModal(modalConfig.name);
}