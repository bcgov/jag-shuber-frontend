import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getApiScopes,
    createOrUpdateApiScopes,
    deleteApiScopes, setAdminRolesPluginFilters
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllApiScopes,
    findAllApiScopes
} from '../../modules/roles/selectors';

import { ApiScope, IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import { buildPluginPermissions } from '../permissionUtils';
import { ActionProps } from '../../components/TableColumnCell/Actions';

// import ApiScopeSelector from './ApiScopeSelector';
// import AdminScopePermissionsModal from './AdminScopePermissionsModal';

export interface AdminApiScopesProps extends FormContainerProps {
    apiScopes?: any[];
}

export interface AdminApiScopesDisplayProps extends FormContainerProps {}

class AdminApiScopesDisplay extends React.PureComponent<AdminApiScopesDisplayProps, any> {
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

export default class AdminApiScopes extends FormContainerBase<AdminApiScopesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_PLUGIN_API_SCOPES';
    // END NOTICE
    reduxFormKey = 'roles';
    formFieldNames = {
        apiScopes: 'roles.apiScopes'
    };
    title: string = 'Manage API Scopes';

    FormComponent = (props: FormContainerProps<AdminApiScopesProps>) => {
        const { getPluginPermissions } = props;
        const { grantAll, permissions } = buildPluginPermissions(getPluginPermissions);

        const onFilterName = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    apiScopes: {
                        scopeName: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    apiScopes: {
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
                    apiScopes: {}
                }, setAdminRolesPluginFilters);
            }
        };

        const apiScopeActions = [
            ({ fields, index, model }) => {
                return (<DeleteRow fields={fields} index={index} model={model} showComponent={grantAll} />);
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.apiScopes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.apiScopes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Scope'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: apiScopeActions
                    })}
                    columns={[
                        DataTable.TextFieldColumn('Scope Name', { fieldName: 'scopeName', displayInfo: true, filterable: true, filterColumn: onFilterName }),
                        DataTable.TextFieldColumn('Scope Code', { fieldName: 'scopeCode', displayInfo: true, filterable: true, filterColumn: onFilterCode }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: false })
                    ]}
                    filterable={true}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                />
            </div>
        );
    }

    // TODO: Alternative display if no records found?
    DisplayComponent = (props: FormContainerProps<AdminApiScopesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminApiScopesDisplay {...props} />
        </div>
    )

    validate(values: AdminApiScopesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Not sure if this should be roleId or what, I'm not there yet...
    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getApiScopes()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);
        // console.log(filterData);

        // Get form data
        const apiScopes = (filters && filters.apiScopes)
            ? findAllApiScopes(filters.apiScopes)(state) || undefined
            : getAllApiScopes(state);

        return {
            ...filterData,
            apiScopes
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedApiScopeIds: IdType[] = [];

        // TODO: This isn't going to work...
        if (map.apiScopes) {
            const initialValues = map.apiScopes.initialValues;
            const existingIds = map.apiScopes.values.map((val: any) => val.id);

            const removeApiScopeIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedApiScopeIds.push(...removeApiScopeIds);
        }

        return {
            apiScopes: deletedApiScopeIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedScopes: IdType[] = dataToDelete.apiScopes as IdType[];

        const scopes: Partial<ApiScope>[] = data.apiScopes.map((s: ApiScope) => ({
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

        if (deletedScopes.length > 0) {
            await dispatch(deleteApiScopes(deletedScopes));
        }

        if (scopes.length > 0) {
            await dispatch(createOrUpdateApiScopes(scopes));
        }
    }
}
