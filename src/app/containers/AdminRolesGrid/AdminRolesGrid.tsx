import React from 'react';
import {
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
    deleteRolePermissions
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
    getRoleApiScopePermissionsGroupedByScopeId
} from '../../modules/roles/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import AdminRoleScopeAccessModal from '../../containers/AdminRolesGrid/AdminRoleScopeAccessModal';

// import RoleSelector from './RoleSelector';
// import FrontendScopeDisplay from './FrontendScopeDisplay';
import FrontendScopeCodeDisplay from './FrontendScopeCodeDisplay';
import FrontendScopeDescriptionDisplay from './FrontendScopeDescriptionDisplay';
// import ApiScopeDisplay from './ApiScopeDisplay';
import ApiScopeCodeDisplay from './ApiScopeCodeDisplay';
import ApiScopeDescriptionDisplay from './ApiScopeDescriptionDisplay';
import FrontendScopeSelector from './FrontendScopeSelector';
import ApiScopeSelector from './ApiScopeSelector';
import { RoleFrontendScopePermission } from '../../api/Api';

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

export interface AdminRolesDisplayProps extends FormContainerProps {

}

class AdminRolesDisplay extends React.PureComponent<AdminRolesDisplayProps, {}> {
    render() {
        const { data = [] } = this.props;

        // TODO: Rip out dummy data
        const testData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        return (
            <div>
                {/*<h3>Roles</h3>*/}
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

class RolesDataTable extends DataTable<Role> {}
class RoleFrontendScopesDataTable extends DataTable<RoleFrontendScope> {}
class RoleApiScopesDataTable extends DataTable<RoleApiScope> {}

export default class AdminRolesGrid extends FormContainerBase<AdminRolesProps> {
    name = 'admin-roles-grid';
    reduxFormKey = 'roles';
    formFieldNames = {
        roles: 'roles.roles',
        apiScopes: 'roles.apiScopes',
        frontendScopes: 'roles.frontendScopes',
        roleApiScopes: 'roles.roleApiScopes',
        roleApiScopesGrouped: 'roles.roleApiScopesGrouped',
        roleFrontendScopes: 'roles.roleFrontendScopes',
        roleFrontendScopesGrouped: 'roles.roleFrontendScopesGrouped',
        rolePermissions: 'roles.rolePermissions',
        rolePermissionsGrouped: 'roles.rolePermissions',
        roleApiPermissionsGrouped: 'roles.roleApiPermissionsGrouped',
        roleFrontendPermissionsGrouped: 'roles.roleFrontendPermissionsGrouped',
        roleApiScopePermissionsGrouped: 'roles.roleApiScopePermissionsGrouped',
        roleFrontendScopePermissionsGrouped: 'roles.roleFrontendScopePermissionsGrouped'
    };
    title: string = ' Manage Roles & Access';
    DetailComponent: React.SFC<DetailComponentProps> = ({ parentModelId }) => {
        const onButtonClicked = (ev: React.SyntheticEvent<{}>, context: any, model: any) => {
            // TODO: Check on this!
            // Executes in DataTable's context
            context.setActiveRow(model.id);
        };

        // If parentModelId is not supplied, the parent component is in a 'new' state, and its data has not been saved
        // Don't render the detail component
        if (!parentModelId) return null;

        return (
            <>
                <RoleFrontendScopesDataTable
                    fieldName={`${this.formFieldNames.roleFrontendScopesGrouped}['${parentModelId}']`}
                    title={''} // Leave this blank
                    buttonLabel={'Add Component to Role'}
                    displayHeaderActions={true}
                    displayHeaderSave={false}
                    columns={[
                        DataTable.SelectorFieldColumn('Component to Access', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: FrontendScopeSelector, displayInfo: true, disabled: true }),
                        DataTable.MappedTextColumn('Code', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: FrontendScopeCodeDisplay, displayInfo: false }),
                        DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: FrontendScopeDescriptionDisplay, displayInfo: false }),
                        DataTable.StaticTextColumn('Assigned By', { fieldName: 'createdBy', colStyle: { width: '200px' }, displayInfo: false }),
                        DataTable.StaticDateColumn('Date Assigned', { fieldName: 'createdDtm', colStyle: { width: '200px' }, displayInfo: false }),
                        DataTable.ButtonColumn('Configure Access', 'list', { displayInfo: true }, onButtonClicked)
                    ]}
                    rowComponent={EmptyDetailRow}
                    initialValue={{
                        roleId: parentModelId
                    }}
                    modalProps={{ roleId: parentModelId }}
                    modalComponent={AdminRoleScopeAccessModal}
                />
                <RoleApiScopesDataTable
                    fieldName={`${this.formFieldNames.roleApiScopesGrouped}['${parentModelId}']`}
                    title={''} // Leave this blank
                    buttonLabel={'Add API Access to Role'}
                    displayHeaderActions={true}
                    displayHeaderSave={false}
                    columns={[
                        DataTable.SelectorFieldColumn('API Route to Access', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: ApiScopeSelector, displayInfo: true }),
                        DataTable.MappedTextColumn('Code', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: ApiScopeCodeDisplay, displayInfo: false }),
                        DataTable.MappedTextColumn('Description', { fieldName: 'scopeId', colStyle: { width: '300px' }, selectorComponent: ApiScopeDescriptionDisplay, displayInfo: false }),
                        DataTable.StaticTextColumn('Assigned By', { fieldName: 'createdBy', colStyle: { width: '200px' }, displayInfo: false }),
                        DataTable.StaticDateColumn('Date Assigned', { fieldName: 'createdDtm', colStyle: { width: '200px' }, displayInfo: false }),
                        DataTable.ButtonColumn('Configure Access', 'eye-open', { displayInfo: true }, onButtonClicked),
                    ]}
                    rowComponent={EmptyDetailRow}
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
        return (
            <div>
                <RolesDataTable
                    fieldName={this.formFieldNames.roles}
                    title={''} // Leave this blank
                    buttonLabel={'Add Role'}
                    displayHeaderActions={true}
                    columns={[
                        DataTable.TextFieldColumn('Role Name', { fieldName: 'roleName', colStyle: { width: '300px' }, displayInfo: true, filterable: true }),
                        DataTable.TextFieldColumn('Role Code', { fieldName: 'roleCode', colStyle: { width: '300px' }, displayInfo: true, filterable: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: true }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        DataTable.StaticTextColumn('Created By', { fieldName: 'createdBy', colStyle: { width: '200px' }, displayInfo: false, filterable: true }),
                        DataTable.StaticDateColumn('Date Created', { fieldName: 'createdDtm', colStyle: { width: '200px' }, displayInfo: false, filterable: true }),
                        DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),

                    ]}
                    filterable={true}
                    expandable={true}
                    // expandedRows={[1, 2]}
                    rowComponent={this.DetailComponent}
                    modalComponent={EmptyDetailRow}
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

    // TODO: Remove roleId from abstract class?
    fetchData(roleId: IdType, dispatch: Dispatch<{}>) {
        dispatch(getRoles()); // This data needs to always be available for select lists
        dispatch(getFrontendScopes()); // This data needs to always be available for select lists
        dispatch(getFrontendScopePermissions()); // This data needs to always be available for select lists
        dispatch(getApiScopes()); // This data needs to always be available for select lists
        // TODO: Only load these if we're expanding the grid...
        dispatch(getRoleFrontendScopes());
        dispatch(getRoleApiScopes());
        dispatch(getRolePermissions());
    }

    getData(roleId: IdType, state: RootState) {
        const roles = getAllRoles(state) || undefined;

        const frontendScopes = getAllFrontendScopes(state) || undefined;
        const frontendScopePermissionsGrouped = getFrontendScopePermissionsGroupedByScopeId(state) || undefined;
        const apiScopes = getAllApiScopes(state) || undefined;

        const roleFrontendScopesGrouped = getRoleFrontendScopesGroupedByRoleId(state) || undefined;
        const roleApiScopesGrouped = getRoleApiScopesGroupedByRoleId(state) || undefined;

        const roleFrontendScopePermissionsGrouped = getRoleFrontendScopePermissionsGroupedByScopeId(state) || undefined;
        const roleApiScopePermissionsGrouped = getRoleApiScopePermissionsGroupedByScopeId(state) || undefined;

        return {
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

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues, initialValues) || {};
    }

    mapDeletesFromFormValues(map: any) {
        const deletedRoleIds: IdType[] = [];
        const deletedRoleFrontendScopeIds: IdType[] = [];
        const deletedRoleApiScopeIds: IdType[] = [];
        const deletedRolePermissionIds: IdType[] = [];

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
            roles: deletedRoleIds,
            roleFrontendScopes: deletedRoleFrontendScopeIds,
            roleApiScopes: deletedRoleApiScopeIds,
            deletedRolePermissionIds: deletedRolePermissionIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues) || {};
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

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
                    return acc.concat(data.roleFrontendScopesGrouped[cur]);
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
                    return acc.concat(data.roleApiScopesGrouped[cur]);
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

        return Promise.all([
            dispatch(deleteRolePermissions(deletedRolePermissions, { toasts: {} })),
            dispatch(deleteRoles(deletedRoles, { toasts: {} })),
            dispatch(deleteRoleFrontendScopes(deletedRoleFrontendScopes, { toasts: {} })),
            dispatch(deleteRoleApiScopes(deletedRoleApiScopes, { toasts: {} })),
            dispatch(createOrUpdateRoles(roles, { toasts: {} })),
            dispatch(createOrUpdateRoleFrontendScopes(roleFrontendScopes, { toasts: {} })),
            dispatch(createOrUpdateRolePermissions(roleFrontendScopePermissions, { toasts: {} })),
            dispatch(createOrUpdateRoleApiScopes(roleApiScopes, { toasts: {} }))
        ]);
    }
}
