import * as React from 'react';
import { 
    Button, 
    Modal, 
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../api'
import CreateAssignmentTemplateForm from './CreateAssignmentTemplateForm';
import {default as CreateAssignmentForm} from '../containers/CreateAssignmentForm';

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
                        {isDefaultTemplate && <CreateAssignmentTemplateForm {...formProps}/>}
                        {!isDefaultTemplate && <CreateAssignmentForm {...formProps} />}                        
					</Modal.Body>
					<Modal.Footer>
                        {!isDefaultTemplate && <CreateAssignmentForm.SubmitButton bsStyle="primary">Save</CreateAssignmentForm.SubmitButton>}
                        {isDefaultTemplate && <CreateAssignmentTemplateForm.SubmitButton bsStyle="primary">Save</CreateAssignmentTemplateForm.SubmitButton>}
						<Button onClick={() => this.handleClose()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}