import * as React from 'react';
import { 
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../api'
import AssignmentTemplateCreateForm from './AssignmentTemplateCreateForm';
// import {default as AssignmentCreateForm} from '../containers/AssignmentCreateForm';
import ModalWrapper from './ModalWrapper';

export interface AssignmentAddModalProps{
    isDefaultTemplate?: boolean;
}


export default class AssignmentAddModal extends React.Component<AssignmentAddModalProps>{
    render(){
        const { isDefaultTemplate } = this.props;
        // const showButton = 
        return (
			<div>
                {isDefaultTemplate &&
                    <ModalWrapper
                        title="Add Default Assignment"
                        showButton={(handleOpen) =>
                            <DropdownButton bsStyle="success" id="task-type-dropdown" title="Add Default Assignment" >
                                {
                                    Object.keys(WORK_SECTIONS).map((k, i)=>{
                                        return(
                                            <MenuItem onSelect={(k:any)=>handleOpen}>{WORK_SECTIONS[k]}</MenuItem>
                                        );
                                    })
                                }
                            </DropdownButton>	
                        }
                        body={({handleClose})=><AssignmentTemplateCreateForm onSubmitSuccess={handleClose}/>}     
                        footerComponent ={<AssignmentTemplateCreateForm.SubmitButton bsStyle="primary">Save</AssignmentTemplateCreateForm.SubmitButton>}
                     />
                }
                {/* {!isDefaultTemplate && 
                    <ModalWrapper
                        title="Add Assignment"
                        showButton={}
                        body={({handleClose})=><AssignmentCreateForm onSubmitSuccess={handleClose}/>}     
                        footerComponent ={<AssignmentCreateForm.SubmitButton bsStyle="primary">Save</AssignmentCreateForm.SubmitButton>}
                    />
                } */}
			</div>
        );
    }
}