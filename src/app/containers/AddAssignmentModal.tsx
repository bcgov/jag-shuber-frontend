import * as React from 'react';
import {default as CreateAssignmentForm} from '../containers/CreateAssignmentForm';
import { 
    Button, 
    Modal, 
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../api'


export interface AddAssignmentModalProps{
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
}

export interface AddAssignmentModalState{
    showModal?: boolean;
    showCourtSecurityFields?: boolean;
    showDocumentSericesFields?: boolean;
    showEscortServicesFields?: boolean;
    showGateSecurityFields?: boolean;
    showOtherAssignmentFields?: boolean;
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

    handleShow(workSiteId:string){
        this.setState({ 
            showModal: true,
            showCourtSecurityFields: WORK_SECTIONS[workSiteId] === WORK_SECTIONS.COURTS,
            showDocumentSericesFields: WORK_SECTIONS[workSiteId] === WORK_SECTIONS.DOCUMENTS,
            showEscortServicesFields: WORK_SECTIONS[workSiteId] === WORK_SECTIONS.ESCORTS,
            showGateSecurityFields: WORK_SECTIONS[workSiteId] === WORK_SECTIONS.GATES,
            showOtherAssignmentFields: WORK_SECTIONS[workSiteId] === WORK_SECTIONS.OTHER
        })
    }

    handleClose(){
        this.setState({ showModal: false })
    }

    render(){
        const { showModal, showCourtSecurityFields, showDocumentSericesFields, showEscortServicesFields, showGateSecurityFields, showOtherAssignmentFields } = this.state;
        const { isDefaultTemplate } = this.props;
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
                        <CreateAssignmentForm 
                            showCourtSecurityFields={showCourtSecurityFields} 
                            showDocumentSericesFields={showDocumentSericesFields}
                            showEscortServicesFields={showEscortServicesFields}
                            showGateSecurityFields={showGateSecurityFields}
                            showOtherAssignmentFields={showOtherAssignmentFields}
                            isDefaultTemplate = {isDefaultTemplate}
                            onSubmitSuccess={()=>this.handleClose()}
                        />
					</Modal.Body>
					<Modal.Footer>
                        <CreateAssignmentForm.SubmitButton bsStyle="primary">Save</CreateAssignmentForm.SubmitButton>
						<Button onClick={() => this.handleClose()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}