import * as React from 'react';
import {default as CreateSheriffForm} from '../containers/CreateSheriffForm';
import { 
    Button, 
    Modal
} from 'react-bootstrap';
// import { Glyphicon } from 'react-bootstrap';


export interface AddSheriffModalProps{
    open?: boolean;
}

export interface AddSheriffModalState{
    showModal?: boolean;

}

export default class AddSheriffModal extends React.Component<AddSheriffModalProps, AddSheriffModalState>{
    static defaultProps:AddSheriffModalProps = {
        open: false
    }

    constructor(props: AddSheriffModalProps){
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
				<Button bsStyle="success" onClick={() => this.handleShow()}>
					Add a Sheriff
				</Button>

				<Modal show={this.state.showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>Add Sheriff</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        <CreateSheriffForm onSubmitSuccess={()=>this.handleClose()}/>
					</Modal.Body>
					<Modal.Footer>
                        <CreateSheriffForm.SubmitButton bsStyle="primary">Save</CreateSheriffForm.SubmitButton>
						<Button onClick={() => this.handleClose()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}