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
    FormContainerProps, FormValuesDiff,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import { DataTableDetailComponentProps as DetailComponentProps } from '../../components/Table/DataTableDetail';

import FrontendScopeSelector from './containers/FrontendScopeSelector';
import AdminScopePermissionsModal from './containers/AdminScopePermissionsModal';
import { createOrUpdateFrontendScopePermissionsRequest } from '../../modules/roles/requests/frontendScopePermissions';
import DeleteRow from '../../components/Table/TableColumnActions/DeleteRow';
import ExpireRow from '../../components/Table/TableColumnActions/ExpireRow';
import RemoveRow from '../../components/Table/TableColumnActions/RemoveRow';
import RoleSelector from './containers/RoleSelector';
import ApiScopeSelector from './containers/ApiScopeSelector';
import ApiScopeCodeDisplay from './containers/ApiScopeCodeDisplay';
import ApiScopeDescriptionDisplay from './containers/ApiScopeDescriptionDisplay';
import AdminRoleScopeAccessModal from './containers/AdminRoleScopeAccessModal';
import FrontendScopeCodeDisplay from './containers/FrontendScopeCodeDisplay';
import FrontendScopeDescriptionDisplay from './containers/FrontendScopeDescriptionDisplay';
import { RoleFrontendScopePermission } from '../../api/Api';
import { buildPluginPermissions, userCan } from '../permissionUtils';
import { ActionProps } from '../../components/Table/TableColumnCell/Actions';

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
        return (
            <div />
        );
    }
}

class FrontendScopeApisDataTable extends DataTable<RoleApiScope> {}

export default class AdminFrontendScopes extends FormContainerBase<AdminFrontendScopesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_FRONTEND_SCOPES';
    // END NOTICE
    reduxFormKey = 'roles';
    formFieldNames = {
        frontendScopes: 'roles.frontendScopes',
        frontendScopeApisGrouped: 'roles.frontendScopeApisGrouped',
        frontendScopePermissionsGrouped: 'roles.frontendScopePermissionsGrouped'
    };
    title: string = 'Register Components';

    DetailComponent: React.SFC<DetailComponentProps> = ({ parentModelId, getPluginPermissions }) => {
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

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
                    actions: frontendScopeApiActions,
                    trace: `[${this.name}] FormComponent -> DataTable` // Just for debugging
                })}
                columns={[
                    DataTable.SelectorFieldColumn('Api Scope', { fieldName: 'apiScopeId', colStyle: { width: '300px' }, selectorComponent: ApiScopeSelector, displayInfo: true }),
                    DataTable.MappedTextColumn('Scope Code', { fieldName: 'apiScopeId', colStyle: { width: '300px' }, selectorComponent: ApiScopeCodeDisplay, displayInfo: false }),
                    DataTable.StaticDateColumn('Last Modified', { fieldName: 'updatedDtm', colStyle: { width: '350px' }, displayInfo: false }),
                    DataTable.StaticTextColumn('Assigned By', { fieldName: 'updatedBy', colStyle: { width: '200px' }, displayInfo: false }),
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
        const { getPluginPermissions, setPluginFilters } = props;
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onButtonClicked = (ev: React.SyntheticEvent<{}>, context?: any, model?: any) => {
            // Executes in DataTable's context
            if (model) context.setActiveRow(model.id);
        };

        const onFilterName = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    frontendScopes: {
                        scopeName: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    frontendScopes: {
                        scopeCode: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            if (setPluginFilters) {
                setPluginFilters({
                    frontendScopes: {}
                }, setAdminRolesPluginFilters);
            }
        };

        const frontendScopeActions = [
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <Button bsStyle="primary" onClick={(ev) => dataTableInstance && dataTableInstance.component && onButtonClicked(ev, dataTableInstance.component, model)}>
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
                        actions: frontendScopeActions,
                        trace: `[${this.name}] FormComponent -> DataTable` // Just for debugging
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

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: FormValuesDiff = this.getDataFromFormValues(
            formValues,
            initialValues,
            [
                'frontendScopePermissionsGrouped'
            ]
        ) as FormValuesDiff;

        const deletedScopes: IdType[] = data.frontendScopes.deletedIds as IdType[];
        const deletedScopePermissions: IdType[] = data.frontendScopePermissions.deletedIds as IdType[];

        const scopesData = [
            ...data.frontendScopes.added,
            ...data.frontendScopes.updated
        ];

        const scopes: Partial<FrontendScope>[] = scopesData.map((s: FrontendScope) => ({
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

        const scopePermissionsData = [
            ...data.frontendScopePermissionsGrouped.added,
            ...data.frontendScopePermissionsGrouped.updated
        ];

        const scopePermissions: Partial<FrontendScopePermission>[] = (scopePermissionsData)
            ? Object.keys(scopePermissionsData)
                .reduce((acc, cur, idx) => {
                    const currentScopePermissions = scopePermissionsData[cur]
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

        if (deletedScopePermissions.length > 0) {
            await dispatch(deleteFrontendScopePermissions(deletedScopePermissions));
        }

        if (deletedScopes.length > 0) {
            await dispatch(deleteFrontendScopes(deletedScopes));
        }

        if (scopes.length > 0) {
            await dispatch(createOrUpdateFrontendScopes(scopes));
        }
        if (scopePermissions.length > 0) {
            await dispatch(createOrUpdateFrontendScopePermissions(scopePermissions));
        }
    }
}
