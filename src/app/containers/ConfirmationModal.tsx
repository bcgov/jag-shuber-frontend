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

export interface ConnectedConfirmationModalProps<T = {}> {
    confirmationMessage?: React.ReactNode;
    RenderComponent?: React.ComponentType<ConfirmationRendererProps<T>>;
    confirmBtnLabel?: string;
    onConfirm?: (confirmationValue?: T) => void;
    value?: T;
}

export interface ConnectedConfirmationModalDispatchProps<T = {}> {
    showThis: (props: ConnectedConfirmationModalProps<T>) => void;
}

type CompositeProps<T = {}> =
    ConnectedConfirmationModalProps<T>
    & ConnectedConfirmationModalDispatchProps<T>
    & IModalInjectedProps;

interface ConfirmationRendererProps<T = {}> {
    message?: React.ReactNode;
    value?: T;
    onValueChanged?: (newValue?: T) => void;
}

class DefaultConfirmationRenderer extends React.PureComponent<ConfirmationRendererProps> {
    render() {
        return (
            this.props.message
        );
    }
}

class ConnectedConfirmationModal<T = {}> extends React.PureComponent<CompositeProps<T>> {

    private handleConfirm() {
        const { onConfirm, value } = this.props;
        if (onConfirm) {
            onConfirm(value);
        }
    }

    private handleValueChanged(value: T) {
        const { showThis } = this.props;
        showThis({...this.props as any, value});
    }

    render() {
        const {
            show,
            handleHide,
            confirmationMessage = 'Please confirm that you would like to continue with this action.',
            confirmBtnLabel = 'Confirm',
            RenderComponent = DefaultConfirmationRenderer,
            value
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
                    <RenderComponent
                        message={confirmationMessage}
                        onValueChanged={(newValue: T) => this.handleValueChanged(newValue)}
                        value={value}
                    />
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
export default class <T = {}> extends connectModal(modalConfig)(
    connect<{}, ConnectedConfirmationModalDispatchProps<any>, ConnectedConfirmationModalProps<any>>(
        null,
        (dispatch, ownProps) => ({
            showThis: (p) => dispatch(showModal(modalConfig.name, p))
        }))
        (ConnectedConfirmationModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton<T>(props: ConnectedConfirmationModalProps<T>) {
        return (
            <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
        );
    }

    static ShowAction<T>(props: ConnectedConfirmationModalProps<T>) {
        return (
            showModal(modalConfig.name, props)
        );
    }

    static HideAction = () => hideModal(modalConfig.name);
}
