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

import { RootState } from '../../store';
import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import AdminRolePermissionsModal from '../../containers/AdminRolesGrid/AdminRolePermissionsModal';

export interface AdminRolesProps extends FormContainerProps {}

export interface AdminRolesDisplayProps extends FormContainerProps {

}

class AdminRolesDisplay extends React.PureComponent<AdminRolesDisplayProps, any> {
    render() {
        // const { data = [] } = this.props;

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

export default class AdminRolesGrid extends FormContainerBase<AdminRolesProps> {
    name = 'roles';
    formFieldNames = { default: 'roles'};
    title: string = 'Manage Roles';
    DetailComponent: React.SFC<DetailComponentProps> = () => {
        const onButtonClicked = (ev: React.SyntheticEvent<any>, context: any) => {
            context.setActiveRoleScope(Math.random());
        };

        return (
            <>
                <DataTable
                    fieldName={this.formFieldNames.default}
                    title={''} // Leave this blank
                    columns={[
                        DataTable.SelectorFieldColumn('Component', { displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Code', { displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Description', { displayInfo: true, disabled: true }),
                        DataTable.ButtonColumn('Edit Permissions', 'list', { displayInfo: true }, onButtonClicked)
                    ]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={AdminRolePermissionsModal}
                />
                <DataTable
                    fieldName={this.formFieldNames.default}
                    title={''} // Leave this blank
                    columns={[
                        DataTable.SelectorFieldColumn('API Role', { displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Code', { displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Description', { displayInfo: true, disabled: true }),
                        DataTable.ButtonColumn('View Role', 'eye-open', { displayInfo: true }, onButtonClicked),
                    ]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={AdminRolePermissionsModal}
                />
            </>
        );
    }

    FormComponent = (props: FormContainerProps<AdminRolesProps>) => (
        <div>
            <DataTable
                fieldName={this.formFieldNames.default}
                title={''} // Leave this blank
                columns={[
                    DataTable.TextFieldColumn('Role Name', { displayInfo: true }),
                    DataTable.TextFieldColumn('Role Code', { displayInfo: true }),
                    DataTable.TextFieldColumn('Description', { displayInfo: true }),
                    // DataTable.DateColumn('Date Created', 'createdDtm'),
                    DataTable.SelectorFieldColumn('Status', { displayInfo: true }),

                ]}
                expandable={true}
                // expandedRows={[1, 2]}
                rowComponent={this.DetailComponent}
                modalComponent={EmptyDetailRow}
                displayHeaderActions={true}
            />
        </div>
    )

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: FormContainerProps<AdminRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminRolesProps = {}): FormErrors | undefined {
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
    }

    getData(roleId: IdType, state: RootState) {
        return {
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
