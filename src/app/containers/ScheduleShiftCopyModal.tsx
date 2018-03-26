import * as React from 'react';
import * as moment from 'moment';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';
import ScheduleShiftCopyForm from './ScheduleShiftCopyForm';

export interface ScheduleShiftCopyModalProps {
}

export default class ScheduleShiftCopyModal extends React.Component<ScheduleShiftCopyModalProps>{
    render() {
        return (
            <div>
                <ModalWrapper
                    title="Copy Shifts"
                    showButton={({ handleShow }) => (
                        <Button bsStyle="link" bsSize="large" style={{color: 'white'}}  onClick={() => handleShow()}>
                            <Glyphicon glyph="repeat" />
                        </Button>
                    )}
                    body={({handleClose}) => (
                        <ScheduleShiftCopyForm 
                            onSubmitSuccess={handleClose}
                            copyWeekStart={moment().startOf('week').subtract(1, 'week')}
                            createWeekStart={moment().startOf('week')}
                        />
                    )}
                    footerComponent={(
                        <ScheduleShiftCopyForm.SubmitButton>
                            OK
                        </ScheduleShiftCopyForm.SubmitButton>
                    )}
                />
            </div>
        );
    }
}