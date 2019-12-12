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
    getFrontendScopes, getRoleApiScopes, getRoleFrontendScopes, getRolePermissions, getRoles, getUserRoles
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllApiScopes,
    getAllFrontendScopes,
    getAllRoleApiScopes,
    getAllRoleFrontendScopes,
    getAllRolePermissions,
    getAllRoles,
    getRoleFrontendScopesGroupedByRoleId
} from '../../modules/roles/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';

import FrontendScopeSelector from './FrontendScopeSelector';
import AdminScopePermissionsModal from './AdminScopePermissionsModal';

export interface AdminFrontendScopesProps extends FormContainerProps {
    frontendScopes?: any[];
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

export default class AdminFrontendScopesGrid extends FormContainerBase<AdminFrontendScopesProps> {
    name = 'admin-frontend-scopes-grid';
    reduxFormKey = 'roles';
    formFieldNames = {
        frontendScopes: 'roles.frontendScopes'
    };
    title: string = 'Register Components';

    FormComponent = (props: FormContainerProps<AdminFrontendScopesProps>) => {
        const onButtonClicked = (ev: React.SyntheticEvent<any>, context: any) => {
            // TODO: Check on this!
            // Executes in DataTable's context
            context.setActiveRoleScope(Math.random());
        };

        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.frontendScopes}
                    title={''} // Leave this blank
                    buttonLabel={'Add Component'}
                    displayHeaderActions={true}
                    columns={[
                        DataTable.TextFieldColumn('Component', { fieldName: 'scopeName', displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'scopeCode', displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: true, disabled: true }),
                        DataTable.ButtonColumn('Define Permissions', 'list', { displayInfo: true }, onButtonClicked)
                    ]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={AdminScopePermissionsModal}
                />
            </div>
        );
    }

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: FormContainerProps<AdminFrontendScopesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminFrontendScopesDisplay {...props} />
        </div>
    )

    validate(values: AdminFrontendScopesProps = {}): FormErrors | undefined {
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
        const roles = getAllRoles(state) || undefined;
        const frontendScopes = getAllFrontendScopes(state) || undefined;
        const apiScopes = getAllApiScopes(state) || undefined;
        const roleFrontendScopes = getAllRoleFrontendScopes(state) || undefined;
        const roleFrontendScopesGrouped = getRoleFrontendScopesGroupedByRoleId(state) || undefined;
        const roleApiScopes = getAllRoleApiScopes(state) || undefined;
        const rolePermissions = getAllRolePermissions(state) || undefined;

        return {
            roles,
            frontendScopes,
            apiScopes,
            roleFrontendScopes,
            roleFrontendScopesGrouped,
            roleApiScopes,
            rolePermissions
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
