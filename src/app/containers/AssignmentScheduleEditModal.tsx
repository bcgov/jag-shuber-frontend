import * as React from 'react';
import {
    Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { IdType, Assignment } from '../api';
import AssignmentEditForm from './AssignmentEditForm';

export interface AssignmentScheduleEditModalProps {
    assignmentId: IdType;
    assignments: Assignment[];
}

type CompositeProps = AssignmentScheduleEditModalProps & IModalInjectedProps;
class AssignmentScheduleEditModal extends React.Component<CompositeProps> {
    render() {
        const {
            show,
            handleHide,
            assignmentId,
            assignments
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
                <Modal.Header closeButton={true}>Edit Assignment</Modal.Header>
                <Modal.Body>
                    <AssignmentEditForm 
                        allowEdit={false}
                        allowDelete={false} 
                        assignments={assignments}
                        id={assignmentId} 
                        onSubmitSuccess={handleHide} />
                </Modal.Body>
                <Modal.Footer>
                    <AssignmentEditForm.SubmitButton>
                        Save
                    </AssignmentEditForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}
const modalConfig = {
    name: 'AssignmentScheduleEditModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, {}, AssignmentScheduleEditModalProps>(
        null,
        {})
        (AssignmentScheduleEditModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: AssignmentScheduleEditModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (props: AssignmentScheduleEditModalProps) => showModal(modalConfig.name, props);
    static HideAction = () => hideModal(modalConfig.name);
}