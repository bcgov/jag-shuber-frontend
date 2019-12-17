import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    // getUsers
} from '../../modules/user/actions';

import {
    getSheriffList as getSheriffs
} from '../../modules/sheriffs/actions';

import {
    getAllSheriffs
} from '../../modules/sheriffs/selectors';

import {
    getRoles
} from '../../modules/roles/actions';

import {
    getAllRoles
} from '../../modules/roles/selectors';

import {
    getLocations
} from '../../modules/system/action'; // TODO: Naming not consistent here!

import {
    getAllLocations
} from '../../modules/system/selectors';

import { RootState } from '../../store';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';

import RoleSelector from './RoleSelector';

import LocationDisplay from './LocationDisplay';

// TODO: Fix this interface!
export interface AdminAssignUserRolesProps extends FormContainerProps {
    roles?: any[]
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
        users: 'roles.users',
        roles: 'roles.roles'
    };
    title: string = 'Assign User Roles';
    DetailComponent: React.SFC<DetailComponentProps> = () => {
        const onButtonClicked = (ev: React.SyntheticEvent<any>, context: any, model: any) => {
            context.setActiveRow(model.id);
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
                    fieldName={this.formFieldNames.users}
                    title={''} // Leave this blank
                    buttonLabel={'Add User'}
                    columns={[
                        DataTable.StaticTextColumn('First Name', { fieldName: 'firstName', displayInfo: false }),
                        DataTable.StaticTextColumn('Last Name', { fieldName: 'lastName', displayInfo: false }),
                        DataTable.StaticTextColumn('Badge No.', { fieldName: 'badgeNo', displayInfo: false }),
                        DataTable.MappedTextColumn('Location', { fieldName: 'homeLocationId', selectorComponent: LocationDisplay, displayInfo: false }),
                        DataTable.StaticTextColumn('Rank', { fieldName: 'rankCode', displayInfo: false }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true }), // No point really in setting the status here

                    ]}
                    expandable={true}
                    // expandedRows={[1, 2]}
                    rowComponent={this.DetailComponent}
                    modalComponent={EmptyDetailRow}
                    displayHeaderActions={false}
                    displayActionsColumn={false}
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
        dispatch(getLocations()); // This data needs to always be available for select lists
        dispatch(getSheriffs()); // This data needs to always be available for select lists
        dispatch(getRoles()); // This data needs to always be available for select lists
        // dispatch(getUsers());
    }

    getData(roleId: IdType, state: RootState) {
        // TODO: Depending on component state, some of these calls will need to be filtered!
        const locations = getAllLocations(state) || undefined;
        const users = getAllSheriffs(state) || undefined;
        const roles = getAllRoles(state) || undefined;

        return {
            locations,
            users,
            roles
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
