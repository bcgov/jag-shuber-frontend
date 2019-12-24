import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getCourtrooms,
    createOrUpdateCourtrooms,
    deleteCourtrooms
} from '../../modules/assignments/actions';

import {
    getAllCourtrooms
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { Courtroom, IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminCourtroomsProps } from './AdminCourtroomsGrid';
import LocationSelector from '../LocationSelector';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
// import { createOrUpdateCourtrooms } from '../../modules/assignments/actions';

export interface AdminCourtroomsProps extends FormContainerProps {
    courtrooms?: any[];
}

export interface AdminCourtroomsDisplayProps extends FormContainerProps {

}

class AdminCourtroomsDisplay extends React.PureComponent<AdminCourtroomsDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
        return (
            <div />
        );
    }
}

export default class AdminCourtroomsGrid extends FormContainerBase<AdminCourtroomsProps> {
    name = 'admin-courtrooms-grid';
    reduxFormKey = 'assignments';
    formFieldNames = {
        courtrooms: 'assignments.courtrooms'
    };
    title: string = ' Courtrooms';

    FormComponent = (props: FormContainerProps<AdminCourtroomsProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.courtrooms}
                    title={''} // Leave this blank
                    buttonLabel={'Add Courtroom'}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: [
                            ({ fields, index, model }) => <RemoveRow fields={fields} index={index} model={model} />,
                            ({ fields, index, model }) => { return (model && model.id) ? (<ExpireRow fields={fields} index={index} model={model} />) : null; }
                        ]
                    })}
                    columns={[
                        DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true }),
                        DataTable.TextFieldColumn('Courtroom', { fieldName: 'name', displayInfo: false, filterable: true }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true }),
                        DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),

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

    DisplayComponent = (props: FormContainerProps<AdminCourtroomsDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminCourtroomsDisplay {...props} />
        </div>
    )

    validate(values: AdminCourtroomsProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Remove typeId from abstract
    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getCourtrooms()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: {} | undefined) {
        const courtrooms = getAllCourtrooms(state) || undefined;

        return {
            courtrooms
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedCourtroomIds: IdType[] = [];

        if (map.courtrooms) {
            const initialValues = map.courtrooms.initialValues;
            const existingIds = map.courtrooms.values.map((val: any) => val.id);

            const removeCourtroomIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedCourtroomIds.push(...removeCourtroomIds);
        }

        return {
            courtrooms: deletedCourtroomIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedCourtrooms: IdType[] = dataToDelete.courtrooms as IdType[];

        const courtrooms: Partial<Courtroom>[] = data.courtrooms.map((c: Courtroom) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        return Promise.all([
            dispatch(deleteCourtrooms(deletedCourtrooms)),
            dispatch(createOrUpdateCourtrooms(courtrooms))
        ]);
    }
}
