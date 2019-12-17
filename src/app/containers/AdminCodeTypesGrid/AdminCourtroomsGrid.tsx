import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getCourtrooms
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
        default: 'assignments.courtrooms'
    };
    title: string = ' Courtrooms';

    FormComponent = (props: FormContainerProps<AdminCourtroomsProps>) => {
        return (
            <div>
                <DataTable
                    fieldName={this.formFieldNames.default}
                    title={''} // Leave this blank
                    buttonLabel={'Add Courtroom'}
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

    // TODO: Figure out why Fragments aren't working...
    DisplayComponent = (props: FormContainerProps<AdminCourtroomsDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminCourtroomsDisplay {...props} />
        </div>
    )

    validate(values: AdminCourtroomsProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: Not sure if this should be typeId or what, I'm not there yet...
    fetchData(typeId: IdType, dispatch: Dispatch<{}>) {
        dispatch(getCourtrooms()); // This data needs to always be available for select lists
    }

    getData(typeId: IdType, state: RootState) {
        // TODO: Depending on component state, some of these calls will need to be filtered!
        const courtrooms = getAllCourtrooms(state) || undefined;

        return {
            courtrooms
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);

        const courtrooms: Partial<Courtroom>[] = data.courtrooms.map((c: Courtroom) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        console.log('dumping AdminCourtrooms grid data');
        console.log(courtrooms);
        return Promise.resolve([]); // await dispatch(createOrUpdateCourtrooms(courtrooms, { toasts: {} }));
    }
}
