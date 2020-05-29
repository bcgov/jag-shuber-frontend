import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getAlternateAssignmentTypes,
    createOrUpdateAlternateAssignmentTypes,
    deleteAlternateAssignmentTypes,
    expireAlternateAssignmentTypes,
    unexpireAlternateAssignmentTypes,
    selectAdminOtherTypesPluginSection,
    setAdminOtherTypesPluginSubmitErrors,
    setAdminOtherTypesPluginFilters, setAdminCourtRolesPluginFilters, setAdminCourtroomsPluginFilters
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
    FormContainerProps, FormValuesDiff,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminOtherTypesProps } from './AdminOtherTypes';
import LocationSelector from '../../containers/LocationSelector';
import RemoveRow from '../../components/Table/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/Table/TableColumnActions/ExpireRow';
import UnexpireRow from '../../components/Table/TableColumnActions/UnexpireRow';
import DeleteRow from '../../components/Table/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
import CodeScopeSelector from '../../containers/CodeScopeSelector';
import { currentLocation as getCurrentLocation } from '../../modules/user/selectors';
import { ActionProps } from '../../components/Table/TableColumnCell/Actions';
import { buildPluginPermissions, userCan } from '../permissionUtils';
import * as Validators from '../../infrastructure/Validators';
// import { createOrUpdateAlternateAssignmentTypes } from '../../modules/assignments/actions';

export interface AdminOtherTypesProps extends FormContainerProps {
    otherTypes?: any[];
}

export interface AdminOtherTypesDisplayProps extends FormContainerProps {}

class AdminOtherTypesDisplay extends React.PureComponent<AdminOtherTypesDisplayProps, any> {
    render() {
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
    name = 'ADMIN_OTHER_TYPES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        otherTypes: 'assignments.otherTypes'
    };
    title: string = ' Other Assignments';
    // pluginFiltersAreSet = false;
    showExpired = false;

    FormComponent = (props: FormContainerProps<AdminOtherTypesProps>) => {
        const { getPluginPermissions, setPluginFilters } = props;
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        const canManage = userCan(permissions, 'MANAGE_ALL');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;

        const onFilterLocation = (event: Event, newValue: any) => {
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        locationId: newValue
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onFilterOtherType = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        description: newValue
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onFilterOtherTypeCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        code: newValue
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onFilterOtherTypeScope = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        locationId: (parseInt(newValue, 10) !== 1) ? loc : null
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onToggleExpiredClicked = () => {
            if (setPluginFilters) {
                this.showExpired = !this.showExpired;

                setPluginFilters({
                    otherTypes: {
                        isExpired: this.showExpired
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const onResetFilters = () => {
            if (setPluginFilters) {
                setPluginFilters({
                    otherTypes: {
                        locationId: undefined,
                        code: '',
                        description: ''
                    }
                }, setAdminOtherTypesPluginFilters);
            }
        };

        const assignmentTypeColumns = [
            DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false }),
            DataTable.TextFieldColumn('Assignment Type', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterOtherType, required: true }),
            DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterOtherTypeCode, required: true }),
            DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: true, filterColumn: onFilterOtherTypeScope })
        ];

        const otherTypeActions = [
            ({ fields, index, model }) => {
                return (model && !model.id || model && model.id === '')
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (<ExpireRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage)} onClick={() => dataTableInstance && dataTableInstance.component && dataTableInstance.component.forceUpdate()} />)
                    : (model && model.isExpired)
                    ? (<UnexpireRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage)} onClick={() => dataTableInstance && dataTableInstance.component && dataTableInstance.component.forceUpdate()} />)
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
                    fieldName={this.formFieldNames.otherTypes}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.otherTypes}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Assignment Type'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    onToggleExpiredClicked={onToggleExpiredClicked}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: otherTypeActions,
                        trace: `[${this.name}] FormComponent -> DataTable` // Just for debugging
                    })}
                    columns={assignmentTypeColumns}
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
                    shouldDisableRow={(model) => {
                        // TODO: Only disable if the user doesn't have permission to edit provincial codes
                        return false;
                        // return (!model) ? false : (model && model.id) ? model.isProvincialCode : false;
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

    DisplayComponent = (props: FormContainerProps<AdminOtherTypesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminOtherTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminOtherTypesProps = {}): FormErrors | undefined {
        let errors: any = {};

        const formKeys = Object.keys(this.formFieldNames);

        if (formKeys) {
            formKeys.forEach((key) => {
                if (!values[key]) return;
                errors[key] = values[key].map((row: any) => (
                    {
                        description: Validators.validateWith(
                            Validators.required
                        )(row.description),
                        code: Validators.validateWith(
                            Validators.required
                        )(row.code)
                    }
                ));
            });
        }

        return (errors && Object.keys(errors).length > 0) ? errors : undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getAlternateAssignmentTypes()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        /* const otherTypes = (filters && filters.otherTypes !== undefined)
            ? findAllEffectiveOtherTypes(filters.otherTypes)(state) || []
            : getAllEffectiveOtherTypes(state) || []; */
        const otherTypes = (filters && filters.otherTypes !== undefined)
            ? findAllOtherTypes(filters.otherTypes)(state) || []
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

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: FormValuesDiff = this.getDataFromFormValues(formValues, initialValues) as FormValuesDiff;

        // Grab the currentLocation off of the formValues.assignments object
        const { currentLocation } = formValues.assignments;

        const deletedOtherTypes: IdType[] = data.otherTypes.deletedIds as IdType[];
        const expiredOtherTypes: IdType[] = data.otherTypes.expiredIds as IdType[];
        const unexpiredOtherTypes: IdType[] = data.otherTypes.unexpiredIds as IdType[];

        let otherTypes: Partial<OtherType>[] = [
            ...data.otherTypes.added,
            ...data.otherTypes.updated
        ].map((c: Partial<OtherType>) => ({
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

        if (expiredOtherTypes.length > 0) {
            await dispatch(expireAlternateAssignmentTypes(expiredOtherTypes));
        }

        if (unexpiredOtherTypes.length > 0) {
            await dispatch(unexpireAlternateAssignmentTypes(unexpiredOtherTypes));
        }

        if (otherTypes.length > 0) {
            await dispatch(createOrUpdateAlternateAssignmentTypes(otherTypes));
        }
    }
}
