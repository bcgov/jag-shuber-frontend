import React from 'react';
import {
    Modal
} from 'react-bootstrap';
// import AssignmentDutyEditForm from './AssignmentDutyEditForm';
import { SheriffDuty } from '../api';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';

export interface AssignmentSheriffDutySplittingModalProps {
    sourceSheriffDuty: SheriffDuty;
    targetSheriffDuty: SheriffDuty;
}

export interface AssignmentSheriffDutySplittingModalDispatchProps {
}

type CompositeProps = 
    AssignmentSheriffDutySplittingModalProps & AssignmentSheriffDutySplittingModalDispatchProps & IModalInjectedProps;

class AssignmentSheriffDutySplittingModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            show,
            handleHide
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
                    {/* <AssignmentDutyEditForm id={dutyId} onSubmitSuccess={handleHide} /> */}
                    Here is the body of the duty splitting form
                </Modal.Body>
                <Modal.Footer>
                    here is the footer
                    {/* <AssignmentDutyEditForm.SubmitButton key="save">Save</AssignmentDutyEditForm.SubmitButton> */}
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'AssignmentSheriffDutySplittingModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, AssignmentSheriffDutySplittingModalDispatchProps, AssignmentSheriffDutySplittingModalProps>(
        null,
        {})
        (AssignmentSheriffDutySplittingModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: AssignmentSheriffDutySplittingModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (sourceSheriffDuty: SheriffDuty, targetSheriffDuty: SheriffDuty) => 
        showModal(modalConfig.name, { sourceSheriffDuty, targetSheriffDuty })
    static HideAction = () => hideModal(modalConfig.name);
}