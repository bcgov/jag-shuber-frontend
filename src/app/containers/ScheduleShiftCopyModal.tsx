import * as React from 'react';
import * as moment from 'moment';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';
import ScheduleShiftCopyForm from './ScheduleShiftCopyForm';
// import { connect } from 'react-redux';
// import { deleteAssignment } from '../modules/assignments/actions';

export interface ScheduleShiftCopyModalProps {
}

export default class ScheduleShiftCopyModal extends React.Component<ScheduleShiftCopyModalProps>{
    render() {
        // const { deleteAssignment, assignmentId } = this.props;
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