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

import { LeaveSubCode, IdType } from '../../api';

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
                        DataTable.TextFieldColumn('Personal Leave Sub Code', { fieldName: 'subCode', colStyle: { width: '200px' }, displayInfo: true, filterable: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: false }),
                        DataTable.DateColumn('Effective Date', 'effectiveDate', { colStyle: { width: '175px'}, displayInfo: true }),
                        DataTable.DateColumn('Expiry Date', 'expiryDate', { colStyle: { width: '175px'}, displayInfo: true }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true }),

                    ]}
                    filterable={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                    displayHeaderActions={true}
                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminLeaveTypesDisplayProps>) => (
        <div>
            {/*<Alert>No leaves exist</Alert>*/}
            <AdminLeaveTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminLeaveTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Remove typeId from abstract
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

        console.log('dumping AdminLeaveTypes grid data');
        console.log(leaveTypes);
        return Promise.resolve([]); // await dispatch(createOrUpdateLeaveSubCodes(leaveTypes, { toasts: {} }));
    }
}
