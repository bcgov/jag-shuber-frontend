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

export interface AdminRoleScopeAccessModalProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    roleId?: any;
    parentModel?: any;
    parentModelId?: any;
}

export default class AdminRoleScopeAccessModal extends React.Component<AdminRoleScopeAccessModalProps>{
    // @ts-ignore
    render() {
        const { isDefaultTemplate = false, isOpen, roleId, parentModel, parentModelId } = this.props;
        const title = `Edit ${isDefaultTemplate === true ? 'Default ' : ''}Component Access`;

        return (
            <div>
                <ModalWrapper
                    // TODO: Are these modal sizes responsive?
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
                                                    <FrontendScopeSelector {...sp} value={parentModel.scopeId} />
                                                }
                                        />}
                                        label={'Choose Scope (Component / API)'}
                                    >
                                    </Field>
                                    {/* This wrapper just adds equal spacing to the previous form group */}
                                    {/* TODO: Where are the spacing utils? */}
                                    <div className="form-group" style={{ marginLeft: '0.5rem' }}>
                                        <Glyphicon glyph="info-sign" />
                                    </div>
                                </div>
                                {/* TODO: Delete? This shouldn't be needed here */}
                                {/*<div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button>
                                        <Glyphicon glyph="plus" /> Add Permission
                                    </Button>`
                                </div>*/}
                            </div>
                            {parentModelId && (
                            <DataTable
                                fieldName={`roles.frontendScopePermissionsGrouped['${parentModel.scopeId}']`}
                                title={''} // Leave this blank
                                displayHeaderActions={false}
                                displayActionsColumn={false}
                                columns={[
                                    DataTable.StaticTextColumn('Permission', { fieldName: 'displayName', displayInfo: false }),
                                    // DataTable.StaticTextColumn('Code', { fieldName: 'displayName', displayInfo: false }),
                                    DataTable.StaticTextColumn('Description', { fieldName: 'description', displayInfo: false }),
                                    DataTable.CheckboxColumn('Grant Access'), // TODO: Use a checkbox
                                ]}
                                rowComponent={EmptyDetailRow}
                                modalComponent={EmptyDetailRow}
                            />
                            )}
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
