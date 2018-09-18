import React from 'react';
import moment from 'moment';
import {
    Modal
} from 'react-bootstrap';
import DutyRosterToolsForm from './DutyRosterToolsForm/DutyRosterToolsForm';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { DateType } from '../api';

export interface ImportDefaultDutiesModalProps {
    date: DateType;
}

class ImportDefaultDutiesModal extends React.PureComponent<ImportDefaultDutiesModalProps & IModalInjectedProps> {
    render() {
        const {
            show,
            handleHide,
            date
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-xsmall"
            >
                <Modal.Header closeButton={true}>Import Settings - {moment(date).format('MMM DD, YYYY')}</Modal.Header>
                <Modal.Body>
                    <DutyRosterToolsForm
                        date={date}
                        onSubmitSuccess={() => handleHide()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <DutyRosterToolsForm.SubmitButton key="save">Proceed</DutyRosterToolsForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'ImportDefaultDutiesModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal<ImportDefaultDutiesModalProps>(modalConfig)(ImportDefaultDutiesModal as any) {
    static modalName = modalConfig.name;

    static ShowButton = ({ children = 'Tools', ...restProps }: ImportDefaultDutiesModalProps & { children?: any }) =>
        (
            <ConnectedShowModalButton
                modalName={modalConfig.name}
                modalProps={restProps}
                className="action-button"
                children={children}
            />
        )

    static ShowAction = (date: DateType) => showModal(modalConfig.name, { date });
    static HideAction = () => hideModal(modalConfig.name);
}