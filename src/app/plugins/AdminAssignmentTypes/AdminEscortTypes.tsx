import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getEscortRuns as getEscortTypes,
    createOrUpdateEscortRuns as createOrUpdateEscortTypes,
    deleteEscortRuns as deleteEscortTypes,
    selectAdminEscortTypesPluginSection,
    setAdminEscortTypesPluginSubmitErrors,
    setAdminEscortTypesPluginFilters, setAdminJailRolesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllEscortRunTypes,
    findAllEscortRunTypes
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
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
import CodeScopeSelector from '../../containers/CodeScopeSelector';
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
    name = 'ADMIN_PLUGIN_ESCORT_TYPES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        escortTypes: 'assignments.escortTypes'
    };
    title: string = ' Escort Runs';

    FormComponent = (props: FormContainerProps<AdminEscortTypesProps>) => {
        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;

        const onFilterLocation = (event: Event, newValue: any) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        locationId: newValue
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onFilterEscortType = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        name: newValue
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onFilterEscortTypeCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        code: newValue
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onFilterEscortTypeScope = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    escortTypes: {
                        locationId: (parseInt(newValue, 10) === 1) ? null : null // TODO: This needs to be the current location ID
                    }
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    escortTypes: {}
                }, setAdminEscortTypesPluginFilters);
            }
        };

        const escortTypeColumns = (currentLocation === 'ALL_LOCATIONS')
            ? [
                DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true, filterColumn: onFilterLocation }),
                DataTable.TextFieldColumn('Run Name', { fieldName: 'title', displayInfo: false, filterable: true, filterColumn: onFilterEscortType }),
                // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false, filterable: false }),
                // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true })
                DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, displayInfo: false, filterable: false }),
                DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false })
            ]
            : [
                DataTable.TextFieldColumn('Run Name', { fieldName: 'title', displayInfo: false, filterable: true, filterColumn: onFilterEscortTypeScope }),
                // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false, filterable: false }),
                // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true })
                DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: false }),
                DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false })
            ];

        return (
            <div>
            {/* Only use fixed if configured as a standalone page */}
            {/* <div className="fixed-filters-data-table"> */}
                <DataTable
                    fieldName={this.formFieldNames.escortTypes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.escortTypes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Escort Runs'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: [
                            ({ fields, index, model }) => {
                                return (model && !model.id || model && model.id === '')
                                    ? (<RemoveRow fields={fields} index={index} model={model} />)
                                    : null;
                            },
                            ({ fields, index, model }) => {
                                return (model && model.id && model.id !== '')
                                    ? (<ExpireRow fields={fields} index={index} model={model} />)
                                    : null;
                            },
                            ({ fields, index, model }) => {
                                return (model && model.id && model.id !== '')
                                    ? (<DeleteRow fields={fields} index={index} model={model} />)
                                    : null;
                            }
                        ]
                    })}
                    columns={escortTypeColumns}
                    filterable={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    groupBy={{
                        groupByKey: 'isProvincialCode',
                        valueMapLabels: { 0: 'Custom Roles', 1: 'Default Roles' },
                        valueMapLabelStyles: {
                            0: {
                                width: '3rem',
                                backgroundColor: '#327AB7',
                                color: 'white',
                                border: '1px solid #327AB7'
                            },
                            1: {
                                width: '3rem',
                                backgroundColor: '#999',
                                color: 'white',
                                border: '1px solid #999'
                            }
                        }
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
            <AdminEscortTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminEscortTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getEscortTypes()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const escortTypes = (filters && filters.escortTypes !== undefined)
            ? findAllEscortRunTypes(filters.escortTypes)(state) || []
            : getAllEscortRunTypes(state) || [];

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

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Grab the currentLocation off of the root formValues object
        const { currentLocation } = formValues;

        // Delete records before saving new ones!
        const deletedEscortTypes: IdType[] = dataToDelete.escortTypes as IdType[];

        let escortTypes: Partial<EscortType>[];
        escortTypes = data.escortTypes.map((c: Partial<EscortType>) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (!(currentLocation === 'ALL_LOCATIONS' || currentLocation === '')) {
            escortTypes = escortTypes.map((c: Partial<EscortType>) => ({
                ...c,
                locationId: (!c.id && c.isProvincialCode === '1') ? null : currentLocation
            }));
        }

        return Promise.all([
            dispatch(deleteEscortTypes(deletedEscortTypes)),
            dispatch(createOrUpdateEscortTypes(escortTypes))
        ]);
    }
}
