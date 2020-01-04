import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    FrontendScope,
    FrontendScopePermission
} from '../../api';

import {
    getFrontendScopes,
    getFrontendScopePermissions,
    createOrUpdateFrontendScopes,
    createOrUpdateFrontendScopePermissions,
    deleteFrontendScopes,
    deleteFrontendScopePermissions,
    setAdminRolesPluginFilters
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllFrontendScopePermissions,
    getAllFrontendScopes,
    getFrontendScopePermissionsGroupedByScopeId,
    findAllFrontendScopes
} from '../../modules/roles/selectors';

import { IdType, Role } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';

import FrontendScopeSelector from './containers/FrontendScopeSelector';
import AdminScopePermissionsModal from './components/AdminScopePermissionsModal';
import { createOrUpdateFrontendScopePermissionRequest } from '../../modules/roles/requests/frontendScopePermissions';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';

export interface AdminFrontendScopesProps extends FormContainerProps {
    frontendScopes?: any[];
    frontendScopePermissionsGrouped?: {};
}

export interface AdminFrontendScopesDisplayProps extends FormContainerProps {

}

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
        frontendScopePermissionsGrouped: 'roles.frontendScopePermissionsGrouped'
    };
    title: string = 'Register Components';

    FormComponent = (props: FormContainerProps<AdminFrontendScopesProps>) => {
        const onButtonClicked = (ev: React.SyntheticEvent<any>, context: any, model: any) => {
            // TODO: Check on this!
            // Executes in DataTable's context
            context.setActiveRow(model.id);
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

        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.frontendScopes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.frontendScopes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Component'}
                    displayHeaderActions={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: [
                            ({ fields, index, model }) => <RemoveRow fields={fields} index={index} model={model} />,
                            ({ fields, index, model }) => { return (model && model.id) ? (<ExpireRow fields={fields} index={index} model={model} />) : null; }
                        ]
                    })}
                    columns={[
                        DataTable.TextFieldColumn('Component', { fieldName: 'scopeName', displayInfo: true, filterable: true, filterColumn: onFilterName }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'scopeCode', displayInfo: true, filterable: true, filterColumn: onFilterCode }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: false }),
                        DataTable.ButtonColumn('Define Permissions', 'list', { displayInfo: true }, onButtonClicked)
                    ]}
                    filterable={true}
                    rowComponent={EmptyDetailRow}
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
        dispatch(getFrontendScopes()); // This data needs to always be available for select lists
        dispatch(getFrontendScopePermissions()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);
        // console.log(filterData);

        // Get form data
        const frontendScopes = (filters && filters.frontendScopes)
            ? findAllFrontendScopes(filters.frontendScopes)(state) || undefined
            : getAllFrontendScopes(state) || undefined;

        const frontendScopePermissionsGrouped = getFrontendScopePermissionsGroupedByScopeId(state) || undefined;

        return {
            ...filterData,
            frontendScopes,
            frontendScopePermissionsGrouped
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
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

        return {
            frontendScopes: deletedScopeIds,
            frontendScopePermissions: deletedScopePermissionIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
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

        if (deletedScopePermissions.length > 0) await dispatch(deleteFrontendScopePermissions(deletedScopePermissions));
        if (deletedScopes.length > 0) await dispatch(deleteFrontendScopes(deletedScopes));
        if (scopes.length > 0) await dispatch(createOrUpdateFrontendScopes(scopes));
        if (scopePermissions.length > 0) await dispatch(createOrUpdateFrontendScopePermissions(scopePermissions));

        return Promise.resolve([]);
    }
}
