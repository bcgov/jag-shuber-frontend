import React from 'react';
import moment from 'moment';
import {
    Modal
} from 'react-bootstrap';
import ScheduleShiftCopyForm from './ScheduleShiftCopyForm';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';

export interface ScheduleShiftCopyModalProps {
}

type CompositeProps = ScheduleShiftCopyModalProps & IModalInjectedProps;
class ScheduleShiftCopyModal extends React.Component<CompositeProps> {
    render() {
        const {
            show,
            handleHide
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-medium"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true}/>
                <Modal.Body>
                    <ScheduleShiftCopyForm 
                            onSubmitSuccess={handleHide}
                            weekStartSource={moment().startOf('week').subtract(1, 'week')}
                            weekStartDestination={moment().startOf('week')}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <ScheduleShiftCopyForm.SubmitButton>
                        OK
                    </ScheduleShiftCopyForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'ScheduleShiftCopyModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, {}, ScheduleShiftCopyModalProps>(
        null,
        {})
        (ScheduleShiftCopyModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: ScheduleShiftCopyModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = () => showModal(modalConfig.name, {});
    static HideAction = () => hideModal(modalConfig.name);
}