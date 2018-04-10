import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import { IdType } from '../api';
import ScheduleShiftEditForm from './ScheduleShiftEditForm';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { connect } from 'react-redux';
import { deleteShift } from '../modules/shifts/actions';
export interface ScheduleShiftEditModalProps {
    shiftId: IdType;
    color?: string;
}

export interface ScheduleShiftEditModalDispatchProps {
    deleteShift: (id: IdType) => void;
}

class ScheduleShiftEditModal extends React.PureComponent<
    ScheduleShiftEditModalProps & ScheduleShiftEditModalDispatchProps>{

    render() {
        const {
            shiftId,
            color = 'white',
            // tslint:disable-next-line:no-shadowed-variable
            deleteShift
         } = this.props;

        const deleteConfirmationMessage =
            <p style={{ fontSize: 14 }}>Please confirm that you would like to <b>permanently delete</b> this shift.</p>;

        return (
            <div>
                <ModalWrapper
                    title="Edit Shift"
                    showButton={
                        ({ handleShow }) =>
                            <Button bsStyle="link" bsSize="xsmall" onClick={() => handleShow()}>
                                <Glyphicon glyph="pencil" style={{ color }} />
                            </Button>}
                    body={({ handleClose }) => {
                        return (
                            <ScheduleShiftEditForm id={shiftId} onSubmitSuccess={handleClose} />

                        );
                    }}
                    footerComponent={({ handleClose }) => ([
                        <ConfirmationModal
                            key="confirmationModal"
                            onConfirm={() => {
                                deleteShift(shiftId);
                                handleClose();
                            }}
                            actionBtnLabel="Delete"
                            actionBtnStyle="danger"
                            confirmBtnLabel="Delete"
                            confirmBtnStyle="danger"
                            message={deleteConfirmationMessage}
                            title="Delete Shift"
                        />,
                        <ScheduleShiftEditForm.SubmitButton key="save">Save</ScheduleShiftEditForm.SubmitButton>
                    ])}
                />
            </div>
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<{}, ScheduleShiftEditModalDispatchProps, ScheduleShiftEditModalProps>(null, { deleteShift })(ScheduleShiftEditModal);