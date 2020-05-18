import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getEscortRuns as getEscortTypes,
    createOrUpdateEscortRuns as createOrUpdateEscortTypes,
    deleteEscortRuns as deleteEscortTypes,
    expireEscortRuns as expireEscortTypes,
    unexpireEscortRuns as unexpireEscortTypes,
    selectAdminEscortTypesPluginSection,
    setAdminEscortTypesPluginSubmitErrors,
    setAdminEscortTypesPluginFilters, setAdminJailRolesPluginFilters, setAdminCourtRolesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllEscortRunTypes,
    getAllEffectiveEscortRunTypes,
    findAllEscortRunTypes,
    findAllEffectiveEscortRunTypes
} from '../../modules/assignments/selectors';

import {
    currentLocation as getCurrentLocation,
} from '../../modules/user/selectors';

import { RootState } from '../../store';

import { EscortRun as EscortType, IdType, JailRoleCode } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminEscortTypesProps } from './AdminEscortTypes';
import LocationSelector from '../../containers/LocationSelector';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import UnexpireRow from '../../components/TableColumnActions/UnexpireRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
import CodeScopeSelector from '../../containers/CodeScopeSelector';
import { ActionProps } from '../../components/TableColumnCell/Actions';
import { buildPluginPermissions, userCan } from '../permissionUtils';
import * as Validators from '../../infrastructure/Validators';
// import { createOrUpdateEscortTypes } from '../../modules/assignments/actions';

export interface AdminEscortTypesProps extends FormContainerProps {
    escortTypes?: any[];
}

export interface AdminEscortTypesDisplayProps extends FormContainerProps {

}

class AdminEscortTypesDisplay extends React.PureComponent<AdminEscortTypesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
        return (
            <div />
        );
    }
}

