import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';
import { IdType } from '../api';
import ScheduleShiftEditForm from './ScheduleShiftEditForm';

export interface ScheduleShiftEditModalProps {
    shiftId: IdType;
    color?: string;
}

export default class ScheduleShiftEditModal extends React.PureComponent<ScheduleShiftEditModalProps>{
    render() {
        const {
            shiftId,
            color = 'white'
         } = this.props;

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
                    footerComponent={<ScheduleShiftEditForm.SubmitButton>Save</ScheduleShiftEditForm.SubmitButton>}
                />
            </div>
        );
    }
}