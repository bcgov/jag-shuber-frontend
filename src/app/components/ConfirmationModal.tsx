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
    onConfirm: () => void;
}

export class ConfirmationModal extends React.PureComponent<ConfirmationModalProps> {

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
            actionBtnSize = null,
            title = 'Confirm',
            message = <p style={{fontSize: 16}}>Complete this action.</p>,
            confirmBtnLabel = 'Confirm',
            confirmBtnStyle = 'primary'
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
