import * as React from 'react';
import * as moment from 'moment';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import ScheduleShiftCopyForm from './ScheduleShiftCopyForm';

export interface ScheduleShiftCopyModalProps {
}

export default class ScheduleShiftCopyModal extends React.Component<ScheduleShiftCopyModalProps> {
    render() {
        return (
            <div style={{position: 'absolute', right: 50}}>
                <ModalWrapper
                    title=""
                    showButton={({ handleShow }) => (
                        <Button bsStyle="link" bsSize="large" style={{color: 'white'}}  onClick={() => handleShow()}>
                            <Glyphicon glyph="repeat" />
                        </Button>
                    )}
                    body={({handleClose}) => (
                        <ScheduleShiftCopyForm 
                            onSubmitSuccess={handleClose}
                            weekStartSource={moment().startOf('week').subtract(1, 'week')}
                            weekStartDestination={moment().startOf('week')}
                        />
                    )}
                    footerComponent={(
                        <ScheduleShiftCopyForm.SubmitButton>
                            OK
                        </ScheduleShiftCopyForm.SubmitButton>
                    )}
                    styleClassName="modal-wrapper-medium"
                />
            </div>
        );
    }
}