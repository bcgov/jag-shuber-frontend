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

import { IdType, LeaveSubCode } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminTrainingTypesProps } from './AdminTrainingTypesGrid';

export interface AdminTrainingTypesProps extends FormContainerProps {
    leaveTypes?: any[];
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
    reduxFormKey = 'leaves';
    formFieldNames = {
        default: 'leaves.leaveTypes'
    };
    title: string = ' Training Leave Types';

    FormComponent = (props: FormContainerProps<AdminTrainingTypesProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.default}
                    title={''} // Leave this blank
                    buttonLabel={'Add Leave Type'}
                    columns={[
                        // DataTable.TextFieldColumn('Leave Type', { fieldName: 'code', displayInfo: true }),
                        DataTable.TextFieldColumn('Training Leave Sub Code', { fieldName: 'subCode', colStyle: { width: '200px' }, displayInfo: true }),
                        DataTable.TextAreaColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: true }),
                        DataTable.DateColumn('Effective Date', 'effectiveDate', { colStyle: { width: '175px'}, displayInfo: true }),
                        DataTable.DateColumn('Expiry Date', 'expiryDate', { colStyle: { width: '175px' }, displayInfo: true }),
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
    DisplayComponent = (props: FormContainerProps<AdminTrainingTypesDisplayProps>) => (
        <div>
            {/*<Alert>No leaves exist</Alert>*/}
            <AdminTrainingTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminTrainingTypesProps = {}): FormErrors | undefined {
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

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);

        const leaveTypes: Partial<LeaveSubCode>[] = data.leaveTypes.map((c: LeaveSubCode) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        console.log('dumping AdminTrainingTypes grid data');
        console.log(leaveTypes);
        return Promise.resolve([]); // await dispatch(createOrUpdateLeaveSubCodes(leaveTypes, { toasts: {} }));
    }
}
