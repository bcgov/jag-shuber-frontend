import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import AssignmentEditForm from './AssignmentEditForm';
import ModalWrapper from './ModalWrapper';

export interface AssignmentEditModalProps {
    assignmentId: number;
}

export default class AssignmentEditModal extends React.PureComponent<AssignmentEditModalProps>{
    render() {
        const { assignmentId } = this.props;
        
        return (
            <div>                
                <ModalWrapper
                    title="Edit Assignment"
                    showButton={({handleShow})=><Button bsSize="xsmall" onClick={()=>handleShow()}><Glyphicon  glyph="pencil" /></Button>}
                    body={({handleClose})=>{
                        return (
                            <AssignmentEditForm id={assignmentId} onSubmitSuccess={handleClose}/>
                        )}}
                    footerComponent = {<AssignmentEditForm.SubmitButton bsStyle="primary">Save</AssignmentEditForm.SubmitButton>}
                />
            </div>
        );
    }
}