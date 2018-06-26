import React from 'react';
import {
    Modal, 
    Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { 
    IModalInjectedProps, 
    connectModal 
} from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { 
    show as showModal, 
    hide as hideModal 
} from 'redux-modal';

export interface ConnectedConfirmationModalProps {
    confirmationMessage?: React.ReactNode;
    confirmBtnLabel?: string;
    onConfirm?: () => void;
}

export interface ConnectedConfirmationModalDispatchProps {
}

type CompositeProps =
    ConnectedConfirmationModalProps
    & ConnectedConfirmationModalDispatchProps
    & IModalInjectedProps;

class ConnectedConfirmationModal extends React.PureComponent<CompositeProps> {

    // private handleCancel() {
    //     const { onCancel } = this.props;
    //     if (onCancel) {
    //         onCancel();
    //     }
    // }

    private handleConfirm() {
        const { onConfirm } = this.props;
        if (onConfirm) {
            onConfirm();
        }
    }
    
    render() {
        const {
            show,
            handleHide,
            confirmationMessage = 'Please confirm that you would like to continue with this action.',
            confirmBtnLabel = 'Confirm'
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-small"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true} />
                <Modal.Body>
                    {confirmationMessage}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        key="confirm"
                        bsStyle="success"
                        onClick={() => {
                            this.handleConfirm();
                            handleHide();
                        }}
                    >
                    {confirmBtnLabel}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'ConnectedConfirmationModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, ConnectedConfirmationModalDispatchProps, ConnectedConfirmationModalProps>(
        null,
        {})
        (ConnectedConfirmationModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: ConnectedConfirmationModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (
        confirmationMessage?: React.ReactNode, 
        confirmBtnLabel?: string, 
        onConfirm?: () => void, 
        ) => showModal(modalConfig.name, { confirmationMessage, confirmBtnLabel, onConfirm })
    static HideAction = () => hideModal(modalConfig.name);
}
