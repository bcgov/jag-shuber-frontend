import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getCourtrooms,
    createOrUpdateCourtrooms,
    deleteCourtrooms,
    expireCourtrooms,
    selectAdminCourtroomsPluginSection,
    setAdminCourtroomsPluginSubmitErrors,
    setAdminCourtroomsPluginFilters, setAdminCourtRolesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllCourtrooms,
    findAllCourtrooms
} from '../../modules/assignments/selectors';

import {
    currentLocation as getCurrentLocation
} from '../../modules/user/selectors';

import { RootState } from '../../store';

import { Courtroom, IdType, JailRoleCode } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminCourtroomsProps } from './AdminCourtrooms';
import LocationSelector from '../../containers/LocationSelector';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import UnexpireRow from '../../components/TableColumnActions/UnexpireRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
import { ActionProps } from '../../components/TableColumnCell/Actions';
import { buildPluginPermissions } from '../permissionUtils';
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

export default class AdminCourtrooms extends FormContainerBase<AdminCourtroomsProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_PLUGIN_COURTROOMS';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        courtrooms: 'assignments.courtrooms'
    };
    title: string = ' Courtrooms';

    FormComponent = (props: FormContainerProps<AdminCourtroomsProps>) => {
        const { getPluginPermissions } = props;
        const { grantAll, permissions } = buildPluginPermissions(getPluginPermissions);

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;

        const onFilterLocation = (event: Event, newValue: any) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    courtrooms: {
                        locationId: newValue
                    }
                }, setAdminCourtroomsPluginFilters);
            }
        };

        const onFilterCourtroom = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    courtrooms: {
                        name: newValue
                    }
                }, setAdminCourtroomsPluginFilters);
            }
        };

        const onFilterCourtroomCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    courtrooms: {
                        code: newValue
                    }
                }, setAdminCourtroomsPluginFilters);
            }
        };

        const onToggleExpiredClicked = () => {
            const { setPluginFilters, pluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                const isExpired = (pluginFilters)
                    ? pluginFilters.isExpired
                    : false;

                setPluginFilters({
                    courtrooms: {
                        isExpired: isExpired || false
                    }
                }, setAdminCourtroomsPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    courtrooms: {}
                }, setAdminCourtroomsPluginFilters);
            }
        };

        const courtroomColumns = (currentLocation === 'ALL_LOCATIONS')
            ? [
                DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true, filterColumn: onFilterLocation }),
                DataTable.TextFieldColumn('Courtroom', { fieldName: 'name', displayInfo: false, filterable: true, filterColumn: onFilterCourtroom }),
                DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterCourtroomCode }),
                // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false }),
                // DataTable.DateColumn('Date Created', 'createdDtm'),
                // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),
                DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false })
            ]
            : [
                // DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true, filterColumn: onFilterLocation }),
                DataTable.TextFieldColumn('Courtroom', { fieldName: 'name', displayInfo: false, filterable: true, filterColumn: onFilterCourtroom }),
                DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterCourtroomCode }),
                // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false }),
                // DataTable.DateColumn('Date Created', 'createdDtm'),
                // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),
                DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false })
            ];

        const courtroomActions = [
            ({ fields, index, model }) => {
                return (model && !model.id || model && model.id === '')
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={true} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (<ExpireRow fields={fields} index={index} model={model} showComponent={true} onClick={() => dataTableInstance.forceUpdate()} />)
                    : (model && model.isExpired)
                    ? (<UnexpireRow fields={fields} index={index} model={model} showComponent={true} onClick={() => dataTableInstance.forceUpdate()} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={grantAll} />)
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <div className="col-sm-12">
            {/* Only use fixed if configured as a standalone page */}
            {/* <div className="fixed-filters-data-table"> */}
                <DataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={this.formFieldNames.courtrooms}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.courtrooms}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Courtroom'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    onToggleExpiredClicked={onToggleExpiredClicked}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: courtroomActions
                    })}
                    columns={courtroomColumns}
                    filterable={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    shouldMarkRowAsDeleted={(model) => {
                        return model.isExpired;
                    }}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
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

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getCourtrooms()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const courtrooms = (filters && filters.courtrooms)
            ? findAllCourtrooms(filters.courtrooms)(state) || []
            : getAllCourtrooms(state) || [];

        const currentLocation = getCurrentLocation(state);

        return {
            ...filterData,
            courtrooms,
            currentLocation
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

    mapExpiredFromFormValues(map: any) {
        const expiredCourtroomIds: IdType[] = [];

        if (map.courtrooms) {
            const initialValues = map.courtrooms.initialValues;

            const courtroomIds = initialValues
                .filter((val: any) => val.isExpired)
                .map((val: any) => val.id);

            expiredCourtroomIds.push(...courtroomIds);
        }

        return {
            courtrooms: expiredCourtroomIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToExpire: any = this.getDataToExpireFromFormValues(formValues, initialValues) || {};
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedCourtrooms: IdType[] = dataToDelete.courtrooms as IdType[];

        // Expire records before saving new ones!
        const expiredCourtrooms: IdType[] = dataToExpire.courtrooms as IdType[];

        // Grab the currentLocation off of the formValues.assignments object
        const { currentLocation } = formValues.assignments;

        let courtrooms: Partial<Courtroom>[];
        courtrooms = data.courtrooms.map((c: Partial<Courtroom>) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (!(currentLocation === 'ALL_LOCATIONS' || currentLocation === '')) {
            courtrooms = courtrooms.map((c: Partial<Courtroom>) => ({
                ...c,
                locationId: currentLocation
            }));
        }

        if (deletedCourtrooms.length > 0) {
            await dispatch(deleteCourtrooms(deletedCourtrooms));
        }

        if (expiredCourtrooms.length > 0) {
            await dispatch(expireCourtrooms(expiredCourtrooms));
        }

        if (courtrooms.length > 0) {
            await dispatch(createOrUpdateCourtrooms(courtrooms));
        }
    }
}
