import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import {
    IdType
} from '../api';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import ScheduleShiftMultiEditForm from './ScheduleShiftMultiEditForm';

interface ScheduleMultiShiftEditModalProps {
}

interface ScheduleMultiShiftEditModalStateProps {
    selectedShifts?: IdType[];
}

type CompositeProps =
    ScheduleMultiShiftEditModalProps 
    & ScheduleMultiShiftEditModalStateProps 
    & IModalInjectedProps;

class ScheduleMultiShiftEditModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            show,
            handleHide,
            selectedShifts = []
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
                <Modal.Header closeButton={true}>
                    Edit Selected Shift(s)
                </Modal.Header>
                <Modal.Body>
                    <ScheduleShiftMultiEditForm selectedShiftIds={selectedShifts} onSubmitSuccess={handleHide}/> 
                </Modal.Body>
               
                <Modal.Footer>
                      <ScheduleShiftMultiEditForm.SubmitButton key="save">
                        Save
                    </ScheduleShiftMultiEditForm.SubmitButton> 
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'MultiShiftEditModal'
};

export default class extends connectModal(modalConfig)(
    connect<{}, {}, ScheduleMultiShiftEditModalProps>(
        null,
        {})
        (ScheduleMultiShiftEditModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: ScheduleMultiShiftEditModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (selectedShifts: IdType[]) => showModal(modalConfig.name, { selectedShifts });
    static HideAction = () => hideModal(modalConfig.name);
}