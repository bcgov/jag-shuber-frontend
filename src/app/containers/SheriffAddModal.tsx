import * as React from 'react';
import { default as SheriffCreateForm } from '../containers/SheriffCreateForm';
import {
    Button
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';

export default class SheriffAddModal extends React.Component {
    render() {
        return (
            <ModalWrapper
                title="Add Sheriff"
                showButton={({ handleShow }) => 
                    <Button bsStyle="primary" onClick={() => handleShow()}>
                        Add a Sheriff
                    </Button>}
                body={({ handleClose }) => <SheriffCreateForm onSubmitSuccess={handleClose} />}
                footerComponent={<SheriffCreateForm.SubmitButton>Save</SheriffCreateForm.SubmitButton>}
            />
        );
    }
}