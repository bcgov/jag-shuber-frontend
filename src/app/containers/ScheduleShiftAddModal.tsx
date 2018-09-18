import * as React from 'react';
import * as moment from 'moment';
import ScheduleShiftCreateForm from './ScheduleShiftCreateForm';
import {
    Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { WorkSectionCode } from '../api';

export interface ScheduleShiftAddModalProps {
    workSectionId?: WorkSectionCode;
}

type CompositeProps = ScheduleShiftAddModalProps & IModalInjectedProps;
class ScheduleShiftAddModal extends React.Component<CompositeProps> {
    render() {
        const {
            show,
            handleHide,
            workSectionId
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
                <Modal.Header closeButton={true}>Add Shift</Modal.Header>
                <Modal.Body>
                    <ScheduleShiftCreateForm
                        onSubmitSuccess={handleHide}
                        weekStart={moment().startOf('week')}
                        workSectionId={workSectionId}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <ScheduleShiftCreateForm.SubmitButton>
                        Save
                    </ScheduleShiftCreateForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}
const modalConfig = {
    name: 'ScheduleShiftAddModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, {}, ScheduleShiftAddModalProps>(
        null,
        {})
        (ScheduleShiftAddModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: ScheduleShiftAddModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (workSectionId?: WorkSectionCode) => showModal(modalConfig.name, {workSectionId});
    static HideAction = () => hideModal(modalConfig.name);
}