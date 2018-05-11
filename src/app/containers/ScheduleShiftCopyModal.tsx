import * as React from 'react';
import * as moment from 'moment';
import {
    Button
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import ScheduleShiftCopyForm from './ScheduleShiftCopyForm';

export interface ScheduleShiftCopyModalProps {
}

export default class ScheduleShiftCopyModal extends React.Component<ScheduleShiftCopyModalProps> {
    render() {
        return (
            <div> 
                <ModalWrapper
                    title=""
                    showButton={({ handleShow }) => (
                        <Button 
                            bsStyle="link" 
                            bsSize="medium" 
                            style={{color: '#494949', width: '100%', textAlign: 'left'}}  
                            onClick={() => handleShow()}
                        >
                            Copy Shifts
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