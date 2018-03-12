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
    assignmentId: IdType;
}

export default class AssignmentDutyEditModal extends React.PureComponent<AssignmentDutyEditModalProps>{
    render() {
        const { dutyId, assignmentId } = this.props;
        
        return (
            <div>                
                <ModalWrapper
                    title="Edit Duty"
                    showButton={({handleShow})=><Button bsStyle="link" bsSize="medium" onClick={()=>handleShow()}><Glyphicon  glyph="pencil" style={{color:'white'}}/></Button>}
                    body={({handleClose})=>{
                        return (
                            <AssignmentDutyEditForm id={dutyId} onSubmitSuccess={handleClose} assignmentId={assignmentId}/>
                        )}}
                    footerComponent = {<AssignmentDutyEditForm.SubmitButton bsStyle="primary">Save</AssignmentDutyEditForm.SubmitButton>}
                />
            </div>
        );
    }
}