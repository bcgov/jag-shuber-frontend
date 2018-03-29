import * as React from 'react';
import ModalWrapper from '../containers/ModalWrapper';
import { Button } from 'react-bootstrap';

export interface ConfirmationModalProps {
    actionBtnLabel: string; 
    actionBtnStyle: string;
    title?: string;
    message?: React.ReactNode;
    confirmBtnLabel?: string;
    confirmBtnStyle?: string;
    cancelBtnLabel?: string;
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
            actionBtnStyle,
            title = 'Confirm',
            message = <p style={{fontSize: 16}}>Are you sure you would like to complete this action?</p>,
            confirmBtnLabel = 'Yes',
            confirmBtnStyle = 'primary',
            cancelBtnLabel = 'No',
            cancelBtnStyle = 'default'
        } = this.props;
        
        return (
            <div className="btn">
                <ModalWrapper
                    title={title}
                    showButton={({ handleShow }) => 
                        <Button 
                            bsStyle={actionBtnStyle} 
                            onClick={() => handleShow()}
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
                />
            </div>
        );
    }
}
