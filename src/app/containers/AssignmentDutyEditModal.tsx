import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import AssignmentDutyEditForm from './AssignmentDutyEditForm';
import ModalWrapper from './ModalWrapper';
import { IdType } from '../api';

export interface AssignmentDutyEditModalProps {
    dutyId: IdType;
    color?: string
}

export default class AssignmentDutyEditModal extends React.PureComponent<AssignmentDutyEditModalProps>{
    render() {
        const {
            dutyId,
            color = 'white'
         } = this.props;

        return (
            <div>
                <ModalWrapper
                    title="Edit Duty"
                    showButton={
                        ({ handleShow }) =>
                            <Button bsStyle="link" bsSize="medium" onClick={() => handleShow()}>
                                <Glyphicon glyph="pencil" style={{ color }} />
                            </Button>}
                    body={({ handleClose }) => {
                        return (
                            <AssignmentDutyEditForm id={dutyId} onSubmitSuccess={handleClose} />
                        );
                    }}
                    footerComponent={<AssignmentDutyEditForm.SubmitButton>Save</AssignmentDutyEditForm.SubmitButton>}
                />
            </div>
        );
    }
}