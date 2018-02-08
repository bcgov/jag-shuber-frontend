import * as React from 'react';
import {default as SheriffCreateForm} from '../containers/SheriffCreateForm';
import { 
    Button
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';



export default class SheriffAddModal extends React.Component{
    render(){
        return (
			<div>
                <ModalWrapper
                    title="Edit Assignment"
                    showButton={(handleOpen)=><Button bsStyle="success" onClick={handleOpen}>Add a Sheriff</Button>}
                    body={({handleClose})=><SheriffCreateForm onSubmitSuccess={handleClose}/>}
                    footerComponent = {<SheriffCreateForm.SubmitButton bsStyle="primary">Save</SheriffCreateForm.SubmitButton>}
                />			
			</div>
        );
    }
}