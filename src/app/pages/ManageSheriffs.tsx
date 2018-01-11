import * as React from 'react';
import {default as CreateSheriffForm} from '../modules/sheriffs/containers/CreateSheriffForm';
import { 
    Button, 
    Modal
} from 'react-bootstrap';
import OnDutySheriffs from '../modules/sheriffs/containers/OnDutySheriffs';


interface AddSheriffModalProps{
    open?: boolean;
}

interface AddSheriffModalState{
    showModal?: boolean;

}

class AddSheriffModal extends React.Component<AddSheriffModalProps, AddSheriffModalState>{
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
				<Button bsStyle="success" bsSize="large" onClick={() => this.handleShow()}>
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
export interface ManageSheriffsProps{
    
}


class ManageSheriffs extends React.PureComponent<ManageSheriffsProps, any>{
    render(){
        return (
            <div>
                <h1>Manage Sheriffs</h1>

                <OnDutySheriffs />

                <AddSheriffModal />
            </div>
        );
    }
}

export default ManageSheriffs;