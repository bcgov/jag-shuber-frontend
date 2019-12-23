import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import { RootState } from '../../store';

import {
    getLeaveSubCodes,
    createOrUpdateLeaveSubCodes,
    deleteLeaveSubCodes
} from '../../modules/leaves/actions';

import {
    getAllPersonalLeaveSubCodes as getAllLeaveSubCodes
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
    personalLeaveTypes?: any[];
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
        personalLeaveTypes: 'leaves.personalLeaveTypes'
    };
    title: string = ' Personal Leave Types';

    FormComponent = (props: FormContainerProps<AdminLeaveTypesProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.personalLeaveTypes}
                    title={''} // Leave this blank
                    buttonLabel={'Add Leave Type'}
                    columns={[
                        // DataTable.TextFieldColumn('Leave Type', { fieldName: 'code', displayInfo: true }),
                        DataTable.TextFieldColumn('Personal Leave Sub Code', { fieldName: 'subCode', colStyle: { width: '200px' }, displayInfo: true, filterable: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', colStyle: { width: '300px' }, displayInfo: false }),
                        DataTable.DateColumn('Effective Date', 'effectiveDate', { colStyle: { width: '175px'}, displayInfo: true, filterable: true }),
                        DataTable.DateColumn('Expiry Date', 'expiryDate', { colStyle: { width: '175px'}, displayInfo: true, filterable: true }),
                        // DataTable.StaticTextColumn('Created By', { fieldName: 'createdBy', colStyle: { width: '175px' }, displayInfo: false }),
                        // DataTable.StaticDateColumn('Date Created', { fieldName: 'createdDtm', colStyle: { width: '175px' }, displayInfo: false }),
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

        Object.keys(leaveTypes).forEach(t => {
            const leaveType = Object.assign(
                {
                    id: leaveTypes[t].subCode
                },
                leaveTypes[t]
            );
            leaveTypesArray.push(leaveType);
        });

        return {
            personalLeaveTypes: leaveTypesArray
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedLeaveTypeIds: IdType[] = [];

        if (map.personalLeaveTypes) {
            const initialValues = map.personalLeaveTypes.initialValues;
            const existingIds = map.personalLeaveTypes.values.map((val: any) => val.id);

            const removeLeaveTypeIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedLeaveTypeIds.push(...removeLeaveTypeIds);
        }

        return {
            personalLeaveTypes: deletedLeaveTypeIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedLeaveTypes: IdType[] = dataToDelete.personalLeaveTypes as IdType[];

        const leaveTypes: Partial<LeaveSubCode>[] = data.personalLeaveTypes.map((c: LeaveSubCode) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        console.log('dumping AdminLeaveTypes grid data');
        console.log(deletedLeaveTypes);
        console.log(leaveTypes);
        return Promise.all([
            dispatch(deleteLeaveSubCodes(deletedLeaveTypes)),
            dispatch(createOrUpdateLeaveSubCodes(leaveTypes))
        ]);
    }
}
