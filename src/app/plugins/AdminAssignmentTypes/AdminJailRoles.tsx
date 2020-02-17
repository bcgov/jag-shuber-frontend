import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import {
    getJailRoles,
    createOrUpdateJailRoles,
    deleteJailRoles,
    selectAdminJailRolesPluginSection,
    setAdminJailRolesPluginSubmitErrors,
    setAdminJailRolesPluginFilters
} from '../../modules/assignments/actions';

import {
    getAllJailRoles,
    findAllJailRoles
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { JailRoleCode, IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminJailRolesProps } from './AdminJailRoles';
import LocationSelector from '../../containers/LocationSelector';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
import CodeScopeSelector from '../../containers/CodeScopeSelector';
// import { createOrUpdateJailRoles } from '../../modules/assignments/actions';

export interface AdminJailRolesProps extends FormContainerProps {
    jailRoles?: any[];
}

export interface AdminJailRolesDisplayProps extends FormContainerProps {

}

class AdminJailRolesDisplay extends React.PureComponent<AdminJailRolesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;
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
    name = 'ADMIN_PLUGIN_JAIL_ROLES';
    // END NOTICE
    reduxFormKey = 'assignments';
    formFieldNames = {
        jailRoles: 'assignments.jailRoles'
    };
    title: string = ' Jail Roles';

    FormComponent = (props: FormContainerProps<AdminJailRolesProps>) => {
        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;

        const onFilterLocation = (event: Event, newValue: any) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        locationId: newValue
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onFilterJailRole = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        name: newValue
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onFilterJailRoleCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                setPluginFilters({
                    jailRoles: {
                        code: newValue
                    }
                }, setAdminJailRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    jailRoless: {}
                }, setAdminRolesPluginFilters);
            }
        };

        return (
            <div>
            {/* Only use fixed if configured as a standalone page */}
            {/* <div className="fixed-filters-data-table"> */}
                <DataTable
                    fieldName={this.formFieldNames.jailRoles}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.jailRoles}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Jail Role'}
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
                    columns={[
                        // DataTable.SelectorFieldColumn('Location', { fieldName: 'locationId', selectorComponent: LocationSelector, displayInfo: false, filterable: true, filterColumn: onFilterLocation }),
                        DataTable.TextFieldColumn('Jail Role', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterJailRole }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterJailRoleCode }),
                        // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),
                        DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, displayInfo: false, filterable: false })

                    ]}
                    filterable={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    rowComponent={EmptyDetailRow}
                    modalComponent={EmptyDetailRow}
                    shouldDisableRow={(model) => {
                        // TODO: Only disable if the user doesn't have permission to edit provincial codes
                        return (!model) ? false : (model && model.id) ? model.isProvincialCode : false;
                    }}
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
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getJailRoles()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const jailRoles = (filters && filters.jailRoles)
            ? findAllJailRoles(filters.jailRoles)(state) || []
            : getAllJailRoles(state) || [];

        const jailRolesArray: any[] = jailRoles.map(role => {
            return Object.assign({ isProvincialCode: (role.locationId === null) ? 1 : 0 }, role);
        });

        return {
            ...filterData,
            jailRoles: jailRolesArray
        };
    }

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedJailRoleIds: IdType[] = [];

        if (map.jailRoles) {
            const initialValues = map.jailRoles.initialValues;
            const existingIds = map.jailRoles.values.map((val: any) => val.id);

            const removeJailRoleIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedJailRoleIds.push(...removeJailRoleIds);
        }

        return {
            jailRoles: deletedJailRoleIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedJailRoles: IdType[] = dataToDelete.jailRoles as IdType[];

        const jailRoles: Partial<JailRoleCode>[] = data.jailRoles.map((c: JailRoleCode) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        return Promise.all([
            dispatch(deleteJailRoles(deletedJailRoles)),
            dispatch(createOrUpdateJailRoles(jailRoles))
        ]);
    }
}
