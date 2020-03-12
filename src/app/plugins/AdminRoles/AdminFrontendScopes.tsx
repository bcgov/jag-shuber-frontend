import React from 'react';
import {
    Button, Glyphicon,
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    FrontendScope,
    FrontendScopePermission, RoleApiScope, RoleFrontendScope, RolePermission
} from '../../api';

import {
    getRoles,
    getApiScopes,
    getRoleFrontendScopes,
    getRoleApiScopes,
    getRolePermissions,
    getFrontendScopes,
    getFrontendScopeApis,
    getFrontendScopePermissions,
    createOrUpdateRoles,
    createOrUpdateRoleFrontendScopes,
    createOrUpdateRolePermissions,
    createOrUpdateRoleApiScopes,
    createOrUpdateFrontendScopes,
    createOrUpdateFrontendScopeApis,
    createOrUpdateFrontendScopePermissions,
    deleteFrontendScopes,
    deleteFrontendScopeApis,
    deleteFrontendScopePermissions,
    deleteRolePermissions,
    deleteRoleFrontendScopes,
    deleteRoleApiScopes,
    deleteRoles,
    setAdminRolesPluginFilters
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllFrontendScopePermissions,
    getAllFrontendScopes,
    getAllFrontendScopeApis,
    getFrontendScopeApisGroupedByScopeId,
    getFrontendScopePermissionsGroupedByScopeId,
    findAllFrontendScopes,
    findAllFrontendScopeApis,
    findFrontendScopeApisGroupedByScopeId,
    findAllRoles,
    getAllRoles,
    findFrontendScopePermissionsGroupedByScopeId,
    findAllApiScopes,
    getAllApiScopes,
    findRoleFrontendScopesGroupedByRoleId,
    getRoleFrontendScopesGroupedByRoleId,
    findRoleApiScopesGroupedByRoleId,
    getRoleApiScopesGroupedByRoleId,
    findRoleFrontendScopePermissionsGroupedByScopeId,
    getRoleFrontendScopePermissionsGroupedByScopeId,
    findRoleApiScopePermissionsGroupedByScopeId,
    getRoleApiScopePermissionsGroupedByScopeId
} from '../../modules/roles/selectors';

import { IdType, Role } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';

import FrontendScopeSelector from './containers/FrontendScopeSelector';
import AdminScopePermissionsModal from './components/AdminScopePermissionsModal';
import { createOrUpdateFrontendScopePermissionsRequest } from '../../modules/roles/requests/frontendScopePermissions';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import RoleSelector from './containers/RoleSelector';
import ApiScopeSelector from './containers/ApiScopeSelector';
import ApiScopeCodeDisplay from './containers/ApiScopeCodeDisplay';
import ApiScopeDescriptionDisplay from './containers/ApiScopeDescriptionDisplay';
import AdminRoleScopeAccessModal from './components/AdminRoleScopeAccessModal';
import FrontendScopeCodeDisplay from './containers/FrontendScopeCodeDisplay';
import FrontendScopeDescriptionDisplay from './containers/FrontendScopeDescriptionDisplay';
import { RoleFrontendScopePermission } from '../../api/Api';
import { buildPluginPermissions } from '../permissionUtils';
import { ActionProps } from '../../components/TableColumnCell/Actions';

// THESE ROLES ARE REQUIRED BY THE SYSTEM FOR BASIC API ACCESS, THEY APPLY TO ALL USERS
// TODO: Make this configurable in OpenShift!
const SYSTEM_ROLE_ID = '7ec8ff51-7459-49fb-980d-4831fad663a1'; // LOCAL
// const SYSTEM_ROLE_ID = '19d900f6-a0ed-40a4-9685-8fe0b185123e'; // TEST

export interface AdminFrontendScopesProps extends FormContainerProps {
    roles?: {}[];
    frontendScopes?: {}[];
    frontendScopeApis?: {}[];
    frontendScopeApisGrouped?: {};
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

export interface AdminFrontendScopesDisplayProps extends FormContainerProps {}

class AdminFrontendScopesDisplay extends React.PureComponent<AdminFrontendScopesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;

