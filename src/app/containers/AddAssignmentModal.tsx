import * as React from 'react';
import { 
    Button, 
    Modal, 
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../api'
import AssignmentTemplateCreateForm from './AssignmentTemplateCreateForm';
import {default as AssignmentCreateForm} from '../containers/AssignmentCreateForm';

export interface AddAssignmentModalProps{
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
}

export interface AddAssignmentModalState{
    showModal?: boolean;
    workSectionId?: string;
}

export default class AddAssignmentModal extends React.Component<AddAssignmentModalProps, AddAssignmentModalState>{
    static defaultProps:AddAssignmentModalProps = {
        isOpen: false,
        isDefaultTemplate: false    
    }

    constructor(props: AddAssignmentModalProps){
        super(props);
        this.state = { showModal: props.isOpen };
    }

    handleShow(workSectionId:string){
        this.setState({ 
            showModal: true,
            workSectionId: workSectionId
        })
    }

    handleClose(){
        this.setState({ showModal: false })
    }

    render(){
        const { showModal, workSectionId } = this.state;
        const { isDefaultTemplate } = this.props;
        const formProps =  {
            workSectionId,
            isDefaultTemplate,
            onSubmitSuccess: ()=>this.handleClose()
        }
        return (
			<div>	
                <DropdownButton bsStyle="success" id="task-type-dropdown" title="Add Assignment" >
                    {
                        Object.keys(WORK_SECTIONS).map((k, i)=>{
                            return(
                                <MenuItem onSelect={() => this.handleShow(k)}>{WORK_SECTIONS[k]}</MenuItem>
                            );
                        })
                    }
                </DropdownButton>		

				<Modal show={showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>Add Assignment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        {isDefaultTemplate && <AssignmentTemplateCreateForm {...formProps}/>}
                        {!isDefaultTemplate && <AssignmentCreateForm {...formProps} />}                        
					</Modal.Body>
					<Modal.Footer>
                        {!isDefaultTemplate && <AssignmentCreateForm.SubmitButton bsStyle="primary">Save</AssignmentCreateForm.SubmitButton>}
                        {isDefaultTemplate && <AssignmentTemplateCreateForm.SubmitButton bsStyle="primary">Save</AssignmentTemplateCreateForm.SubmitButton>}
						<Button onClick={() => this.handleClose()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}