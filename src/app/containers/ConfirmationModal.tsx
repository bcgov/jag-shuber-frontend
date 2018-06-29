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
    RenderComponent?: React.ComponentType<ConfirmationRendererProps>;
    confirmBtnLabel?: string;
    onConfirm?: () => void;
}

export interface ConnectedConfirmationModalDispatchProps {
}

type CompositeProps =
    ConnectedConfirmationModalProps
    & ConnectedConfirmationModalDispatchProps
    & IModalInjectedProps;

interface ConfirmationRendererProps {
    message?: React.ReactNode;
}

class DefaultConfirmationRenderer  extends React.PureComponent<ConfirmationRendererProps> {
    render () {
        return (
            this.props.message
        );
    }
}

class ConnectedConfirmationModal extends React.PureComponent<CompositeProps> {

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

        const { RenderComponent = DefaultConfirmationRenderer } = this.props;

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
                    <RenderComponent message={confirmationMessage}/>
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

    static ShowAction = (props: ConnectedConfirmationModalProps) => showModal(modalConfig.name, props);
    static HideAction = () => hideModal(modalConfig.name);
}
