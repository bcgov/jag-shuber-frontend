import * as React from 'react';
import CreateSheriffForm from '../modules/sheriffs/containers/CreateSheriffForm';
import { Button } from 'react-bootstrap';
import OnDutySheriffs from '../modules/sheriffs/containers/OnDutySheriffs';
// import { Modal } from 'react-bootstrap';

export interface ManageSheriffsProps{
    
}
class ManageSheriffs extends React.PureComponent<ManageSheriffsProps, any>{
    render(){
       const handleShow = () => {
           this.setState({showModal: true});
       };
        return (
            <div>
                <h1>Manage Sheriffs</h1>

                <h3>Add a Sheriff</h3>
                <CreateSheriffForm />
                
                <h3>Your Team</h3>
                <OnDutySheriffs />
                <Button bsStyle="success" onClick={handleShow}>Add a Sheriff</Button>
                
                {/* <Modal show={this.setState.showModal}>
                </Modal> */}

                <br/>
                <br/>
                <br/>
                
            </div>
        );
    }
}

export default ManageSheriffs;