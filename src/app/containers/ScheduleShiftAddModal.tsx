import * as React from 'react';
import * as moment from 'moment';
import ScheduleShiftCreateForm from './ScheduleShiftCreateForm';
import ModalWrapper from './ModalWrapper/ModalWrapper';
import { 
    Button,
    Glyphicon
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
                        <Button bsStyle="link" bsSize="large" style={{color: 'white'}}  onClick={() => handleShow()}>
                            <Glyphicon glyph="plus" />
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