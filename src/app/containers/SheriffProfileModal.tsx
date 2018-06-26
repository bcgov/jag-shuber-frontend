import React from 'react';
import { RootState } from '../store';
import {
    Modal
} from 'react-bootstrap';
import {
    Sheriff,
    IdType
} from '../api';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { getSheriff } from '../modules/sheriffs/selectors';
import SheriffProfile from './SheriffProfile';

interface SheriffProfileModalProps {
    sheriffId: IdType;
    isEditing?: boolean;
}

interface SheriffProfileModalStateProps {
    sheriff: Sheriff;
}

export interface SheriffProfileModalDispatchProps {
    showSheriffProfileModal: (sheriffId: IdType, isEditing: boolean) => void;
}

type CompositeProps =
    SheriffProfileModalProps & SheriffProfileModalDispatchProps & SheriffProfileModalStateProps & IModalInjectedProps;
class SheriffProfileModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            // sheriff, 
            show,
            handleHide,
            isEditing = false,
            showSheriffProfileModal,
            sheriffId
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
                    Sheriff Profile
                </Modal.Header>
                <Modal.Body>
                    {!isEditing && <Button
                        bsStyle="primary"
                        style={{ float: 'right' }}
                        onClick={() => showSheriffProfileModal(sheriffId, true)}
                    >
                        <Glyphicon glyph="pencil" />
                    </Button>}
                    <SheriffProfile
                        isEditing={isEditing}
                        sheriffId={sheriffId}
                        onSubmitSuccess={() => showSheriffProfileModal(sheriffId, false)}
                    />
                    {/* {isEditing && 
                        <SheriffProfileEditForm 
                            id={sheriff.id} 
                            onSubmitSuccess={() => showSheriffProfileModal(sheriffId, false)}
                        />}
                    {!isEditing && <SheriffProfileDisplay sheriff={sheriff}/>} */}
                </Modal.Body>
                {isEditing &&
                    <Modal.Footer>
                        <div>
                            <Button onClick={() => showSheriffProfileModal(sheriffId, false)}>
                                Cancel
                                </Button>
                            <SheriffProfile.SubmitButton key="save">
                                Save
                            </SheriffProfile.SubmitButton>
                        </div>
                    </Modal.Footer>}
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'SheriffProfileModal'
};

const showAction = (sheriffId: IdType, isEditing: boolean = false, sectionName?: string) => (
    showModal(modalConfig.name, { sheriffId, isEditing, sectionName })
);
// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<SheriffProfileModalStateProps, SheriffProfileModalDispatchProps, SheriffProfileModalProps, RootState>(
        (state, { sheriffId }) => ({
            sheriff: getSheriff(sheriffId)(state) as Sheriff
        }),
        { showSheriffProfileModal: showAction })
        (SheriffProfileModal) as any
) {
    static modalName = modalConfig.name;
    static ShowAction = showAction;
    static ShowButton = (props: SheriffProfileModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )
    static HideAction = () => hideModal(modalConfig.name);
}