export default class AdminEscortTypes extends FormContainerBase<AdminEscortTypesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_ESCORT_TYPES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        escortTypes: 'assignments.escortTypes'
    };
    title: string = ' Escort Runs';
    // pluginFiltersAreSet = false;
    showExpired = false;

    FormComponent = (props: FormContainerProps<AdminEscortTypesProps>) => {
        const { getPluginPermissions, setPluginFilters } = props;
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        const canManage = userCan(permissions, 'MANAGE_ALL');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;

        const onFilterLocation = (event: Event, newValue: any) => {
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        locationId: newValue
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onFilterEscortType = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        title: newValue
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onFilterEscortTypeCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        code: newValue
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onFilterEscortTypeScope = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        locationId: (parseInt(newValue, 10) !== 1) ? loc : null // TODO: This needs to be the current location ID
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onToggleExpiredClicked = () => {
            if (setPluginFilters) {
                this.showExpired = !this.showExpired;

                setPluginFilters({
                    escortTypes: {
                        isExpired: this.showExpired
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onResetFilters = () => {
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    escortTypes: {
                        locationId: undefined,
                        code: undefined,
                        title: ''
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const escortTypeColumns = (currentLocation === 'ALL_LOCATIONS')
            ? [
                // DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true, filterColumn: onFilterLocation }),
                DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false }),
                DataTable.TextFieldColumn('Type', { fieldName: 'title', displayInfo: false, filterable: true, filterColumn: onFilterEscortType, required: true }),
                DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: false, filterable: true, filterColumn: onFilterEscortTypeCode, required: true }),
                DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: true })
            ]
            : [
                DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false }),
                DataTable.TextFieldColumn('Type', { fieldName: 'title', displayInfo: false, filterable: true, filterColumn: onFilterEscortType, required: true }),
                DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: false, filterable: true, filterColumn: onFilterEscortTypeCode, required: true }),
                DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: true })
            ];

        const escortTypeActions = [
            ({ fields, index, model }) => {
                return (model && !model.id || model && model.id === '')
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (<ExpireRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage)} onClick={() => dataTableInstance.forceUpdate()} />)
                    : (model && model.isExpired)
                    ? (<UnexpireRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage)} onClick={() => dataTableInstance.forceUpdate()} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <div>
            {/* Only use fixed if configured as a standalone page */}
            {/* <div className="fixed-filters-data-table"> */}
                <DataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={this.formFieldNames.escortTypes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.escortTypes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Escort Runs'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    onToggleExpiredClicked={onToggleExpiredClicked}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: escortTypeActions
                    })}
                    columns={escortTypeColumns}
                    filterable={true}
                    showExpiredFilter={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    groupBy={{
                        groupByKey: 'isProvincialCode',
                        valueMapLabels: {
                            0: {
                                label: 'Custom Roles',
                                style: {
                                    width: '3rem',
                                    backgroundColor: '#327AB7',
                                    color: 'white',
                                    border: '1px solid #327AB7'
                                }
                            },
                            1: {
                                label: 'Default Roles',
                                style: {
                                    width: '3rem',
                                    backgroundColor: '#999',
                                    color: 'white',
                                    border: '1px solid #999'
                                }
                            }
                        }
                    }}
                    shouldMarkRowAsDeleted={(model) => {
                        return model.isExpired;
                    }}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminEscortTypesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminEscortTypesDisplay {...props} />DATA
        </div>
    )

    validate(values: AdminEscortTypesProps = {}): FormErrors | undefined {
        let errors: any = {};

        const formKeys = Object.keys(this.formFieldNames);

        if (formKeys) {
            formKeys.forEach((key) => {
                if (!values[key]) return;
                errors[key] = values[key].map((row: any) => (
                    {
                        title: Validators.validateWith(
                            Validators.required
                        )(row.title),
                        /* code: Validators.validateWith(
                            Validators.required
                        )(row.code) */
                    }
                ));
            });
        }

        return (errors && Object.keys(errors).length > 0) ? errors : undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getEscortTypes()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        /* const escortTypes = (filters && filters.escortTypes !== undefined)
            ? findAllEffectiveEscortRunTypes(filters.escortTypes)(state) || []
            : getAllEffectiveEscortRunTypes(state) || []; */
        const escortTypes = (filters && filters.escortTypes !== undefined)
            ? findAllEscortRunTypes(filters.escortTypes)(state) || []
            : getAllEffectiveEscortRunTypes(state) || [];

        const escortTypesArray: any[] = escortTypes.map((type: any) => {
            return Object.assign({ isProvincialCode: (type.locationId === null) ? 1 : 0 }, type);
        });

        const currentLocation = getCurrentLocation(state);

        return {
            ...filterData,
            escortTypes: escortTypesArray,
            currentLocation
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedEscortTypeIds: IdType[] = [];

        if (map.escortTypes) {
            const initialValues = map.escortTypes.initialValues;
            const existingIds = map.escortTypes.values.map((val: any) => val.id);

            const removeEscortTypeIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedEscortTypeIds.push(...removeEscortTypeIds);
        }

        return {
            escortTypes: deletedEscortTypeIds
        };
    }

    mapExpiredFromFormValues(map: any, isExpired?: boolean) {
        isExpired = isExpired || false;
        const expiredEscortTypeIds: IdType[] = [];

        if (map.escortTypes) {
            const values = map.escortTypes.values;

            const escortTypeIds = values
                .filter((val: any) => val.isExpired === isExpired)
                .map((val: any) => val.id);

            expiredEscortTypeIds.push(...escortTypeIds);
        }

        return {
            escortTypes: expiredEscortTypeIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToExpire: any = this.getDataToExpireFromFormValues(formValues, initialValues, true) || {};
        const dataToUnexpire: any = this.getDataToExpireFromFormValues(formValues, initialValues, false) || {};
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Grab the currentLocation off of the formValues.assignments object
        const { currentLocation } = formValues.assignments;

        // Delete records before saving new ones!
        const deletedEscortTypes: IdType[] = dataToDelete.escortTypes as IdType[];

        // Expire records before saving new ones!
        const expiredEscortTypes: IdType[] = dataToExpire.escortTypes as IdType[];
        const unexpiredEscortTypes: IdType[] = dataToUnexpire.escortTypes as IdType[];

        let escortTypes: Partial<EscortType>[];
        escortTypes = data.escortTypes.map((c: Partial<EscortType>) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (!(currentLocation === 'ALL_LOCATIONS' || currentLocation === '')) {
            escortTypes = escortTypes.map((c: Partial<EscortType>) => {
                const isNewRow = !c.id;
                if (isNewRow) {
                    const locationId = (c.isProvincialCode !== '1') ? currentLocation : null;
                    return { ...c, locationId: locationId };
                } else {
                    return { ...c };
                }
            });
        }

        if (deletedEscortTypes.length > 0) {
            await dispatch(deleteEscortTypes(deletedEscortTypes));
        }

        if (expiredEscortTypes.length > 0) {
            await dispatch(expireEscortTypes(expiredEscortTypes));
        }

        if (unexpiredEscortTypes.length > 0) {
            await dispatch(unexpireEscortTypes(unexpiredEscortTypes));
        }

        if (escortTypes.length > 0) {
            await dispatch(createOrUpdateEscortTypes(escortTypes));
        }
    }
}
