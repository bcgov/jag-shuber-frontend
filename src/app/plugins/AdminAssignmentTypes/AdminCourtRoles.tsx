import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getCourtRoles,
    createOrUpdateCourtRoles,
    deleteCourtRoles,
    selectAdminCourtRolesPluginSection,
    setAdminCourtRolesPluginSubmitErrors,
    setAdminCourtRolesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllCourtRoles,
    getAllEffectiveCourtRoles,
    findAllCourtRoles,
    findAllEffectiveCourtRoles
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { CourtRoleCode, IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminCourtRolesProps } from './AdminCourtRoles';

import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';

import CodeScopeSelector from '../../containers/CodeScopeSelector';
import { currentLocation as getCurrentLocation } from '../../modules/user/selectors';
import { ActionProps } from '../../components/TableColumnCell/Actions';

export interface AdminCourtRolesProps extends FormContainerProps {
    courtRoles?: any[];
}

export interface AdminCourtRolesDisplayProps extends FormContainerProps {

}

class AdminCourtRolesDisplay extends React.PureComponent<AdminCourtRolesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
        return (
            <div />
        );
    }
}

export default class AdminCourtRoles extends FormContainerBase<AdminCourtRolesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_PLUGIN_COURT_ROLES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        courtRoles: 'assignments.courtRoles'
    };
    title: string = ' Court Roles';

    FormComponent = (props: FormContainerProps<AdminCourtRolesProps>) => {
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
                    courtRoles: {
                        locationId: newValue
                    }
                }, setAdminCourtRolesPluginFilters);
            }
        };

        const onFilterCourtRole = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    courtRoles: {
                        description: newValue
                    }
                }, setAdminCourtRolesPluginFilters);
            }
        };

        const onFilterCourtRoleCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    courtRoles: {
                        code: newValue
                    }
                }, setAdminCourtRolesPluginFilters);
            }
        };

        const onFilterCourtRoleScope = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    courtRoles: {
                        locationId: (parseInt(newValue, 10) === 1) ? null : null // TODO: This needs to be the current location ID
                    }
                }, setAdminCourtRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    courtRoles: {}
                }, setAdminCourtRolesPluginFilters);
            }
        };

        const courtRoleActions = [
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
                    fieldName={this.formFieldNames.courtRoles}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.courtRoles}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Court Role'}
                    // TODO: Only display if the user has appropriate permissions
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: courtRoleActions
                    })}
                    columns={[
                        // DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true, filterColumn: onFilterLocation }),
                        DataTable.TextFieldColumn('Type', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterCourtRole }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterCourtRoleCode }),
                        // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),
                        DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, filterSelectorComponent: CodeScopeSelector, displayInfo: false, filterable: true, filterColumn: onFilterCourtRoleScope }),
                        DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false }),
                    ]}
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
                    // TODO: Only display if the user has appropriate permissions
                    shouldDisableRow={(model) => {
                        // TODO: Only disable if the user doesn't have permission to edit provincial codes
                        // return (!model) ? false : (model && model.id) ? model.isProvincialCode : false;
                        return false;
                    }}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminCourtRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminCourtRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminCourtRolesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getCourtRoles()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const courtRoles = (filters && filters.courtRoles !== undefined)
            ? findAllEffectiveCourtRoles(filters.courtRoles)(state) || []
            : getAllEffectiveCourtRoles(state) || [];

        const courtRolesArray: any[] = courtRoles.map((role: any) => {
            return Object.assign({ isProvincialCode: (role.locationId === null) ? 1 : 0 }, role);
        });

        const currentLocation = getCurrentLocation(state);

        return {
            ...filterData,
            courtRoles: courtRolesArray,
            currentLocation
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedCourtRoleIds: IdType[] = [];

        if (map.courtRoles) {
            const initialValues = map.courtRoles.initialValues;
            const existingIds = map.courtRoles.values.map((val: any) => val.id);

            const removeCourtRoleIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedCourtRoleIds.push(...removeCourtRoleIds);
        }

        return {
            courtRoles: deletedCourtRoleIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Grab the currentLocation off of the formValues.assignments object
        const { currentLocation } = formValues.assignments;

        // Delete records before saving new ones!
        const deletedCourtRoles: IdType[] = dataToDelete.courtRoles as IdType[];

        let courtRoles: Partial<CourtRoleCode>[];
        courtRoles = data.courtRoles.map((c: Partial<CourtRoleCode>) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (!(currentLocation === 'ALL_LOCATIONS' || currentLocation === '')) {
            courtRoles = courtRoles.map((c: Partial<CourtRoleCode>) => {
                const isNewRow = !c.id;
                if (isNewRow) {
                    const locationId = (c.isProvincialCode !== '1') ? currentLocation : null;
                    return { ...c, locationId: locationId };
                } else {
                    return { ...c };
                }
            });
        }

        if (deletedCourtRoles.length > 0) {
            await dispatch(deleteCourtRoles(deletedCourtRoles));
        }

        if (courtRoles.length > 0) {
            await dispatch(createOrUpdateCourtRoles(courtRoles));
        }
    }
}
