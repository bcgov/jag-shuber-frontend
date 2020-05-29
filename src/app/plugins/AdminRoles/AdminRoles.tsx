import React from 'react';
import {
    Alert,
    Button,
    Col, Glyphicon,
    Row, Tab,
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    Role,
    RolePermission,
    RoleFrontendScope,
    RoleApiScope
} from '../../api';

import {
    getRoles,
    getFrontendScopes,
    getFrontendScopePermissions,
    getApiScopes,
    getRoleFrontendScopes,
    getRoleApiScopes,
    getRolePermissions,
    getUserRoles,
    createOrUpdateRoles,
    createOrUpdateRoleFrontendScopes,
    createOrUpdateRoleApiScopes,
    createOrUpdateRolePermissions,
    deleteRoles,
    deleteRoleFrontendScopes,
    deleteRoleApiScopes,
    deleteRolePermissions,
    selectAdminRolesPluginSection,
    setAdminRolesPluginSubmitErrors,
    setAdminRolesPluginFilters
} from '../../modules/roles/actions';

import {
    // getUsers
} from '../../modules/user/actions';

import { RootState } from '../../store';

import {
    getAllRoles,
    getAllApiScopes,
    getAllFrontendScopes,
    getFrontendScopePermissionsGroupedByScopeId,
    getRoleApiScopesGroupedByRoleId,
    getRoleFrontendScopesGroupedByRoleId,
    getRoleFrontendScopePermissionsGroupedByScopeId,
    getRoleApiScopePermissionsGroupedByScopeId,
    findAllRoles,
    findAllApiScopes,
    findAllFrontendScopes,
    findFrontendScopePermissionsGroupedByScopeId,
    findRoleApiScopesGroupedByRoleId,
    findRoleFrontendScopesGroupedByRoleId,
    findRoleFrontendScopePermissionsGroupedByScopeId,
    findRoleApiScopePermissionsGroupedByScopeId
} from '../../modules/roles/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps, FormValues, FormValuesDiff,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import { DataTableDetailComponentProps as DetailComponentProps } from '../../components/Table/DataTableDetail';
import AdminRoleScopeAccessModal, { AdminRoleScopeAccessModalProps } from './containers/AdminRoleScopeAccessModal';
import AdminEffectivePermissionsModal from './containers/AdminEffectivePermissionsModal';

import FrontendScopeSelector from './containers/FrontendScopeSelector';
import FrontendScopeDescriptionDisplay from './containers/FrontendScopeDescriptionDisplay';

import { RoleFrontendScopePermission } from '../../api/Api';

import DeleteRow from '../../components/Table/TableColumnActions/DeleteRow';
import RemoveRow from '../../components/Table/TableColumnActions/RemoveRow';
import ConfigureRoleFrontendScopeButton from '../../components/Table/TableColumnActions/ConfigureRoleFrontendScopeButton';

import { ActionProps } from '../../components/Table/TableColumnCell/Actions';

import { buildPluginPermissions, userCan } from '../permissionUtils';

export interface AdminRolesProps extends FormContainerProps {
    roles?: {}[];
    frontendScopes?: {}[];
    frontendScopePermissions?: {}[];
    frontendScopePermissionsGrouped?: {};
    apiScopes?: {}[];
    roleFrontendScopes?: {}[];
    roleFrontendScopesGrouped?: {};
    roleApiScopes?: {}[];
    roleApiScopesGrouped?: {};
    rolePermissions?: {}[];
    rolePermissionsGrouped?: {};
    roleFrontendScopePermissionsGrouped?: {};
    roleApiScopePermissionsGrouped?: {};
}

export interface AdminRolesDisplayProps extends FormContainerProps {}

class AdminRolesDisplay extends React.PureComponent<AdminRolesDisplayProps, any> {
    render() {
        return (
            <div />
        );
    }
}

class RolesDataTable extends DataTable<Role> {}
class RoleFrontendScopesDataTable extends DataTable<RoleFrontendScope> {}
// class RoleApiScopesDataTable extends DataTable<RoleApiScope> {}