        // TODO: Rip out dummy data
        const testData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        return (
            <div>
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Role Name</th>
                            <th className="text-left">Role Code</th>
                            <th className="text-left">Description</th>
                            <th className="text-left">Date Created</th>
                            <th className="text-left">Status</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {testData.map(r => {
                            return (
                                <tr key={r.id}>
                                    <td>Test Role</td>
                                    <td>TEST_ROLE</td>
                                    <td>Ipsum Lorem Dolor</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>
                                        Active
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}

class FrontendScopeApisDataTable extends DataTable<RoleApiScope> {}

export default class AdminFrontendScopes extends FormContainerBase<AdminFrontendScopesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_PLUGIN_FRONTEND_SCOPES';
    // END NOTICE
    reduxFormKey = 'roles';
    formFieldNames = {
        frontendScopes: 'roles.frontendScopes',
        frontendScopeApisGrouped: 'roles.frontendScopeApisGrouped',
        frontendScopePermissionsGrouped: 'roles.frontendScopePermissionsGrouped',
        roles: 'roles.roles',
        apiScopes: 'roles.apiScopes',
        roleApiScopesGrouped: 'roles.roleApiScopesGrouped',
        roleFrontendScopesGrouped: 'roles.roleFrontendScopesGrouped',
        rolePermissionsGrouped: 'roles.rolePermissions',
        roleApiPermissionsGrouped: 'roles.roleApiPermissionsGrouped',
        roleFrontendPermissionsGrouped: 'roles.roleFrontendPermissionsGro`uped',
        roleApiScopePermissionsGrouped: 'roles.roleApiScopePermissionsGrouped',
        roleFrontendScopePermissionsGrouped: 'roles.roleFrontendScopePermissionsGrouped'
    };
    title: string = 'Register Components';

    DetailComponent: React.SFC<DetailComponentProps> = ({ parentModelId, getPluginPermissions }) => {
        const { grantAll, permissions } = buildPluginPermissions(getPluginPermissions);

        // TODO: Add this to a README!
        // Effective Permissions for any user are at a minimum the SYSTEM_ROLES required for basic application usage
        // The application will not function without these roles as it will not be able to read any data
        // parentModelId = parentModelId ? parentModelId : SYSTEM_ROLE_ID;
        // parentModelId = SYSTEM_ROLE_ID;

        // If parentModelId is not supplied, the parent component is in a 'new' state, and its data has not been saved
        // Don't render the detail component
        if (!parentModelId) return null;

        const frontendScopeApiActions = [
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={grantAll} />)
                    : null;
            },
            ({ fields, index, model }) => {
            return (model && !model.id || model && model.id === '')
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={grantAll} />)
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <FrontendScopeApisDataTable
                fieldName={`${this.formFieldNames.frontendScopeApisGrouped}['${parentModelId}']`}
                title={''} // Leave this blank
                buttonLabel={'Add Authorization Scope'}
                displayHeaderActions={true}
                displayHeaderSave={false}
                actionsColumn={DataTable.ActionsColumn({
                    actions: frontendScopeApiActions
                })}
                columns={[
                    DataTable.SelectorFieldColumn('Api Scope', { fieldName: 'apiScopeId', colStyle: { width: '300px' }, selectorComponent: ApiScopeSelector, displayInfo: true }),
                    DataTable.MappedTextColumn('Scope Code', { fieldName: 'apiScope.scopeCode', colStyle: { width: '300px' }, selectorComponent: ApiScopeCodeDisplay, displayInfo: false }),
                    DataTable.StaticTextColumn('Assigned By', { fieldName: 'createdBy', colStyle: { width: '200px' }, displayInfo: false }),
                    DataTable.StaticDateColumn('Date Assigned', { fieldName: 'createdDtm', colStyle: { width: '350px' }, displayInfo: false }),
                    // DataTable.ButtonColumn('Configure Access', 'eye-open', { displayInfo: true }, onButtonClicked),
                ]}
                rowComponent={EmptyDetailRow}
                initialValue={{
                    roleId: parentModelId
                }}
                modalProps={{ roleId: parentModelId }}
                modalComponent={AdminRoleScopeAccessModal}
            />
        );
    }

    FormComponent = (props: FormContainerProps<AdminFrontendScopesProps>) => {
        const { getPluginPermissions } = props;
        const { grantAll, permissions } = buildPluginPermissions(getPluginPermissions);

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onButtonClicked = (ev: React.SyntheticEvent<{}>, context?: any, model?: any) => {
            // Executes in DataTable's context
            if (model) context.setActiveRow(model.id);
        };

        const onFilterName = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    frontendScopes: {
                        scopeName: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    frontendScopes: {
                        scopeCode: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    frontendScopes: {}
                }, setAdminRolesPluginFilters);
            }
        };

        const frontendScopeActions = [
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <Button bsStyle="primary" onClick={(ev) => onButtonClicked(ev, dataTableInstance, model)}>
                            <Glyphicon glyph="lock" />
                        </Button>
                    )
                    : null;
            },
            ({ fields, index, model }) => <DeleteRow fields={fields} index={index} model={model} showComponent={grantAll} />,
            // ({ fields, index, model }) => { return (model && model.id) ? (<ExpireRow fields={fields} index={index} model={model} />) : null; }
        ] as React.ReactType<ActionProps>[];

        return (
            <div>
                <DataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={this.formFieldNames.frontendScopes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.frontendScopes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Component'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: frontendScopeActions
                    })}
                    columns={[
                        DataTable.TextFieldColumn('Component', { fieldName: 'scopeName', displayInfo: true, filterable: true, filterColumn: onFilterName }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'scopeCode', displayInfo: true, filterable: true, filterColumn: onFilterCode }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: false }),
                        // DataTable.ButtonColumn('Define Permissions', 'list', { displayInfo: true }, onButtonClicked)
                    ]}
                    filterable={true}
                    expandable={true}
                    // expandedRows={[1, 2]}
                    rowComponent={this.renderDetail()}
                    modalComponent={AdminScopePermissionsModal}
                />
            </div>
        );
    }

    // TODO: Alternate display if no records round?
    DisplayComponent = (props: FormContainerProps<AdminFrontendScopesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminFrontendScopesDisplay {...props} />
        </div>
    )

    validate(values: AdminFrontendScopesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getRoles()); // This data needs to always be available for select lists
        dispatch(getFrontendScopes()); // This data needs to always be available for select lists
        dispatch(getFrontendScopeApis()); // This data needs to always be available for select lists
        dispatch(getFrontendScopePermissions()); // This data needs to always be available for select lists
        dispatch(getApiScopes()); // This data needs to always be available for select lists
        // TODO: Only load these if we're expanding the grid...
        dispatch(getRoleFrontendScopes());
        dispatch(getRoleApiScopes());
        dispatch(getRolePermissions());
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);
        // console.log(filterData);

        // Get form data
        const roles = (filters && filters.roles)
            ? findAllRoles(filters.roles)(state)
            : getAllRoles(state);

        const frontendScopes = (filters && filters.frontendScopes)
            ? findAllFrontendScopes(filters.frontendScopes)(state)
            : getAllFrontendScopes(state);

        const frontendScopeApisGrouped = (filters && filters.frontendScopeApis)
            ? findFrontendScopeApisGroupedByScopeId(filters.frontendScopeApis)(state)
            : getFrontendScopeApisGroupedByScopeId(state);

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
            frontendScopeApisGrouped,
            frontendScopePermissionsGrouped,
            roleFrontendScopesGrouped,
            roleFrontendScopePermissionsGrouped,
            roleApiScopesGrouped,
            roleApiScopePermissionsGrouped
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedRoleIds: IdType[] = [];
        const deletedRoleFrontendScopeIds: IdType[] = [];
        const deletedRoleApiScopeIds: IdType[] = [];
        const deletedRolePermissionIds: IdType[] = [];
        const deletedScopeIds: IdType[] = [];
        const deletedScopePermissionIds: IdType[] = [];

        // TODO: This isn't going to work...
        if (map.frontendScopes) {
            const initialValues = map.frontendScopes.initialValues;
            const existingIds = map.frontendScopes.values.map((val: any) => val.id);

            const removeFrontendScopeIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedScopeIds.push(...removeFrontendScopeIds);
        }

        if (map.frontendScopePermissionsGrouped) {
            const initialValues = map.frontendScopePermissionsGrouped.initialValues;

            const removeScopePermissionIds = Object.keys(initialValues).reduce((acc: any, cur: any) => {
                const initValues = map.frontendScopePermissionsGrouped.initialValues[cur];
                const existingIds = map.frontendScopePermissionsGrouped.values[cur].map((val: any) => val.id);

                const removeIds = initValues
                    .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                    .map((val: any) => val.id);

                return acc.concat(removeIds);
            }, []);

            deletedScopePermissionIds.push(...removeScopePermissionIds);
        }

        if (map.roles) {
            const initialValues = map.roles.initialValues;
            const existingIds = map.roles.values.map((val: any) => val.id);

            const removeRoleIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedRoleIds.push(...removeRoleIds);
        }

        if (map.roleFrontendScopesGrouped) {
            const initialValues = map.roleFrontendScopesGrouped.initialValues;

            const removeRoleFrontendScopeIds = Object.keys(initialValues).reduce((acc: any, cur: any) => {
                const initValues = map.roleFrontendScopesGrouped.initialValues[cur];
                const existingIds = map.roleFrontendScopesGrouped.values[cur].map((val: any) => val.id);

                const removeIds = initValues
                    .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                    .map((val: any) => val.id);

                return acc.concat(removeIds);
            }, []);

            deletedRoleFrontendScopeIds.push(...removeRoleFrontendScopeIds);
        }

        if (map.roleApiScopesGrouped) {
            const initialValues = map.roleApiScopesGrouped.initialValues;

            const removeRoleApiScopeIds = Object.keys(initialValues).reduce((acc: any, cur: any) => {
                const initValues = map.roleApiScopesGrouped.initialValues[cur];
                const existingIds = map.roleApiScopesGrouped.values[cur].map((val: any) => val.id);

                const removeIds = initValues
                    .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                    .map((val: any) => val.id);

                return acc.concat(removeIds);
            }, []);

            deletedRoleApiScopeIds.push(...removeRoleApiScopeIds);
        }

        return {
            frontendScopes: deletedScopeIds,
            frontendScopePermissions: deletedScopePermissionIds,
            roles: deletedRoleIds,
            roleFrontendScopes: deletedRoleFrontendScopeIds,
            roleApiScopes: deletedRoleApiScopeIds,
            deletedRolePermissionIds: deletedRolePermissionIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedScopes: IdType[] = dataToDelete.frontendScopes as IdType[];
        const deletedScopePermissions: IdType[] = dataToDelete.frontendScopePermissions as IdType[];

        const scopes: Partial<FrontendScope>[] = data.frontendScopes.map((s: FrontendScope) => ({
            ...s,
            // TODO: In some places there's a systemCodeInd which is a number... maybe a good idea to use the same type?
            systemScopeInd: false, // TODO: Ability to set this - we haven't implemented system codes yet but it will be needed
            // TODO: Need a way to set this stuff... createdBy, updated by fields should really be set in the backend using the current user
            // We're just going to set the fields here temporarily to quickly check if things are working in the meantime...
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString(),
            revisionCount: 0 // TODO: Is there entity versioning anywhere in this project???
        }));

        const scopePermissions: Partial<FrontendScopePermission>[] = (data.frontendScopePermissionsGrouped)
            ? Object.keys(data.frontendScopePermissionsGrouped)
                .reduce((acc, cur, idx) => {
                    const currentScopePermissions = data.frontendScopePermissionsGrouped[cur]
                        // We need to set frontendScopeIds, or new rows will not save
                        .map((permission: FrontendScopePermission) => {
                            permission.frontendScopeId = cur;
                            return permission;
                        });
                    return acc.concat(currentScopePermissions);
                }, [])
                .map((sp: FrontendScopePermission) => ({
                    ...sp,
                    createdBy: 'DEV - FRONTEND',
                    updatedBy: 'DEV - FRONTEND',
                    createdDtm: new Date().toISOString(),
                    updatedDtm: new Date().toISOString(),
                    revisionCount: 0
                }))
            : [];

        // Delete records before saving new ones!
        const deletedRoles: IdType[] = dataToDelete.roles as IdType[];
        const deletedRoleFrontendScopes: IdType[] = dataToDelete.roleFrontendScopes as IdType[];
        const deletedRoleApiScopes: IdType[] = dataToDelete.roleApiScopes as IdType[];
        // Important! We don't handle permissions the same way as the other deletes!
        const deletedRolePermissions: IdType[] = [] as IdType[];

        const roles: Partial<Role>[] = (data.roles) ? data.roles.map((r: Role) => ({
            ...r,
            systemCodeInd: 0, // TODO: Ability to set this - we haven't implemented system codes yet but it will be needed
            // TODO: Need a way to set this stuff... createdBy, updated by fields should really be set in the backend using the current user
            // We're just going to set the fields here temporarily to quickly check if things are working in the meantime...
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString(),
            revisionCount: 0 // TODO: Is there entity versioning anywhere in this project???
        })) : [];

        const roleFrontendScopes: Partial<RoleFrontendScope>[] = (data.roleFrontendScopesGrouped)
            ? Object.keys(data.roleFrontendScopesGrouped)
                .reduce((acc, cur, idx) => {
                    return acc
                        .concat(
                            data.roleFrontendScopesGrouped[cur]
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

        let roleFrontendScopePermissions: Partial<RolePermission>[] = [];

        if (data.roleFrontendScopePermissionsGrouped) {
            const roleFrontendScopeKeys = Object.keys(data.roleFrontendScopePermissionsGrouped);

            const roleFrontendScopePermissionsGrouped = roleFrontendScopeKeys
                .reduce((acc, cur, idx: number) => {
                    const roleScopes = data.roleFrontendScopePermissionsGrouped[cur];
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

        const roleApiScopes: Partial<RoleApiScope>[] = (data.roleApiScopesGrouped)
            ? Object.keys(data.roleApiScopesGrouped)
                .reduce((acc, cur, idx) => {
                    return acc
                        .concat(
                            data.roleApiScopesGrouped[cur]
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
            : [];

        if (deletedScopePermissions.length > 0) await dispatch(deleteFrontendScopePermissions(deletedScopePermissions));
        if (deletedScopes.length > 0) await dispatch(deleteFrontendScopes(deletedScopes));
        if (scopes.length > 0) await dispatch(createOrUpdateFrontendScopes(scopes));
        if (scopePermissions.length > 0) await dispatch(createOrUpdateFrontendScopePermissions(scopePermissions));

        // These have to be deleted in sequence
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
        if (deletedRoleApiScopes.length > 0) {
            console.log('deleting role api scopes');
            console.log(deletedRoleApiScopes);
            await dispatch(deleteRoleApiScopes(deletedRoleApiScopes));
        }
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
        if (roleApiScopes.length > 0) {
            console.log('updating role api scopes');
            console.log(roles);
            await dispatch(createOrUpdateRoleApiScopes(roleApiScopes));
        }
    }
}
