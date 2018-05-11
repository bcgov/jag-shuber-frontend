import * as React from 'react';
import * as moment from 'moment';
import ScheduleShiftCreateForm from './ScheduleShiftCreateForm';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import { 
    Button
} from 'react-bootstrap';

export interface ScheduleShiftAddModalProps {

}

export default class ScheduleShiftAddModal extends React.Component<ScheduleShiftAddModalProps>{
    render() {
        return (
            <div> 
                <ModalWrapper
                    title="Add a Shift"
                    showButton={({ handleShow }) => (
                        <Button 
                            bsStyle="link" 
                            bsSize="medium" 
                            style={{color: '#494949', width: '100%', textAlign: 'left'}}  
                            onClick={() => handleShow()}
                        >
                            Add Shift
                        </Button>
                    )}
                    body={({ handleClose }) => (
                        <ScheduleShiftCreateForm 
                            onSubmitSuccess={handleClose} 
                            weekStart={moment().startOf('week')}
                            isSingleShift={false}
                        />
                    )}
                    footerComponent={(
                        <ScheduleShiftCreateForm.SubmitButton>
                            Save
                        </ScheduleShiftCreateForm.SubmitButton>
                    )}
                />
            </div>
        );
    }
}