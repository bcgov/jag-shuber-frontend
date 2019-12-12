import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getRoles
} from '../../modules/roles/actions';

import { RootState } from '../../store';

import {
    getAllRoles
} from '../../modules/roles/selectors';

/*import {
    getUser
} from '../../modules/user/selectors';*/

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';

export interface AdminTrainingTypesProps extends FormContainerProps {
    roles?: any[];
}

export interface AdminTrainingTypesDisplayProps extends FormContainerProps {

}

class AdminTrainingTypesDisplay extends React.PureComponent<AdminTrainingTypesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
        return (
            <div />
        );
    }
}

export default class AdminTrainingTypesGrid extends FormContainerBase<AdminTrainingTypesProps> {
    name = 'admin-training-types-grid';
    reduxFormKey = 'roles';
    formFieldNames = {
        default: 'roles.roles'
    };
    title: string = ' Training Types';

    FormComponent = (props: FormContainerProps<AdminTrainingTypesProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.default}
                    title={''} // Leave this blank
                    buttonLabel={'Add Training Type'}
                    columns={[
                        DataTable.TextFieldColumn('Training Type', { fieldName: 'default', displayInfo: true }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'default', displayInfo: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'default', displayInfo: true }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        DataTable.SelectorFieldColumn('Status', { displayInfo: true }),

                    ]}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                    displayHeaderActions={true}
                />
            </div>
        );
    }

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: FormContainerProps<AdminTrainingTypesDisplayProps>) => (
        <div>
            {/*<Alert>No types exist</Alert>*/}
            <AdminTrainingTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminTrainingTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Not sure if this should be typeId or what, I'm not there yet...
    fetchData(typeId: IdType, dispatch: Dispatch<{}>) {
        dispatch(getRoles()); // This data needs to always be available for select lists
    }

    getData(typeId: IdType, state: RootState) {
        // TODO: Depending on component state, some of these calls will need to be filtered!
        const roles = getAllRoles(state) || undefined;

        return {
            roles
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
