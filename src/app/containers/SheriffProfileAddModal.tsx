import React from 'react';
import { default as SheriffProfileCreateForm } from '../containers/SheriffProfileCreateForm';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper/ModalWrapper';

export default class SheriffAddModal extends React.Component {
    render() {
        return (
            <ModalWrapper
                title="Add Sheriff"
                showButton={({ handleShow }) => 
                    <Button className="action-button" onClick={() => handleShow()}>
                        <Glyphicon glyph="plus"/> Add a Sheriff
                    </Button>}
                body={({ handleClose }) => <SheriffProfileCreateForm onSubmitSuccess={handleClose} />}
                footerComponent={<SheriffProfileCreateForm.SubmitButton>Save</SheriffProfileCreateForm.SubmitButton>}
                styleClassName="modal-wrapper-medium"
            />
        );
    }
}