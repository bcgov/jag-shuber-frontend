import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import AssignmentTemplateEditForm from './AssignmentTemplateEditForm';
import ModalWrapper from './ModalWrapper';

export interface AssignmentEditModalProps {
    templateId: number;
}

export default class AssignmentEditModal extends React.Component<AssignmentEditModalProps>{
    render() {
        const { templateId } = this.props;
        
        return (
            <div>                
                <ModalWrapper
                    title="Edit Assignment"
                    showButton={({handleShow})=><Button bsSize="xsmall" onClick={()=>handleShow()}><Glyphicon  glyph="pencil" /></Button>}
                    body={({handleClose})=><AssignmentTemplateEditForm id={templateId} onSubmitSuccess={handleClose}/>}
                    footerComponent = {<AssignmentTemplateEditForm.SubmitButton bsStyle="primary">Save</AssignmentTemplateEditForm.SubmitButton>}
                />
            </div>
        );
    }
}