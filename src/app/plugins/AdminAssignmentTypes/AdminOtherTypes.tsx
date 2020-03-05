import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getAlternateAssignmentTypes,
    createOrUpdateAlternateAssignmentTypes,
    deleteAlternateAssignmentTypes,
    selectAdminOtherTypesPluginSection,
    setAdminOtherTypesPluginSubmitErrors,
    setAdminOtherTypesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllOtherTypes,
    getAllEffectiveOtherTypes,
    findAllOtherTypes,
    findAllEffectiveOtherTypes
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { AlternateAssignment as OtherType, IdType, JailRoleCode } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminOtherTypesProps } from './AdminOtherTypes';
import LocationSelector from '../../containers/LocationSelector';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
import CodeScopeSelector from '../../containers/CodeScopeSelector';
import { currentLocation as getCurrentLocation } from '../../modules/user/selectors';
import { ActionProps } from '../../components/TableColumnCell/Actions';
// import { createOrUpdateAlternateAssignmentTypes } from '../../modules/assignments/actions';

export interface AdminOtherTypesProps extends FormContainerProps {
    otherTypes?: any[];
}

export interface AdminOtherTypesDisplayProps extends FormContainerProps {

}

class AdminOtherTypesDisplay extends React.PureComponent<AdminOtherTypesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
        return (
            <div />
        );
    }
}

export default class AdminOtherTypes extends FormContainerBase<AdminOtherTypesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_PLUGIN_OTHER_TYPES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        otherTypes: 'assignments.otherTypes'
    };
    title: string = ' Other Assignments';

    FormComponent = (props: FormContainerProps<AdminOtherTypesProps>) => {
        const { getPluginPermissions } = props;
        let grantAll = false;
        const formPermissions = (getPluginPermissions)
            ? getPluginPermissions()
            : [];

        grantAll = formPermissions === true;

        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;

        const onFilterLocation = (event: Event, newValue: any) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        locationId: newValue
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onFilterOtherType = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        description: newValue
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onFilterOtherTypeCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        code: newValue
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onFilterOtherTypeScope = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        locationId: (parseInt(newValue, 10) === 1) ? null : null // TODO: This needs to be the current location ID
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    otherTypess: {}
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const assignmentTypeColumns = [
            DataTable.TextFieldColumn('Assignment Type', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterOtherType }),
            DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterOtherTypeCode }),
            DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: true, filterColumn: onFilterOtherTypeScope }),
            // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),
            DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false })
        ];

        const otherTypeActions = [
            ({ fields, index, model }) => {
                return (model && !model.id || model && model.id === '')
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={true} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<ExpireRow fields={fields} index={index} model={model} showComponent={true} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={grantAll} />)
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <div>
            {/* Only use fixed if configured as a standalone page */}
            {/* <div className="fixed-filters-data-table"> */}
                <DataTable
                    fieldName={this.formFieldNames.otherTypes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.otherTypes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Assignment Type'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: otherTypeActions
                    })}
                    columns={assignmentTypeColumns}
                    filterable={true}
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
                    shouldDisableRow={(model) => {
                        // TODO: Only disable if the user doesn't have permission to edit provincial codes
                        return false;
                        // return (!model) ? false : (model && model.id) ? model.isProvincialCode : false;
                    }}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminOtherTypesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminOtherTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminOtherTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getAlternateAssignmentTypes()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const otherTypes = (filters && filters.otherTypes !== undefined)
            ? findAllEffectiveOtherTypes(filters.otherTypes)(state) || []
            : getAllEffectiveOtherTypes(state) || [];

        const otherTypesArray: any[] = otherTypes.map((type: any) => {
            return Object.assign({ isProvincialCode: (type.locationId === null) ? 1 : 0 }, type);
        });

        const currentLocation = getCurrentLocation(state);

        return {
            ...filterData,
            otherTypes: otherTypesArray,
            currentLocation
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedOtherTypeIds: IdType[] = [];

        if (map.otherTypes) {
            const initialValues = map.otherTypes.initialValues;
            const existingIds = map.otherTypes.values.map((val: any) => val.id);

            const removeOtherTypeIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedOtherTypeIds.push(...removeOtherTypeIds);
        }

        return {
            otherTypes: deletedOtherTypeIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Grab the currentLocation off of the formValues.assignments object
        const { currentLocation } = formValues.assignments;

        // Delete records before saving new ones!
        const deletedOtherTypes: IdType[] = dataToDelete.otherTypes as IdType[];

        let otherTypes: Partial<OtherType>[];
        otherTypes = data.otherTypes.map((c: Partial<OtherType>) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (!(currentLocation === 'ALL_LOCATIONS' || currentLocation === '')) {
            otherTypes = otherTypes.map((c: Partial<OtherType>) => {
                const isNewRow = !c.id;
                if (isNewRow) {
                    const locationId = (c.isProvincialCode !== '1') ? currentLocation : null;
                    return { ...c, locationId: locationId };
                } else {
                    return { ...c };
                }
            });
        }

        if (deletedOtherTypes.length > 0) {
            await dispatch(deleteAlternateAssignmentTypes(deletedOtherTypes));
        }

        if (otherTypes.length > 0) {
            await dispatch(createOrUpdateAlternateAssignmentTypes(otherTypes));
        }
    }
}
