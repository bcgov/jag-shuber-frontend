import React from 'react';

import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

import { RootState } from '../../store';

import {
    getLeaveSubCodes,
    createOrUpdateLeaveSubCodes,
    deleteLeaveSubCodes,
    expireLeaveSubCodes,
    unexpireLeaveSubCodes,
    setAdminTrainingTypesPluginFilters
} from '../../modules/leaves/actions';

import {
    getAllTrainingLeaveSubCodes,
    getAllEffectiveTrainingLeaveSubCodes,
    findAllTrainingLeaveSubCodes
} from '../../modules/leaves/selectors';

import { IdType, LeaveSubCode } from '../../api';

import {
    FormContainerBase,
    FormContainerProps, FormValuesDiff,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import { AdminTrainingTypesProps } from './AdminTrainingTypes';
import DeleteRow from '../../components/Table/TableColumnActions/DeleteRow';
import ExpireRow from '../../components/Table/TableColumnActions/ExpireRow';
import RemoveRow from '../../components/Table/TableColumnActions/RemoveRow';
import UnexpireRow from '../../components/Table/TableColumnActions/UnexpireRow';

import { ActionProps } from '../../components/Table/TableColumnCell/Actions';

import { buildPluginPermissions, userCan } from '../permissionUtils';

export interface AdminTrainingTypesProps extends FormContainerProps {
    leaveTypes?: any[];
    trainingLeaveTypes?: any[];
}

export interface AdminTrainingTypesDisplayProps extends FormContainerProps {}

class AdminTrainingTypesDisplay extends React.PureComponent<AdminTrainingTypesDisplayProps, any> {
    render() {
        return (
            <div />
        );
    }
}

export default class AdminTrainingTypes extends FormContainerBase<AdminTrainingTypesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_TRAINING_TYPES';
    // END NOTICE
    reduxFormKey = 'leaves';
    formFieldNames = {
        trainingLeaveTypes: 'leaves.trainingLeaveTypes'
    };
    title: string = ' Training Leave Types';
    // pluginFiltersAreSet = false;
    showExpired = false;

    FormComponent = (props: FormContainerProps<AdminTrainingTypesProps>) => {
        const { getPluginPermissions, setPluginFilters } = props;
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        const canManage = userCan(permissions, 'MANAGE_ALL');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onFilterSubCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    trainingLeaveTypes: {
                        description: newValue
                    }
                }, setAdminTrainingTypesPluginFilters);
            }
        };

        const onFilterSubCodeCode = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    trainingLeaveTypes: {
                        subCode: newValue
                    }
                }, setAdminTrainingTypesPluginFilters);
            }
        };

        /* const onFilterEffectiveDate = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    leaves: {
                        effectiveDate: newValue
                    }
                }, setAdminTrainingTypesPluginFilters;
            }
        };

        const onFilterExpiryDate = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    leaves: {
                        expiryDate: newValue
                    }
                }, setAdminTrainingTypesPluginFilters);
            }
        }; */

        const onToggleExpiredClicked = () => {
            if (setPluginFilters) {
                this.showExpired = !this.showExpired;

                setPluginFilters({
                    trainingLeaveTypes: {
                        isExpired: this.showExpired
                    }
                }, setAdminTrainingTypesPluginFilters);
            }
        };

        const onResetFilters = () => {
            if (setPluginFilters) {
                setPluginFilters({
                    trainingLeaveTypes: {
                        subCode: '',
                        description: ''
                    }
                }, setAdminTrainingTypesPluginFilters);
            }
        };

        const trainingTypeActions = [
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
                <DataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={this.formFieldNames.trainingLeaveTypes}
                    filterFieldName={(this.filterFieldNames)
                        ? `${this.filterFieldNames.trainingLeaveTypes}` : undefined
                    }
                    title={''} // Leave this blank
                    buttonLabel={'Add Training Type'}
                    // TODO: Only display if the user has appropriate permissions
                    displayHeaderActions={true}
                    onResetClicked={onResetFilters}
                    onToggleExpiredClicked={onToggleExpiredClicked}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: trainingTypeActions,
                        trace: `[${this.name}] FormComponent -> DataTable` // Just for debugging
                    })}
                    columns={[
                        DataTable.SortOrderColumn('Sort Order', {
                            fieldName: 'sortOrder',
                            colStyle: { width: '100px' },
                            displayInfo: false,
                            filterable: false
                        }),
                        DataTable.TextFieldColumn('Type', {
                            fieldName: 'description',
                            colStyle: { width: '25%' },
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterSubCode
                        }),
                        DataTable.TextFieldColumn('Code', {
                            fieldName: 'subCode',
                            colStyle: { width: '15%' },
                            displayInfo: true,
                            filterable: true,
                            filterColumn: onFilterSubCodeCode
                        })
                    ]}
                    filterable={true}
                    showExpiredFilter={true}
                    expandable={false}
                    // TODO: Only display if the user has appropriate permissions
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

    DisplayComponent = (props: FormContainerProps<AdminTrainingTypesDisplayProps>) => (
        <div>
            {/*<Alert>No leaves exist</Alert>*/}
            <AdminTrainingTypesDisplay {...props} />
        </div>
    )

    validate(values: AdminTrainingTypesProps = {}): FormErrors | undefined {
        return undefined;
    }

    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getLeaveSubCodes()); // This data needs to always be available for select lists
    }

    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const leaveTypes = (filters && filters.trainingLeaveTypes !== undefined)
            ? findAllTrainingLeaveSubCodes(filters.trainingLeaveTypes)(state) || []
            : getAllEffectiveTrainingLeaveSubCodes()(state) || [];

        const leaveTypesArray: any[] = [];
        // TODO: Maybe this should go in the selector or something instead? Not sure...

        Object.keys(leaveTypes).forEach(t => {
            const leaveType = Object.assign(
                {
                    id: leaveTypes[t].subCode
                },
                leaveTypes[t]
            );
            leaveTypesArray.push(leaveType);
        });

        return {
            ...filterData,
            trainingLeaveTypes: leaveTypesArray
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: FormValuesDiff = this.getDataFromFormValues(formValues, initialValues) as FormValuesDiff;

        const deletedLeaveTypes: IdType[] = data.trainingLeaveTypes.deletedIds as IdType[];
        const expiredLeaveTypes: IdType[] = data.trainingLeaveTypes.expiredIds as IdType[];
        const unexpiredLeaveTypes: IdType[] = data.trainingLeaveTypes.unexpiredIds as IdType[];

        const leaveTypes: Partial<LeaveSubCode>[] = [
            ...data.trainingLeaveTypes.added,
            ...data.trainingTypes.updated
        ].map((c: LeaveSubCode) => ({
            // ...c, // Don't just spread the operator, we need to replace the id GUID used on client side with a code
            // Just an alias used for updates, save method relies on the existence of an ID to determine whether or not
            // to create or update a particular record...
            id: c.id,
            code: 'TRAINING', // TODO: Use API value
            subCode: c.subCode,
            description: c.description,
            effectiveDate: c.effectiveDate,
            expiryDate: c.expiryDate,
            sortOrder: c.sortOrder,
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString()
        }));

        if (deletedLeaveTypes.length > 0) {
            await dispatch(deleteLeaveSubCodes(deletedLeaveTypes));
        }

        if (expiredLeaveTypes.length > 0) {
            await dispatch(expireLeaveSubCodes(expiredLeaveTypes));
        }

        if (unexpiredLeaveTypes.length > 0) {
            await dispatch(unexpireLeaveSubCodes(unexpiredLeaveTypes));
        }

        if (leaveTypes.length > 0) {
            await dispatch(createOrUpdateLeaveSubCodes(leaveTypes));
        }
    }
}
