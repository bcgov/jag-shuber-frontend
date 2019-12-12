import * as React from 'react';
import { Field } from 'redux-form';
import {
    Button,
    DropdownButton, Glyphicon,
    MenuItem
} from 'react-bootstrap';
import { WORK_SECTIONS } from '../../api';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';

import SelectorField from '../../components/FormElements/SelectorField';
import FrontendScopeSelector from './FrontendScopeSelector';

export interface AdminScopePermissionsModalProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    parentModelId?: any;
}

export default class AdminScopePermissionsModal extends React.Component<AdminScopePermissionsModalProps>{
    // @ts-ignore
    render() {
        const { isDefaultTemplate = false, isOpen, parentModelId } = this.props;
        const title = `Define ${isDefaultTemplate === true ? 'Default ' : ''}Component Permissions`; // TODO: Auto switch text between 'Component' and 'API'
        return (
            <div>
                <ModalWrapper
                    styleClassName="modal-wrapper-medium"
                    showButton={() => null}
                    isOpen={isOpen}
                    title={title}
                    body={({ handleClose, workSectionId }: any) => (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Field
                                        name={`component`}
                                        component={(p) => <SelectorField
                                            {...p}
                                            showLabel={true}
                                            // TODO: Provide this via props or something so we can use custom codes...
                                            SelectorComponent={
                                                (sp) =>
                                                    // TODO: Actually make this work
                                                    <FrontendScopeSelector {...sp} value={parentModelId} />
                                                }
                                        />}
                                        label={'Choose Component'}
                                    >
                                    </Field>
                                    {/* This wrapper just adds equal spacing to the previous form group */}
                                    {/* TODO: Where are the spacing utils? */}
                                    <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                                        <Glyphicon glyph="info-sign" />
                                    </div>
                                </div>
                                {/*<div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button>
                                        <Glyphicon glyph="plus" /> Add Permission
                                    </Button>`
                                </div>*/}
                            </div>
                            <DataTable
                                fieldName={'roles.rolePermissions'}
                                title={''} // Leave this blank
                                displayHeaderActions={true}
                                displayActionsColumn={true}
                                columns={[
                                    DataTable.TextFieldColumn('Permission Name', { fieldName: 'displayName', displayInfo: true }),
                                    DataTable.TextFieldColumn('Code', { fieldName: 'displayName', displayInfo: true }),
                                    DataTable.TextAreaColumn('Description', { fieldName: 'description', displayInfo: true })
                                ]}
                                rowComponent={EmptyDetailRow}
                                modalComponent={EmptyDetailRow}
                            />
                        </>
                    )}
                    footerComponent={
                        <Button bsStyle={`success`}>
                            Save
                        </Button>
                    }
                />
            </div>
        );
    }
}
