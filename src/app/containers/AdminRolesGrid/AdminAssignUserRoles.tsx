import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getUsers
} from '../../modules/users/actions';

import {
    getAllUsers
} from '../../modules/users/selectors';

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
import GenderCodeDisplay from '../GenderCodeDisplay';

// TODO: Fix this interface!
export interface AdminAssignUserRolesProps extends FormContainerProps {
    roles?: any[];
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
                    DataTable.SelectorFieldColumn('User Role', { fieldName: 'id', colStyle: { width: '325px' }, selectorComponent: RoleSelector, displayInfo: true }),
                    // DataTable.StaticTextColumn('Description', { fieldName: 'description', colStyle: { width: '350px' }, displayInfo: false }),
                    // DataTable.StaticTextColumn('Role Code', { fieldName: 'roleCode', colStyle: { width: '180px' }, displayInfo: false }),
                    DataTable.DateColumn('Effective Date', 'effectiveDate', { colStyle: { width: '150px'}, displayInfo: true }),
                    // DataTable.DateColumn('Date Created', 'createdDtm'),
                    DataTable.DateColumn('Expiry Date', 'expiryDate', { colStyle: { width: '150px'}, displayInfo: true }),
                    DataTable.SelectorFieldColumn('Status', { colStyle: { width: '175px' }, displayInfo: true }),
                    DataTable.StaticTextColumn('Assigned By', { fieldName: 'createdBy', colStyle: { width: '200px' }, displayInfo: false }),
                    DataTable.StaticDateColumn('Date Assigned', { fieldName: 'createdDtm', colStyle: { width: '200px' }, displayInfo: false }),
                ]}
                expandable={false}
                rowComponent={EmptyDetailRow}
                modalComponent={EmptyDetailRow}
                displayHeaderActions={true}
                displayHeaderSave={false}
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
                    actions={[]} // TODO: Finish adding configurable actions
                    columns={[
                        DataTable.StaticTextColumn('Full Name', { fieldName: 'displayName', colStyle: { width: '300px' }, displayInfo: false, filterable: true }),
                        // DataTable.StaticTextColumn('Last Name', { fieldName: 'lastName', colStyle: { width: '175px' }, displayInfo: false, filterable: true }),
                        DataTable.StaticTextColumn('Badge No.', { fieldName: 'sheriff.badgeNo', colStyle: { width: '175px' }, displayInfo: false, filterable: true }),
                        DataTable.StaticTextColumn('Rank', { fieldName: 'sheriff.rankCode', colStyle: { width: '175px' }, displayInfo: false, filterable: true }),
                        DataTable.MappedTextColumn('Gender', { fieldName: 'sheriff.genderCode', colStyle: { width: '175px' }, selectorComponent: GenderCodeDisplay, displayInfo: false, filterable: true }),
                        DataTable.MappedTextColumn('Home Location', { fieldName: 'sheriff.homeLocationId', colStyle: { width: '225px' }, selectorComponent: LocationDisplay, displayInfo: false, filterable: true }),
                        DataTable.MappedTextColumn('Current Location', { fieldName: 'sheriff.currentLocationId', colStyle: { width: '250px' }, selectorComponent: LocationDisplay, displayInfo: false, filterable: true }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true }), // No point really in setting the status here

                    ]}
                    filterable={true}
                    expandable={true}
                    // expandedRows={[1, 2]}
                    rowComponent={this.DetailComponent}
                    modalComponent={EmptyDetailRow}
                    displayHeaderActions={true}
                    displayActionsColumn={true}
                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminAssignUserRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminAssignUserRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminAssignUserRolesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Remove roleId from abstract
    fetchData(roleId: IdType, dispatch: Dispatch<{}>) {
        dispatch(getLocations()); // This data needs to always be available for select lists
        dispatch(getSheriffs()); // This data needs to always be available for select lists
        dispatch(getRoles()); // This data needs to always be available for select lists
        dispatch(getUsers());
    }

    getData(roleId: IdType, state: RootState) {
        const locations = getAllLocations(state) || undefined;
        const users = getAllUsers(state) || undefined;
        const sheriffs = getAllSheriffs(state) || undefined;
        const roles = getAllRoles(state) || undefined;

        return {
            locations,
            users,
            sheriffs,
            roles
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
