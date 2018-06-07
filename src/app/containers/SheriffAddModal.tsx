import React from 'react';
import { default as SheriffCreateForm } from '../containers/SheriffCreateForm';
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
                body={({ handleClose }) => <SheriffCreateForm onSubmitSuccess={handleClose} />}
                footerComponent={<SheriffCreateForm.SubmitButton>Save</SheriffCreateForm.SubmitButton>}
                styleClassName="modal-wrapper-medium"
            />
        );
    }
}