import React from 'react';
import { Field } from 'redux-form';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from '../../../containers/ModalWrapper/ModalWrapper';
import DataTable, { EmptyDetailRow } from '../../../components/Table/DataTable';

import SelectorField from '../../../components/FormElements/SelectorField';
import FrontendScopeSelector from '../containers/FrontendScopeSelector';
import RemoveRow from '../../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../../components/TableColumnActions/ExpireRow';
import DeleteRow from '../../../components/TableColumnActions/DeleteRow';
import ApiScopeSelector from '../containers/ApiScopeSelector';
import ApiScopeCodeDisplay from '../containers/ApiScopeCodeDisplay';
import ApiScopeDescriptionDisplay from '../containers/ApiScopeDescriptionDisplay';
import AdminRoleScopeAccessModal from './AdminRoleScopeAccessModal';
import FrontendScopeCodeDisplay from '../containers/FrontendScopeCodeDisplay';
import FrontendScopeDescriptionDisplay from '../containers/FrontendScopeDescriptionDisplay';
import { RoleApiScope, RoleFrontendScope } from '../../../api';

class RoleApiScopesDataTable extends DataTable<RoleApiScope> {}
class RoleFrontendScopesDataTable extends DataTable<RoleFrontendScope> {}

export interface AdminEffectivePermissionsModalProps {
    isOpen?: boolean;
    isDefaultTemplate?: boolean;
    parentModel?: any;
    parentModelId?: any;
}

export default class AdminEffectivePermissionsModal extends React.Component<AdminEffectivePermissionsModalProps> {
    reduxFormKey = 'roles';
    formFieldNames = {
        roles: 'roles.roles',
        apiScopes: 'roles.apiScopes',
        frontendScopes: 'roles.frontendScopes',
        roleApiScopesGrouped: 'roles.roleApiScopesGrouped',
        roleFrontendScopesGrouped: 'roles.roleFrontendScopesGrouped',
        rolePermissionsGrouped: 'roles.rolePermissions',
        roleApiPermissionsGrouped: 'roles.roleApiPermissionsGrouped',
        roleFrontendPermissionsGrouped: 'roles.roleFrontendPermissionsGrouped',
        roleApiScopePermissionsGrouped: 'roles.roleApiScopePermissionsGrouped',
        roleFrontendScopePermissionsGrouped: 'roles.roleFrontendScopePermissionsGrouped'
    };

    private modalWrapper?: any;

    constructor(props: AdminEffectivePermissionsModalProps) {
        super(props);
    }

    handleClose = (e: React.SyntheticEvent<any>) => {
        e.preventDefault();
        e.stopPropagation();
        return (this.modalWrapper) ? this.modalWrapper.handleClose() : undefined;
    }

    // @ts-ignore
    render() {
        const { isDefaultTemplate = false, isOpen, parentModel } = this.props;
        const title = `View Effective Permissions`; // TODO: Auto switch text between 'Component' and 'API'

        const parentModelId = parentModel.id ? parentModel.id : null

        return (
            <div>
                <ModalWrapper
                    ref={(wrapper) => this.modalWrapper = wrapper}
                    styleClassName="modal-wrapper-medium"
                    showButton={() => null}
                    isOpen={isOpen}
                    title={title}
                    body={({ handleClose }: any) => (
                        <>
                            <RoleFrontendScopesDataTable
                                fieldName={`${this.formFieldNames.roleFrontendScopesGrouped}['${parentModelId}']`}
                                title={''} // Leave this blank
                                columns={[
                                    DataTable.SelectorFieldColumn('Application Access', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: FrontendScopeSelector, displayInfo: true, disabled: true }),
                                    DataTable.MappedTextColumn('Component Code', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: FrontendScopeCodeDisplay, displayInfo: false }),
                                    DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: FrontendScopeDescriptionDisplay, displayInfo: false })
                                    // DataTable.ButtonColumn('Configure Access', 'list', { displayInfo: true }, onButtonClicked)
                                ]}
                                rowComponent={EmptyDetailRow}
                                shouldDisableRow={() => true}
                                initialValue={{
                                    roleId: parentModelId
                                }}
                                modalProps={{ roleId: parentModelId }}
                                modalComponent={AdminRoleScopeAccessModal}
                            />
                            <RoleApiScopesDataTable
                                fieldName={`${this.formFieldNames.roleApiScopesGrouped}['${parentModelId}']`}
                                title={''} // Leave this blank
                                columns={[
                                    DataTable.SelectorFieldColumn('API Authorization Scope', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: ApiScopeSelector, displayInfo: true }),
                                    DataTable.MappedTextColumn('Scope Code', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: ApiScopeCodeDisplay, displayInfo: false }),
                                    DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '200px' }, selectorComponent: ApiScopeDescriptionDisplay, displayInfo: false }),
                                    // DataTable.ButtonColumn('Configure Access', 'eye-open', { displayInfo: true }, onButtonClicked),
                                ]}
                                rowComponent={EmptyDetailRow}
                                shouldDisableRow={() => true}
                                initialValue={{
                                    roleId: parentModelId
                                }}
                                modalProps={{ roleId: parentModelId }}
                                modalComponent={AdminRoleScopeAccessModal}
                            />
                        </>
                    )}
                    footerComponent={
                        <>
                            <Button bsStyle={`default`} onClick={this.handleClose}>
                                <Glyphicon glyph="ban-circle" /> Cancel
                            </Button>
                            &nbsp;
                            <Button bsStyle={`success`} onClick={this.handleClose}>
                                <Glyphicon glyph="ok" /> OK
                            </Button>
                        </>
                    }
                />
            </div>
        );
    }
}
