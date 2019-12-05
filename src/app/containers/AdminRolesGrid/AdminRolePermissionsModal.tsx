import * as React from 'react';
import {
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../../api';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

export interface AdminRolePermissionsModalProps {
    isDefaultTemplate?: boolean;
}

export default class AdminRolePermissionsModal extends React.Component<AdminRolePermissionsModalProps>{
    render() {
        const { isDefaultTemplate = false } = this.props;
        const title = `Add ${isDefaultTemplate === true ? 'Default ' : ''}`;
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
                        <div>
                    )}
                    footerComponent={
                        <Button>
                            Save
                        </Button>
                    }
                />
            </div>
        );
    }
}
