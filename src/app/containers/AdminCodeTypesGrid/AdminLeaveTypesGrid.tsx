import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import { RootState } from '../../store';

import {
    getLeaveSubCodes
} from '../../modules/leaves/actions';

import {
    allLeavesSubCodeMap as getAllLeaveSubCodes
} from '../../modules/leaves/selectors';

import { IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminLeaveTypesProps } from './AdminLeaveTypesGrid';

export interface AdminLeaveTypesProps extends FormContainerProps {
    leaveTypes?: any[];
}

export interface AdminLeaveTypesDisplayProps extends FormContainerProps {

}

class AdminLeaveTypesDisplay extends React.PureComponent<AdminLeaveTypesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
        return (
            <div />
        );
    }
}

export default class AdminLeaveTypesGrid extends FormContainerBase<AdminLeaveTypesProps> {
    name = 'admin-leave-types-grid';
    reduxFormKey = 'leaves';
    formFieldNames = {
        default: 'leaves.leaveTypes'
    };
    title: string = ' Personal Leave Types';

    FormComponent = (props: FormContainerProps<AdminLeaveTypesProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.default}
                    title={''} // Leave this blank
                    buttonLabel={'Add Leave Type'}
                    columns={[
                        // DataTable.TextFieldColumn('Leave Type', { fieldName: 'code', displayInfo: true }),
                        DataTable.TextFieldColumn('Personal Leave Sub Code', { fieldName: 'subCode', displayInfo: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: true }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true }),

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
    DisplayComponent = (props: FormContainerProps<AdminLeaveTypesDisplayProps>) => (
        <div>
            {/*<Alert>No leaves exist</Alert>*/}
            <AdminLeaveTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminLeaveTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Not sure if this should be typeId or what, I'm not there yet...
    fetchData(typeId: IdType, dispatch: Dispatch<{}>) {
        dispatch(getLeaveSubCodes()); // This data needs to always be available for select lists
    }

    getData(typeId: IdType, state: RootState) {
        // TODO: Depending on component state, some of these calls will need to be filtered!
        const leaveTypes = getAllLeaveSubCodes(state) || undefined;

        const leaveTypesArray: any[] = [];
        // TODO: Maybe this should go in the selector or something instead? Not sure...

        Object.keys(leaveTypes).forEach(t => leaveTypesArray.push(leaveTypes[t]));

        return {
            leaveTypes: leaveTypesArray
        };
    }

    getDataFromFormValues(formValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }
}
