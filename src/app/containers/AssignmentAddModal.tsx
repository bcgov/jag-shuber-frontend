import * as React from 'react';
import {
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../api'
import AssignmentTemplateCreateForm from './AssignmentTemplateCreateForm';
import ModalWrapper from './ModalWrapper';
import AssignmentCreateForm from './AssignmentCreateForm';

export interface AssignmentAddModalProps {
    isDefaultTemplate?: boolean;
}


export default class AssignmentAddModal extends React.Component<AssignmentAddModalProps>{
    render() {
        const { isDefaultTemplate = false } = this.props;
        const title = `Add ${isDefaultTemplate===true ? 'Default ' : ''}Assignment`;
        return (
            <div>
                <ModalWrapper
                    title={title}
                    showButton={({ handleShow }) =>
                        <DropdownButton bsStyle="primary" id="task-type-dropdown" title={title} >
                            {
                                Object.keys(WORK_SECTIONS).map((k, i) => {
                                    return (
                                        <MenuItem onSelect={() => handleShow({ workSectionId: k })}>{WORK_SECTIONS[k]}</MenuItem>
                                    );
                                })
                            }
                        </DropdownButton>
                    }
                    body={({ handleClose, workSectionId }: any) => (
                        isDefaultTemplate
                            ? <AssignmentTemplateCreateForm onSubmitSuccess={handleClose} workSectionId={workSectionId} />
                            : <AssignmentCreateForm onSubmitSuccess={handleClose} workSectionId={workSectionId} />
                    )}
                    footerComponent={
                        isDefaultTemplate
                            ? <AssignmentTemplateCreateForm.SubmitButton>Save</AssignmentTemplateCreateForm.SubmitButton>
                            : <AssignmentCreateForm.SubmitButton>Save</AssignmentCreateForm.SubmitButton>
                    }
                />
            </div>
        );
    }
}