export default class AdminRoles extends FormContainerBase<AdminRolesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_ROLES';
    // END NOTICE
    reduxFormKey = 'roles';
    formFieldNames = {
        roles: 'roles.roles',
        roleFrontendScopesGrouped: 'roles.roleFrontendScopesGrouped',
        // This form is in the modal component, we process its data in this plugin
        roleFrontendScopePermissionsGrouped: 'roles.roleFrontendScopePermissionsGrouped'
    };
    title: string = ' Manage Roles & Access';
    DetailComponent: React.SFC<DetailComponentProps> = ({ parentModelId, parentModel, getPluginPermissions }) => {
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);
        const canManage = userCan(permissions, 'MANAGE');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onButtonClicked = (ev: React.SyntheticEvent<{}>, context?: any, model?: any) => {
            // Executes in DataTable's context
            if (model) context.setActiveRow(model.id);
        };

        // If parentModelId is not supplied, the parent component is in a 'new' state, and its data has not been saved
        // Don't render the detail component
        if (!parentModelId) return null;
        if (!parentModel) return null;

        const roleFrontendScopeActions = [
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <ConfigureRoleFrontendScopeButton
                            frontendScopeId={model.scopeId}
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage || canDelete)}
                            onButtonClicked={(ev: any) => dataTableInstance && dataTableInstance.component && onButtonClicked(ev, dataTableInstance.component, model)}
                        />
                    )
                    : null;
            },
            ({ fields, index, model }) => (
                <DeleteRow
                    fields={fields}
                    index={index}
                    model={model}
                    showComponent={(grantAll || canManage || canDelete)}
                />
            )
        ] as React.ReactType<ActionProps>[];

        return (
            <>
                <Alert bsStyle="info" style={{ marginTop: 0, marginBottom: 0, borderRadius: 0 }}>
                    <p>
                        Select / remove the components that you would like to grant access to.
                        To configure plugin permissions for this role, click the <Glyphicon glyph="wrench" /> button.
                        To deny access remove the plugin from the role.
                    </p>
                </Alert>
                <RoleFrontendScopesDataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={`${this.formFieldNames.roleFrontendScopesGrouped}['${parentModelId}']`}
                    title={''} // Leave this blank
                    buttonLabel={'Grant Application Access'}
                    displayHeaderActions={!(parentModel.systemRoleInd === 1)}
                    displayHeaderSave={false}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: roleFrontendScopeActions,
                        trace: `[${this.name}] DetailComponent -> RoleFrontendScopesDataTable` // Just for debugging
                    })}
                    columns={[
                        DataTable.SelectorFieldColumn('Application Access', { fieldName: 'scopeId', colStyle: { width: '16%' }, selectorComponent: FrontendScopeSelector, displayInfo: true, disabled: true }),
                        // DataTable.MappedTextColumn('Component Code', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: FrontendScopeCodeDisplay, displayInfo: false }),
                        DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '30%' }, selectorComponent: FrontendScopeDescriptionDisplay, displayInfo: false }),
                        DataTable.StaticDateColumn('Last Modified', { fieldName: 'updatedDtm', colStyle: { width: '16%' }, displayInfo: false }),
                        DataTable.StaticTextColumn('Assigned By', { fieldName: 'updatedBy', colStyle: { width: '15%' }, displayInfo: false }),
                        // DataTable.ButtonColumn('Configure Access', 'list', { displayInfo: true }, onButtonClicked)
                    ]}
                    rowComponent={EmptyDetailRow}
                    shouldDisableRow={() => parentModel.systemRoleInd === 1}
                    initialValue={{
                        roleId: parentModelId
                    }}
                    modalProps={{ roleId: parentModelId }}
                    modalComponent={AdminRoleScopeAccessModal}
                />
            </>
        );
    }

    FormComponent = (props: FormContainerProps<AdminRolesProps>) => {
        const { getPluginPermissions } = props;
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        const canManage = userCan(permissions, 'MANAGE');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onButtonClicked = (ev: React.SyntheticEvent<any>, context?: any, model?: any) => {
            // Executes in DataTable's context
            if (model) context.setActiveRow(model.id);
        };

        // TODO: We need to find a way to make sorting on multiple columns work, which probably involves figuring how to grab all the field values at once...
        const onFilterRoleName = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    roles: {
                        roleName: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterRoleCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    roles: {
                        roleCode: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterCreatedBy = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    roles: {
                        createdBy: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterCreatedDate = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    roles: {
                        createdDate: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    roles: {}
                }, setAdminRolesPluginFilters);
            }
        };

        const roleActions = [
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <Button
                            bsStyle="default"
                            onClick={(ev) => dataTableInstance && dataTableInstance.component && onButtonClicked(ev, dataTableInstance.component, model)}>
                            <Glyphicon glyph="lock" />
                        </Button>
                    )
                    : null;
            },
            ({ fields, index, model }) => {
            return (model && !model.id || model && model.id === '')
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <div>
                <RolesDataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={this.formFieldNames.roles}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.roles}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Role'}
                    displayHeaderActions={true}
                    displayHeaderSave={false}
                    onResetClicked={onResetFilters}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: roleActions,
                        trace: `[${this.name}] FormComponent -> RolesDataTable` // Just for debugging
                    })}
                    columns={[
                        DataTable.TextFieldColumn('Role Name', { fieldName: 'roleName', colStyle: { width: '15%' }, displayInfo: true, filterable: true, filterColumn: onFilterRoleName }),
                        DataTable.TextFieldColumn('Role Code', { fieldName: 'roleCode', colStyle: { width: '10%' }, displayInfo: true, filterable: true, filterColumn: onFilterRoleCode }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '20%' }, displayInfo: true }),
                        DataTable.StaticDateColumn('Last Modified', { fieldName: 'updatedDtm', colStyle: { width: '15%' }, displayInfo: false, filterable: true, filterColumn: onFilterCreatedDate }),
                        DataTable.StaticTextColumn('Assigned By', { fieldName: 'updatedBy', colStyle: { width: '15%' }, displayInfo: false, filterable: true, filterColumn: onFilterCreatedBy })
                    ]}
                    filterable={true}

                    expandable={true}
                    // expandedRows={[1, 2]}
                    rowComponent={this.renderDetail()}
                    // rowComponent={EmptyDetailRow}
                    // Don't render or show system roles unless user is a Super Administrator
                    shouldRenderRow={(model) => model.systemRoleInd !== 1}
                    shouldDisableRow={(model) => {
                        // TODO: Only disable if the user doesn't have permission to edit provincial codes
                        return (!model) ? false : (model && model.id) ? model.systemRoleInd === 1 : false;
                    }}
                    modalComponent={AdminEffectivePermissionsModal}
                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminRolesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getRoles()); // This data needs to always be available for select lists
        dispatch(getFrontendScopes()); // This data needs to always be available for select lists
        dispatch(getFrontendScopePermissions()); // This data needs to always be available for select lists
        dispatch(getApiScopes()); // This data needs to always be available for select lists
        // TODO: Only load these if we're expanding the grid...
        dispatch(getRoleFrontendScopes());
        dispatch(getRoleApiScopes());
        dispatch(getRolePermissions());
    }

    // TODO: Type filters as <T> in FormContainer interface?
    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const roles = (filters && filters.roles)
            ? findAllRoles(filters.roles)(state)
            : getAllRoles(state);

        const frontendScopes = (filters && filters.frontendScopes)
            ? findAllFrontendScopes(filters.frontendScopes)(state)
            : getAllFrontendScopes(state);

        const frontendScopePermissionsGrouped = (filters && filters.frontendScopePermissions)
            ? findFrontendScopePermissionsGroupedByScopeId(filters.frontendScopePermissions)(state)
            : getFrontendScopePermissionsGroupedByScopeId(state);

        const apiScopes = (filters && filters.apiScopes)
            ? findAllApiScopes(filters.apiScopes)(state)
            : getAllApiScopes(state);

        const roleFrontendScopesGrouped = (filters && filters.roleFrontendScopes)
            ? findRoleFrontendScopesGroupedByRoleId(filters.roleFrontendScopes)(state)
            : getRoleFrontendScopesGroupedByRoleId(state);

        const roleApiScopesGrouped = (filters && filters.roleApiScopes)
            ? findRoleApiScopesGroupedByRoleId(filters.roleApiScopes)(state)
            : getRoleApiScopesGroupedByRoleId(state);

        const roleFrontendScopePermissionsGrouped = (filters && filters.roleFrontendScopePermissions)
            ? findRoleFrontendScopePermissionsGroupedByScopeId(filters.roleFrontendScopePermissions)(state)
            : getRoleFrontendScopePermissionsGroupedByScopeId(state);

        const roleApiScopePermissionsGrouped = (filters && filters.roleApiScopePermissions)
            ? findRoleApiScopePermissionsGroupedByScopeId(filters.roleApiScopePermissions)(state)
            : getRoleApiScopePermissionsGroupedByScopeId(state);

        return {
            ...filterData,
            roles,
            apiScopes,
            frontendScopes,
            frontendScopePermissionsGrouped,
            roleFrontendScopesGrouped,
            roleFrontendScopePermissionsGrouped,
            roleApiScopesGrouped,
            roleApiScopePermissionsGrouped
        };
    }

    /* mapDeletesFromFormValues(map: any) {
        const deletedRoleIds: IdType[] = [];
        const deletedRoleFrontendScopeIds: IdType[] = [];
        const deletedRoleApiScopeIds: IdType[] = [];
        const deletedRolePermissionIds: IdType[] = [];

        return {
            roles: deletedRoleIds,
            roleFrontendScopes: deletedRoleFrontendScopeIds,
            roleApiScopes: deletedRoleApiScopeIds,
            deletedRolePermissionIds: deletedRolePermissionIds
        };
    } */

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: FormValuesDiff = this.getDataFromFormValues(
            formValues,
            initialValues,
            [
                'roleFrontendScopesGrouped',
                'roleFrontendScopePermissionsGrouped'
            ]
        ) as FormValuesDiff;

        const deletedRoles: IdType[] = data.roles.deletedIds as IdType[];
        const deletedRoleFrontendScopes: IdType[] = data.roleFrontendScopesGrouped.deletedIds as IdType[];
        // const deletedRoleApiScopes: IdType[] = data.roleFrontendScopesGrouped.deletedIds as IdType[];
        // Important! We don't handle permissions the same way as the other deletes!
        const deletedRolePermissions: IdType[] = [] as IdType[];

        const rolesData = [
            ...data.roles.added,
            ...data.roles.updated
        ];

        const roles: Partial<Role>[] = (rolesData)
            ? rolesData.map((r: Role) => ({
                ...r,
                systemCodeInd: 0, // TODO: Ability to set this - we haven't implemented system codes yet but it will be needed
                // TODO: Need a way to set this stuff... createdBy, updated by fields should really be set in the backend using the current user
                // We're just going to set the fields here temporarily to quickly check if things are working in the meantime...
                createdBy: 'DEV - FRONTEND',
                updatedBy: 'DEV - FRONTEND',
                createdDtm: new Date().toISOString(),
                updatedDtm: new Date().toISOString(),
                revisionCount: 0 // TODO: Is there entity versioning anywhere in this project???
            }))
            : [];

        const roleFrontendScopesData = {
            ...data.roleFrontendScopesGrouped.added,
            ...data.roleFrontendScopesGrouped.updated
        };

        const roleFrontendScopes: Partial<RoleFrontendScope>[] = (roleFrontendScopesData)
            ? Object.keys(roleFrontendScopesData)
                .reduce((acc, cur, idx) => {
                    return acc
                        .concat(
                            roleFrontendScopesData[cur]
                                .map((rs: RoleFrontendScope) => {
                                    rs.roleId = cur; // Set role ids on all rows
                                    return rs;
                                })
                        );
                }, [])
                .map((rs: RoleFrontendScope) => ({
                    ...rs,
                    createdBy: 'DEV - FRONTEND',
                    updatedBy: 'DEV - FRONTEND',
                    createdDtm: new Date().toISOString(),
                    updatedDtm: new Date().toISOString(),
                    revisionCount: 0
                }))
            : [];

        const roleFrontendScopePermissionsData = {
            ...data.roleFrontendScopePermissionsGrouped.added,
            ...data.roleFrontendScopePermissionsGrouped.updated
        };

        let roleFrontendScopePermissions: Partial<RolePermission>[] = [];

        if (roleFrontendScopePermissionsData) {
            const roleFrontendScopeKeys = Object.keys(roleFrontendScopePermissionsData);

            const roleFrontendScopePermissionsGrouped = roleFrontendScopeKeys
                .reduce((acc, cur, idx: number) => {
                    const roleScopes = roleFrontendScopePermissionsData[cur];
                    return Object.assign({}, acc, roleScopes);
                }, {});

            roleFrontendScopePermissions = Object.keys(roleFrontendScopePermissionsGrouped)
                .reduce((acc: {}[], cur, idx: number) => {
                    return acc.concat(roleFrontendScopePermissionsGrouped[cur]);
                }, [])
                .map((rsp: RoleFrontendScopePermission) => {
                    if (rsp.hasPermission !== true) {
                        if (rsp.id) deletedRolePermissions.push(rsp.id as string);
                        return undefined;
                    } else {
                        return {
                            id: rsp.id ? rsp.id : undefined,
                            roleId: rsp.roleId,
                            frontendScopePermissionId: rsp.frontendScopePermissionId,
                            roleFrontendScopeId: rsp.roleFrontendScopeId,
                            roleFrontendScopePermissionId: rsp.frontendScopePermissionId,
                            // TODO: Make sure not to  add displayName or description!
                            //  We will be removing those from RolePermission!
                            displayName: rsp.displayName,
                            description: rsp.description,
                            createdBy: 'DEV - FRONTEND',
                            updatedBy: 'DEV - FRONTEND',
                            createdDtm: new Date().toISOString(),
                            updatedDtm: new Date().toISOString(),
                            // TODO: Might have to use one of the nested properties
                            //  Make syre this is the correct entity version (there are currently no versions)
                            revisionCount: rsp.revisionCount ? rsp.revisionCount : 0
                        } as RolePermission;
                    }
                })
                .filter(rp => rp) as Partial<RolePermission>[];
        }

        /* const roleApiScopesData = {
            ...data.roleApiScopesGrouped.added,
            ...data.roleApiScopesGrouped.updated
        };

        const roleApiScopes: Partial<RoleApiScope>[] = (roleApiScopesData)
            ? Object.keys(roleApiScopesData)
                .reduce((acc, cur, idx) => {
                    return acc
                        .concat(
                            roleApiScopesData[cur]
                                .map((rs: RoleApiScope) => {
                                    rs.roleId = cur; // Set role ids on all rows, we need it set on new rows
                                    return rs;
                                })
                        );
                }, [])
                .map((rs: RoleApiScope) => ({
                    ...rs,
                    createdBy: 'DEV - FRONTEND',
                    updatedBy: 'DEV - FRONTEND',
                    createdDtm: new Date().toISOString(),
                    updatedDtm: new Date().toISOString(),
                    revisionCount: 0
                }))
            : []; */

        if (deletedRolePermissions.length > 0) {
            console.log('deleting role permissions');
            console.log(deletedRolePermissions);
            await dispatch(deleteRolePermissions(deletedRolePermissions));
        }
        if (deletedRoleFrontendScopes.length > 0) {
            console.log('deleting role frontend scopes');
            console.log(deletedRoleFrontendScopes);
            await dispatch(deleteRoleFrontendScopes(deletedRoleFrontendScopes));
        }
        /* if (deletedRoleApiScopes.length > 0) {
            console.log('deleting role api scopes');
            console.log(deletedRoleApiScopes);
            await dispatch(deleteRoleApiScopes(deletedRoleApiScopes));
        } */
        if (deletedRoles.length > 0) {
            console.log('deleting roles');
            console.log(deletedRoles);
            await dispatch(deleteRoles(deletedRoles));
        }
        if (roles.length > 0) {
            console.log('updating roles');
            console.log(roles);
            await dispatch(createOrUpdateRoles(roles));
        }
        if (roleFrontendScopes.length > 0) {
            console.log('updating role frontend scopes');
            console.log(roleFrontendScopes);
            await dispatch(createOrUpdateRoleFrontendScopes(roleFrontendScopes));
        }
        if (roleFrontendScopePermissions.length > 0) {
            console.log('updating role frontend scope permissions');
            console.log(roleFrontendScopePermissions);
            await dispatch(createOrUpdateRolePermissions(roleFrontendScopePermissions));
        }
        /* if (roleApiScopes.length > 0) {
            console.log('updating role api scopes');
            console.log(roles);
            await dispatch(createOrUpdateRoleApiScopes(roleApiScopes));
        } */
    }
}
