import React from 'react';
import {
    Alert
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';
import { RootState } from '../../store';

import { IdType } from '../../api';
import {
    DataTableBase,
    DataTableProps,
    // DataTableSectionPlugin
} from '../../components/Table/DataTable';

import RolesFieldTable from './RolesFieldTable';

export interface AdminRolesProps extends DataTableProps {}

export default class AdminRolesGrid extends DataTableBase<AdminRolesProps> {
    name = 'roles';
    formFieldNames = { default: 'roles'};
    title: string = 'User Roles';
    FormComponent = (props: DataTableProps<AdminRolesProps>) => (
        <div>
            <RolesFieldTable
                fieldName={this.formFieldNames.default}
                title={<h3>Assigned Roles</h3>}
                columns={[
                    RolesFieldTable.RoleCodeColumn(),
                    RolesFieldTable.DateColumn('Start Date', 'startDate'),
                    RolesFieldTable.DateColumn('End Date', 'endDate'),
                    RolesFieldTable.CancelColumn()
                ]}
            />
        </div>
    )

    DisplayComponent = ({ data = {}}: DataTableProps<AdminRolesProps>) => (
        <Alert>No roles exist</Alert>
    )

    validate(values: AdminRolesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(sheriffId: IdType, dispatch: Dispatch<{}>) {
        // TODO: Implement getRoles
        // dispatch(getRoles());
    }

    getData(roleId: IdType, state: RootState) {
        return {
        };
    }

    getDataFromFormValues(formValues: {}): DataTableProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
