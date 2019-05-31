import * as React from 'react';
import {
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../api';
import AssignmentTemplateCreateForm from './AssignmentTemplateCreateForm';
import ModalWrapper from './ModalWrapper/ModalWrapper';

export interface AssignmentAddModalProps {
    isDefaultTemplate?: boolean;
}

export default class AssignmentAddModal extends React.Component<AssignmentAddModalProps>{
    render() {
        const { isDefaultTemplate = false } = this.props;
        const title = `Add ${isDefaultTemplate === true ? 'Default ' : ''}Assignment`;
        return (
            <div>
                <ModalWrapper
                    title={title}
                    showButton={({ handleShow }) =>
                        <DropdownButton className="action-button" id="task-type-dropdown" title={title} >
                            {
                                Object.keys(WORK_SECTIONS).map((k, i) => {
                                    return (
                                        <MenuItem
                                            key={k}
                                            onSelect={() => handleShow({ workSectionId: k })}>
                                            {WORK_SECTIONS[k]}
                                        </MenuItem>
                                    );
                                })
                            }
                        </DropdownButton>}
                    body={({ handleClose, workSectionId }: any) => (
                        <AssignmentTemplateCreateForm
                            assignments={[]}
                            allowDelete={true}
                            allowEdit={true}
                            onSubmitSuccess={handleClose}
                            workSectionId={workSectionId}
                        />
                    )}
                    footerComponent={
                        <AssignmentTemplateCreateForm.SubmitButton>
                            Save
                        </AssignmentTemplateCreateForm.SubmitButton>
                    }
                />
            </div>
        );
    }
}