import * as React from 'react';
import { default as AssignmentDutyCreateForm } from '../containers/AssignmentDutyCreateForm';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';

export default class AssignmentDutyAddModal extends React.Component {
    render() {
        return (
            <ModalWrapper
                title="Add a Duty"
                showButton={({ handleShow }) =>
                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => handleShow()}>
                        <Glyphicon glyph="plus" />
                    </Button>}
                body={({ handleClose }) =>
                    <AssignmentDutyCreateForm onSubmitSuccess={handleClose} />}
                footerComponent={
                    <AssignmentDutyCreateForm.SubmitButton bsStyle="primary">
                        Save
                    </AssignmentDutyCreateForm.SubmitButton>}
            />
        );
    }
}