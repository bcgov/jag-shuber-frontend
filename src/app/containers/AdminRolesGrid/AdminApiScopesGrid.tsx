import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getApiScopes, getFrontendScopes, getRoleApiScopes, getRoleFrontendScopes, getRolePermissions, getRoles, getUserRoles
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllApiScopes,
    getAllFrontendScopes,
    getAllRoleApiScopes,
    getAllRoleFrontendScopes,
    getAllRolePermissions,
    getAllRoles
} from '../../modules/roles/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';

import ApiScopeSelector from './ApiScopeSelector';
import AdminRolePermissionsModal from './AdminRolePermissionsModal';

export interface AdminApiScopesProps extends FormContainerProps {
    apiScopes?: any[];
}

export interface AdminApiScopesDisplayProps extends FormContainerProps {

}

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

export default class AdminApiScopesGrid extends FormContainerBase<AdminApiScopesProps> {
    name = 'admin-api-scopes-grid';
    reduxFormKey = 'roles';
    formFieldNames = {
        apiScopes: 'roles.apiScopes'
    };
    title: string = 'Register API Routes';

    FormComponent = (props: FormContainerProps<AdminApiScopesProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.apiScopes}
                    title={''} // Leave this blank
                    buttonLabel={'Add API Route'}
                    displayHeaderActions={true}
                    columns={[
                        DataTable.SelectorFieldColumn('API Role', { fieldName: 'id', selectorComponent: ApiScopeSelector, displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: true, disabled: true })
                    ]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                />
            </div>
        );
    }

    // TODO: Figure out why Fragments aren't working...
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
    fetchData(roleId: IdType, dispatch: Dispatch<{}>) {
        dispatch(getRoles()); // This data needs to always be available for select lists
        dispatch(getFrontendScopes()); // This data needs to always be available for select lists
        dispatch(getApiScopes()); // This data needs to always be available for select lists
        // TODO: Only load these if we're expanding the grid...
        dispatch(getRoleFrontendScopes());
        dispatch(getRoleApiScopes());
        dispatch(getRolePermissions());
        // TODO: These might not belong here, but I might as well code them up at the same time
        // dispatch(getUsers());
        dispatch(getUserRoles());
    }

    getData(roleId: IdType, state: RootState) {
        // TODO: Depending on component state, some of these calls will need to be filtered!
        const roles = getAllRoles(state) || undefined;
        const frontendScopes = getAllFrontendScopes(state) || undefined;
        const apiScopes = getAllApiScopes(state) || undefined;
        const roleFrontendScopes = getAllRoleFrontendScopes(state) || undefined;
        const roleApiScopes = getAllRoleApiScopes(state) || undefined;
        const rolePermissions = getAllRolePermissions(state) || undefined;
        return {
            roles,
            frontendScopes,
            apiScopes,
            roleFrontendScopes,
            roleApiScopes,
            rolePermissions
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
