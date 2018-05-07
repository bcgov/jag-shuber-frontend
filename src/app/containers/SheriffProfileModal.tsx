import * as React from 'react';
import {
    Modal
} from 'react-bootstrap';
import SheriffEditForm from './SheriffEditForm';
import { IdType } from '../api';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';

export interface SheriffProfileModalProps {
    sheriffId: IdType;
}

type CompositeProps = SheriffProfileModalProps & IModalInjectedProps;
class SheriffProfileModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            sheriffId,
            show,
            handleHide
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-large"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true}>Sheriff Profile</Modal.Header>
                <Modal.Body>
                    <SheriffEditForm id={sheriffId} onSubmitSuccess={handleHide} />
                </Modal.Body>
                <Modal.Footer>
                    <SheriffEditForm.SubmitButton key="save">Save</SheriffEditForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'SheriffProfileModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, {}, SheriffProfileModalProps>(
        null, {})
        (SheriffProfileModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: SheriffProfileModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )
    static ShowAction = (sheriffId: IdType) => {
        showModal(modalConfig.name, { sheriffId });
    }
    static HideAction = () => hideModal(modalConfig.name);
}