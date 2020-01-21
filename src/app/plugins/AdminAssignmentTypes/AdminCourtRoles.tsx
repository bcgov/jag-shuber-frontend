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
    findAllCourtRoles
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { CourtRole, IdType } from '../../api';

import {
    FormContainerBase,
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminCourtRolesProps } from './AdminCourtRoles';
import LocationSelector from '../../containers/LocationSelector';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import { setAdminRolesPluginFilters } from '../../modules/roles/actions';
// import { createOrUpdateCourtRoles } from '../../modules/assignments/actions';

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
        const { currentLocation, isLocationSet } = props;
        const loc = currentLocation;
        console.log('test current loc');
        console.log(loc);

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
                        name: newValue
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

        const onResetFilters = () => {
            const { setPluginFilters } = props;
            if (setPluginFilters) {
                // console.log('reset plugin filters');
                setPluginFilters({
                    courtRoles: {}
                }, setAdminRolesPluginFilters);
            }
        };

        return (
            <div>
            {/* Only use fixed if configured as a standalone page */}
            {/* <div className="fixed-filters-data-table"> */}
                <DataTable
                    fieldName={this.formFieldNames.courtRoles}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.courtRoles}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add Court Role'}
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: [
                            ({ fields, index, model }) => {
                                return (model && !model.id || model.id === '')
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
                        DataTable.TextFieldColumn('Court Role', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterCourtRole }),
                        DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterCourtRoleCode }),
                        // DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false }),
                        // DataTable.DateColumn('Date Created', 'createdDtm'),
                        DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),

                    ]}
                    filterable={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
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
        const courtRoles = (filters && filters.courtRoles)
            ? findAllCourtRoles(filters.courtRoles)(state) || []
            : getAllCourtRoles(state) || [];

        const courtRolesArray: any[] = courtRoles.map(role => Object.assign({ id: role.code }, role));

        return {
            ...filterData,
            courtRoles: courtRolesArray
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

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedCourtRoles: IdType[] = dataToDelete.courtRoles as IdType[];

        const courtRoles: Partial<CourtRole>[] = data.courtRoles.map((c: CourtRole) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        return Promise.all([
            dispatch(deleteCourtRoles(deletedCourtRoles)),
            dispatch(createOrUpdateCourtRoles(courtRoles))
        ]);
    }
}
