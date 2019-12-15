import React from 'react';
import {
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getApiScopes
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllApiScopes
} from '../../modules/roles/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';

// import ApiScopeSelector from './ApiScopeSelector';
// import AdminScopePermissionsModal from './AdminScopePermissionsModal';

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
                    buttonLabel={'Add API Endpoint'}
                    displayHeaderActions={true}
                    columns={[
                        DataTable.TextFieldColumn('API Endpoint', { fieldName: 'scopeName', displayInfo: true, disabled: true }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'scopeCode', displayInfo: true, disabled: true }),
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
        dispatch(getApiScopes()); // This data needs to always be available for select lists
    }

    getData(roleId: IdType, state: RootState) {
        const apiScopes = getAllApiScopes(state) || undefined;

        return {
            apiScopes
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
