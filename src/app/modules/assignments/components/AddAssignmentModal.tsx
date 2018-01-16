import * as React from 'react';
import {default as CreateAssignmentForm} from '../containers/CreateAssignmentForm';
import { 
    Button, 
    Modal, 
    DropdownButton,
    MenuItem
} from 'react-bootstrap';


export interface AddAssignmentModalProps{
    open?: boolean;
}

export interface AddAssignmentModalState{
    showModal?: boolean;

}

export default class AddAssignmentModal extends React.Component<AddAssignmentModalProps, AddAssignmentModalState>{
    static defaultProps:AddAssignmentModalProps = {
        open: false
    }

    constructor(props: AddAssignmentModalProps){
        super(props);
        this.state = { showModal: props.open };
    }

    handleShow(){
        this.setState({ showModal: true })
    }

    handleClose(){
        this.setState({ showModal: false })
    }
    render(){
        return (
			<div>	
                <DropdownButton bsStyle="success" id="task-type-dropdown" title="Add Assignment" onSelect={() => this.handleShow()}>
                    <MenuItem eventKey="1">assignment</MenuItem>
                    <MenuItem eventKey="2">sheriff</MenuItem>
                </DropdownButton>		
				{/* <Button bsStyle="success" onClick={() => this.handleShow()}>
					Add New Assignment
				</Button> */}

				<Modal show={this.state.showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>Add Assignment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        <CreateAssignmentForm onSubmitSuccess={()=>this.handleClose()}/>
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