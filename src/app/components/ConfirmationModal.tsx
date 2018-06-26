import React from 'react';
import ModalWrapper from '../containers/ModalWrapper/ModalWrapper';
import { Button } from 'react-bootstrap';

export interface ConfirmationModalProps {
    actionBtnLabel: React.ReactNode; 
    actionBtnStyle?: string;
    actionBtnSize?: any;
    actionBtnClassName?: string;
    title?: string;
    message?: React.ReactNode;
    confirmBtnLabel?: React.ReactNode;
    confirmBtnStyle?: string;
    cancelBtnLabel?: React.ReactNode;
    cancelBtnStyle?: string;
    onConfirm: () => void;
    onCancel?: () => void;
}

export class ConfirmationModal extends React.PureComponent<ConfirmationModalProps> {
    private handleCancel() {
        const { onCancel } = this.props;
        if (onCancel) {
            onCancel();
        }
    }

    private handleConfirm() {
        const { onConfirm } = this.props;
        if (onConfirm) {
            onConfirm();
        }
    }

    render() {
        const {
            actionBtnLabel, 
            actionBtnClassName = '',
            actionBtnStyle = '',
            actionBtnSize = '',
            title = 'Confirm',
            message = <p style={{fontSize: 16}}>Please confirm that you would like to complete this action.</p>,
            confirmBtnLabel = 'Confirm',
            confirmBtnStyle = 'primary',
            cancelBtnLabel = 'Cancel',
            cancelBtnStyle = 'default'
        } = this.props;
        
        return (
            <div className="btn">
                <ModalWrapper
                    title={title}
                    showButton={({ handleShow }) => 
                        <Button 
                            bsStyle={actionBtnStyle} 
                            bsSize={actionBtnSize}
                            onClick={() => handleShow()}
                            className={actionBtnClassName}
                        >
                            {actionBtnLabel}
                        </Button>}
                    body={() => message}
                    footerComponent={({ handleClose }) => [
                        <Button 
                            key="cancel" 
                            bsStyle={cancelBtnStyle}
                            onClick={() => {
                                this.handleCancel();
                                handleClose();
                            }}
                        >
                            {cancelBtnLabel}
                        </Button>,
                        <Button 
                            key="confirm" 
                            bsStyle={confirmBtnStyle} 
                            onClick={() => {
                                this.handleConfirm();
                                handleClose();
                            }}
                        >
                            {confirmBtnLabel}
                        </Button>
                    ]}
                    styleClassName="modal-wrapper-small"
                />
            </div>
        );
    }
}
