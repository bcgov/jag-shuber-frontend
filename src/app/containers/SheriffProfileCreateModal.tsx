import React from 'react';
import {
    Modal, Glyphicon
} from 'react-bootstrap';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { Button } from 'react-bootstrap';
import SheriffProfile from './SheriffProfile';
import { connect } from 'react-redux';
import { SheriffProfileModalDispatchProps } from './SheriffProfileModal';
import { RootState } from '../store';

interface SheriffProfileCreateModalProps {

}

type CompositeProps = SheriffProfileCreateModalProps & IModalInjectedProps;
class SheriffProfileCreateModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            show,
            handleHide,
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-medium"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true}>
                    Create Sheriff Profile
                </Modal.Header>
                <Modal.Body>
                    <SheriffProfile
                        isEditing={true}
                        onSubmitSuccess={() => handleHide()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button onClick={() => handleHide()}>
                            Cancel
                        </Button>
                        <SheriffProfile.SubmitButton>
                            Save
                        </SheriffProfile.SubmitButton>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'SheriffProfileCreateModal'
};

const showAction = (props: SheriffProfileCreateModalProps = {}) => (
    showModal(modalConfig.name, props)
);

const ConnectedModal = SheriffProfileCreateModal as any;

const ReduxModal = connectModal(modalConfig)(ConnectedModal);

export default class extends ReduxModal {
    static modalName = modalConfig.name;
    static ShowAction = showAction;
    static ShowButton = connect<{}, { showAction: (props: SheriffProfileCreateModalProps) => void }, SheriffProfileCreateModalProps>(undefined, { showAction })(
        ({ showAction: showModalAction, ...props }) => (
            <Button className="action-button" onClick={() => showModalAction(props)}>
                <Glyphicon glyph="plus" /> Add a User
            </Button>
        )
    );

    static HideAction = () => hideModal(modalConfig.name);
}
