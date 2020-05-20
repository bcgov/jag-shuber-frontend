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
    sectionName?: string;
}

interface SheriffProfileModalStateProps {
    sheriff: Sheriff;
}

export interface SheriffProfileModalDispatchProps {
    showSheriffProfileModal: (sheriffId: IdType, isEditing: boolean, sectionName: string) => void;
    hideSheriffProfileModal: () => void;
}

type CompositeProps =
    SheriffProfileModalProps & SheriffProfileModalDispatchProps & SheriffProfileModalStateProps & IModalInjectedProps;

const modalConfig = {
    name: 'SheriffProfileModal'
};

class SheriffProfileModal extends React.PureComponent<CompositeProps> {
    render() {
        const {
            show,
            handleHide,
            // TODO: Turn off forced editing if we implement a read-only view for DataTables
            // isEditing = false,
            showSheriffProfileModal,
            hideSheriffProfileModal,
            sheriffId
        } = this.props;

        // TODO: Turn off forced editing if we implement a read-only view for DataTables
        let isEditing = true;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                // TODO: Accept a prop for dialogClassName...
                dialogClassName="modal-medium"
            >
                <Modal.Header closeButton={true}>
                    {isEditing && 'Updating'} User Profile
                </Modal.Header>
                <Modal.Body>
                    {/* TODO: We temp disable button we only want edit mode for now */}
                    {/* !isEditing && <Button
                        bsStyle="primary"
                        style={{ position: 'absolute', right: 15, zIndex: 100 }}
                        onClick={() => {
                            const sectionName = 'leaves'; // TODO: What are the other names
                            showSheriffProfileModal(sheriffId, true, sectionName);
                        }}
                    >
                        <Glyphicon glyph="pencil" />
                    </Button> */}
                    <SheriffProfile
                        // isEditing={isEditing}
                        // TODO: We temp disable button we only want edit mode for now
                        isEditing={true}
                        sheriffId={sheriffId}
                        onSubmitSuccess={() => showSheriffProfileModal(sheriffId, false, 'id')}
                    />
                </Modal.Body>
                {isEditing &&
                    <Modal.Footer>
                        <>
                            <Button bsStyle={`default`} onClick={() => hideSheriffProfileModal()}>
                                <Glyphicon glyph="ban-circle" /> Cancel
                            </Button>
                            &nbsp;
                            <SheriffProfile.SubmitButton>
                                <Glyphicon glyph="ok" /> Save
                            </SheriffProfile.SubmitButton>
                        </>
                    </Modal.Footer>}
            </Modal>
        );
    }
}

const showAction = (sheriffId: IdType, isEditing: boolean = false, sectionName?: string) => {
    const modalProps = { sheriffId, isEditing, sectionName };
    return showModal(modalConfig.name, modalProps);
};

const hideAction = () => {
    return hideModal(modalConfig.name);
};

const mapStateToModalProps = (state: RootState, { sheriffId }: SheriffProfileModalProps) => {
    return { sheriff: getSheriff(sheriffId)(state) as Sheriff };
};

const mapDispatchToModalProps = {
    showSheriffProfileModal: showAction,
    hideSheriffProfileModal: hideAction
};

const ConnectedModal = connect<SheriffProfileModalStateProps, SheriffProfileModalDispatchProps, SheriffProfileModalProps, RootState>(
    mapStateToModalProps,
    mapDispatchToModalProps
)(SheriffProfileModal) as any;

const ReduxModal = connectModal(modalConfig)(ConnectedModal);

export default class extends ReduxModal {
    static modalName = modalConfig.name;
    static ShowAction = showAction;
    static ShowButton = (props: SheriffProfileModalProps) => {
        return <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />;
    };

    static HideAction = () => hideAction();
}
