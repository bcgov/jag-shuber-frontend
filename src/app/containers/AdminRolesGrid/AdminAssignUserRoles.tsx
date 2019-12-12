import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getRoles,
    getFrontendScopes,
    getApiScopes,
    getRoleFrontendScopes,
    getRoleApiScopes,
    getRolePermissions
} from '../../modules/roles/actions';

import {
    // getUsers
} from '../../modules/user/actions';

import { RootState } from '../../store';

import {
    getAllRoles,
    getAllApiScopes,
    getAllFrontendScopes,
    getAllRoleApiScopes,
    getAllRoleFrontendScopes,
    getAllRolePermissions
} from '../../modules/roles/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';

import RoleSelector from './RoleSelector';

export interface AdminAssignUserRolesProps extends FormContainerProps {
    roles?: any[],
    frontendScopes?: any[],
    apiScopes?: any[]
}

export interface AdminAssignUserRolesDisplayProps extends FormContainerProps {

}

class AdminAssignUserRolesDisplay extends React.PureComponent<AdminAssignUserRolesDisplayProps, any> {
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

export default class AdminAssignUserRoles extends FormContainerBase<AdminAssignUserRolesProps> {
    name = 'admin-assign-user-roles';
    reduxFormKey = 'roles';
    formFieldNames = {
        roles: 'roles.roles',
        apiScopes: 'roles.apiScopes',
        frontendScopes: 'roles.frontendScopes',
        roleApiScopes: 'roles.roleApiScopes',
        roleFrontendScopes: 'roles.roleFrontendScopes',
        rolePermissions: 'roles.rolePermissions'
    };
    title: string = 'Assign User Roles';
    DetailComponent: React.SFC<DetailComponentProps> = () => {
        const onButtonClicked = (ev: React.SyntheticEvent<any>, context: any) => {
            context.setActiveRoleScope(Math.random());
        };

        return (
            <DataTable
                fieldName={this.formFieldNames.roles}
                title={''} // Leave this blank
                buttonLabel={'Assign New Role'}
                columns={[
                    DataTable.SelectorFieldColumn('Role Name', { fieldName: 'id', selectorComponent: RoleSelector, displayInfo: true }),
                    DataTable.StaticTextColumn('Role Code', { fieldName: 'roleCode', displayInfo: false }),
                    DataTable.StaticTextColumn('Description', { fieldName: 'description', displayInfo: false }),
                    // DataTable.DateColumn('Date Created', 'createdDtm'),
                    DataTable.SelectorFieldColumn('Status', { displayInfo: true }),
                ]}
                expandable={false}
                rowComponent={EmptyDetailRow}
                modalComponent={EmptyDetailRow}
                displayHeaderActions={true}
            />
        );
    }

    FormComponent = (props: FormContainerProps<AdminAssignUserRolesProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.roles}
                    title={''} // Leave this blank
                    buttonLabel={'Add New User'}
                    columns={[
                        DataTable.SelectorFieldColumn('User Name', { fieldName: 'roleName', displayInfo: true }),
                        DataTable.StaticTextColumn('Description', { fieldName: 'description', displayInfo: false }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        DataTable.StaticTextColumn('Status', { displayInfo: false }),

                    ]}
                    expandable={true}
                    // expandedRows={[1, 2]}
                    rowComponent={this.DetailComponent}
                    modalComponent={EmptyDetailRow}
                    displayHeaderActions={true}
                />
            </div>
        );
    }

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: FormContainerProps<AdminAssignUserRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminAssignUserRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminAssignUserRolesProps = {}): FormErrors | undefined {
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
        // dispatch(getRoles());
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
