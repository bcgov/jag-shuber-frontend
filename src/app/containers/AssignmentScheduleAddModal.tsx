import * as React from 'react';
import {
    Modal
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { WorkSectionCode, DateType } from '../api';
import AssignmentTemplateCreateForm from './AssignmentTemplateCreateForm';

export interface AssignmentScheduleAddModalProps {
    workSectionId: WorkSectionCode;
    startDateTime: DateType;
    endDateTime: DateType;
}

type CompositeProps = AssignmentScheduleAddModalProps & IModalInjectedProps;
class AssignmentScheduleAddModal extends React.Component<CompositeProps> {
    render() {
        const {
            show,
            handleHide,
            workSectionId,
            startDateTime,
            endDateTime
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
                <Modal.Header closeButton={true}>Add Assignment</Modal.Header>
                <Modal.Body>
                    <AssignmentTemplateCreateForm
                            startDateTime={startDateTime}
                            endDateTime={endDateTime}
                            allowDelete={false}
                            allowEdit={false}
                            onSubmitSuccess={handleHide}
                            workSectionId={workSectionId}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <AssignmentTemplateCreateForm.SubmitButton>
                        Save
                    </AssignmentTemplateCreateForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}
const modalConfig = {
    name: 'AssignmentScheduleAddModal'
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<{}, {}, AssignmentScheduleAddModalProps>(
        null,
        {})
        (AssignmentScheduleAddModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: AssignmentScheduleAddModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (workSectionId: WorkSectionCode, startDateTime: DateType, endDateTime: DateType) => showModal(modalConfig.name, {workSectionId, startDateTime, endDateTime});
    static HideAction = () => hideModal(modalConfig.name);
}