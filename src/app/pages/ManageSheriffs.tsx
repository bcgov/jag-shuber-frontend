import * as React from 'react';
import CreateSheriffForm from '../modules/sheriffs/containers/CreateSheriffForm';
import { Button } from 'react-bootstrap';
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
                <h1>Sheriffs</h1>
                <p>TODO include the list of the available sheriff profiles</p>
                <Button bsStyle="success" onClick={handleShow}>Add a Sheriff</Button>
                
                {/* <Modal show={this.setState.showModal}>
                </Modal> */}

                <br/>
                <br/>
                <br/>
                <h1>Add a Sheriff</h1>
                <CreateSheriffForm />
            </div>
        );
    }
}

export default ManageSheriffs;