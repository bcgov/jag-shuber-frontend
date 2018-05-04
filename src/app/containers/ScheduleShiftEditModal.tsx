import * as React from 'react';
import {
    Modal
} from 'react-bootstrap';
import { IdType } from '../api';
import ScheduleShiftEditForm from './ScheduleShiftEditForm';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { connect } from 'react-redux';
import { deleteShift } from '../modules/shifts/actions';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
export interface ScheduleShiftEditModalProps {
    shiftId: IdType;
}

export interface ScheduleShiftEditModalDispatchProps {
    deleteShift: (id: IdType) => void;
}

type CompositeProps = ScheduleShiftEditModalProps & ScheduleShiftEditModalDispatchProps & IModalInjectedProps;

class ScheduleShiftEditModal extends React.PureComponent<CompositeProps>{

    render() {
        const {
            shiftId,
            // tslint:disable-next-line:no-shadowed-variable
            deleteShift,
            show,
            handleHide
         } = this.props;

        const deleteConfirmationMessage =
            <p style={{ fontSize: 14 }}>Please confirm that you would like to <b>permanently delete</b> this shift.</p>;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-large"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true}>Edit Shift</Modal.Header>
                <Modal.Body>
                    <ScheduleShiftEditForm id={shiftId} onSubmitSuccess={handleHide} />
                </Modal.Body>
                <Modal.Footer>
                    <ConfirmationModal
                        key="confirmationModal"
                        onConfirm={() => {
                            deleteShift(shiftId);
                            handleHide();
                        }}
                        actionBtnLabel="Delete"
                        actionBtnStyle="danger"
                        confirmBtnLabel="Delete"
                        confirmBtnStyle="danger"
                        message={deleteConfirmationMessage}
                        title="Delete Shift"
                    />,
                    <ScheduleShiftEditForm.SubmitButton key="save">Save</ScheduleShiftEditForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'ScheduleShiftEditModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, ScheduleShiftEditModalDispatchProps, ScheduleShiftEditModalProps>(
        null,
        {
            deleteShift
        })
        (ScheduleShiftEditModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: ScheduleShiftEditModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (shiftId: IdType) => showModal(modalConfig.name, { shiftId });
    static HideAction = () => hideModal(modalConfig.name);
}