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
    findAllOtherTypes
} from '../../modules/assignments/selectors';

import { RootState } from '../../store';

import { AlternateAssignment as OtherType, IdType } from '../../api';

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
                        name: newValue
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
                        isProvincialCode: newValue
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
                }, setAdminRolesPluginFilters);
            }
        };

        const assignmentTypeColumns = [
            DataTable.TextFieldColumn('Assignment Type', { fieldName: 'description', displayInfo: false, filterable: true, filterColumn: onFilterOtherType }),
            DataTable.TextFieldColumn('Code', { fieldName: 'code', displayInfo: true, filterable: true, filterColumn: onFilterOtherTypeCode }),
            DataTable.TextFieldColumn('Description', { fieldName: 'description', displayInfo: false, filterable: false }),
            // DataTable.SelectorFieldColumn('Status', { displayInfo: true, filterable: true }),
            DataTable.SelectorFieldColumn('Scope', { fieldName: 'isProvincialCode', selectorComponent: CodeScopeSelector, displayInfo: false, filterable: true, filterColumn: onFilterOtherTypeScope }),
            DataTable.SortOrderColumn('Sort Order', { fieldName: 'sortOrder', colStyle: { width: '100px' }, displayInfo: false, filterable: false })
        ];

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
                    columns={assignmentTypeColumns}
                    filterable={true}
                    expandable={false}
                    // expandedRows={[1, 2]}
                    groupBy={{ fieldName: 'isProvincialCode', groupNames: ['Default Roles', 'Custom Roles'] }}
                    shouldDisableRow={(model) => {
                        // TODO: Only disable if the user doesn't have permission to edit provincial codes
                        return (!model) ? false : (model && model.id) ? model.isProvincialCode : false;
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
        const otherTypes = (filters && filters.otherTypes)
            ? findAllOtherTypes(filters.otherTypes)(state) || []
            : getAllOtherTypes(state) || [];

        const otherTypesArray: any[] = otherTypes.map(type => {
            return Object.assign({ isProvincialCode: (type.locationId === null) ? 1 : 0 }, type);
        });

        return {
            ...filterData,
            otherTypes: otherTypesArray
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

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>): Promise<any[]> {
        const data: any = this.getDataFromFormValues(formValues, initialValues);
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedOtherTypes: IdType[] = dataToDelete.otherTypes as IdType[];

        const otherTypes: Partial<OtherType>[] = data.otherTypes.map((c: OtherType) => ({
            ...c,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        return Promise.all([
            dispatch(deleteAlternateAssignmentTypes(deletedOtherTypes)),
            dispatch(createOrUpdateAlternateAssignmentTypes(otherTypes))
        ]);
    }
}
