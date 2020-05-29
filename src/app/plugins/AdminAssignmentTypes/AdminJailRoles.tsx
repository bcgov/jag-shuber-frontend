import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getJailRoles,
    createOrUpdateJailRoles,
    deleteJailRoles,
    expireJailRoles,
    unexpireJailRoles,
    selectAdminJailRolesPluginSection,
    setAdminJailRolesPluginSubmitErrors,
    setAdminJailRolesPluginFilters, setAdminCourtRolesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllJailRoles,
    getAllEffectiveJailRoles,
    findAllJailRoles,
    findAllEffectiveJailRoles
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { JailRoleCode, IdType, CourtRoleCode } from '../../api';

import {
    FormContainerBase,
    FormContainerProps, FormValuesDiff,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminJailRolesProps } from './AdminJailRoles';
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
// import { createOrUpdateJailRoles } from '../../modules/assignments/actions';

export interface AdminJailRolesProps extends FormContainerProps {
    jailRoles?: any[];
}

export interface AdminJailRolesDisplayProps extends FormContainerProps {}

class AdminJailRolesDisplay extends React.PureComponent<AdminJailRolesDisplayProps, any> {
    render() {
        return (
            <div />
        );
    }
}

export default class AdminJailRoles extends FormContainerBase<AdminJailRolesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_JAIL_ROLES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        jailRoles: 'assignments.jailRoles'
    };
    title: string = ' Jail Roles';
    // pluginFiltersAreSet = false;
    showExpired = false;

    FormComponent = (props: FormContainerProps<AdminJailRolesProps>) => {
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
                    jailRoles: {
                        locationId: newValue
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onFilterJailRole = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        description: newValue
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onFilterJailRoleCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        code: newValue
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onFilterJailRoleScope = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        locationId: (parseInt(newValue, 10) !== 1) ? loc : null
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onToggleExpiredClicked = () => {
            if (setPluginFilters) {
                this.showExpired = !this.showExpired;

                setPluginFilters({
                    jailRoles: {
                        isExpired: this.showExpired
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        locationId: undefined,
                        code: '',
                        description: ''
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const jailRoleActions = [
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
                    fieldName={this.formFieldNames.jailRoles}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.jailRoles}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Jail Role'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    onToggleExpiredClicked={onToggleExpiredClicked}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: jailRoleActions,
                        trace: `[${this.name}] FormComponent -> DataTable` // Just for debugging
                    })}
                    columns={[
                        DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false }),
                        DataTable.TextFieldColumn('Type', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterJailRole, required: true }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterJailRoleCode, required: true }),
                        DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: true, filterColumn: onFilterJailRoleScope })
                    ]}
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

    DisplayComponent = (props: FormContainerProps<AdminJailRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminJailRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminJailRolesProps = {}): FormErrors | undefined {
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
        dispatch(getJailRoles()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        /* const jailRoles = (filters && filters.jailRoles !== undefined)
            ? findAllEffectiveJailRoles(filters.jailRoles)(state) || []
            : getAllEffectiveJailRoles(state) || []; */
        const jailRoles = (filters && filters.jailRoles !== undefined)
            ? findAllJailRoles(filters.jailRoles)(state) || []
            : getAllEffectiveJailRoles(state) || [];

        const jailRolesArray: any[] = jailRoles.map((role: any) => {
            return Object.assign({ isProvincialCode: (role.locationId === null) ? 1 : 0 }, role);
        });

        const currentLocation = getCurrentLocation(state);

        return {
            ...filterData,
            jailRoles: jailRolesArray,
            currentLocation
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: FormValuesDiff = this.getDataFromFormValues(formValues, initialValues) as FormValuesDiff;

        // Grab the currentLocation off of the formValues.assignments object
        const { currentLocation } = formValues.assignments;

        const deletedJailRoles: IdType[] = data.jailRoles.deletedIds as IdType[];
        const expiredJailRoles: IdType[] = data.jailRoles.expiredIds as IdType[];
        const unexpiredJailRoles: IdType[] = data.jailRoles.unexpiredIds as IdType[];

        let jailRoles: Partial<JailRoleCode>[] = [
            ...data.jailRoles.added,
            ...data.jailRoles.updated
        ].map((c: Partial<JailRoleCode>) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (!(currentLocation === 'ALL_LOCATIONS' || currentLocation === '')) {
            jailRoles = jailRoles.map((c: Partial<JailRoleCode>) => {
                const isNewRow = !c.id;
                if (isNewRow) {
                    const locationId = (c.isProvincialCode !== '1') ? currentLocation : null;
                    return { ...c, locationId: locationId };
                } else {
                    return { ...c };
                }
            });
        }

        if (deletedJailRoles.length > 0) {
            await dispatch(deleteJailRoles(deletedJailRoles));
        }

        if (expiredJailRoles.length > 0) {
            await dispatch(expireJailRoles(expiredJailRoles));
        }

        if (unexpiredJailRoles.length > 0) {
            await dispatch(unexpireJailRoles(unexpiredJailRoles));
        }

        if (jailRoles.length > 0) {
            await dispatch(createOrUpdateJailRoles(jailRoles));
        }
    }
}
