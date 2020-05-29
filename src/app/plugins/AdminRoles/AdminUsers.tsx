import React from 'react';
import { Dispatch } from 'redux';
import {
    FormErrors
} from 'redux-form';

import {
    getUsers,
    createOrUpdateUsers,
    deleteUsers,
    expireUsers,
    unexpireUsers
} from '../../modules/users/actions';

import {
    getAllUsers,
    getUserRolesGroupedByUserId,
    findAllUsers,
    findUserRolesGroupedByUserId,
} from '../../modules/users/selectors';

import {
    getSheriffList as getSheriffs
} from '../../modules/sheriffs/actions';

import {
    getSheriffLocations
} from '../../modules/sheriffLocations/actions';

import {
    getAllSheriffs,
    // findAllSheriffs
} from '../../modules/sheriffs/selectors';

import {
    getRoles,
    getUserRoles,
    createOrUpdateUserRoles,
    deleteUserRoles,
    expireUserRoles,
    unexpireUserRoles,
    setAdminRolesPluginFilters
} from '../../modules/roles/actions';

import {
    getAllRoles,
    getAllUserRoles,
    findAllRoles,
    findAllUserRoles
} from '../../modules/roles/selectors';

import {
    getLocations
} from '../../modules/system/action'; // TODO: Naming not consistent here!

import {
    getAllLocations,
    findAllLocations
} from '../../modules/system/selectors';

import { RootState } from '../../store';

import { User, UserRole, IdType, RoleApiScope, RoleFrontendScope } from '../../api';

import {
    FormContainerBase,
    FormContainerProps, FormValuesDiff,
} from '../../components/Form/FormContainer';

import DataTable, { EmptyDetailRow } from '../../components/Table/DataTable';
import { DataTableDetailComponentProps as DetailComponentProps } from '../../components/Table/DataTableDetail';

import EditRow from '../../components/Table/TableColumnActions/EditRow';
import RemoveRow from '../../components/Table/TableColumnActions/RemoveRow';
import DeleteRow from '../../components/Table/TableColumnActions/DeleteRow';
import ExpireRow from '../../components/Table/TableColumnActions/ExpireRow';
import UnexpireRow from '../../components/Table/TableColumnActions/UnexpireRow';
import RoleSelector from './containers/RoleSelector';
import LocationDisplay from './containers/LocationDisplay';
import LocationSelector from '../../containers/LocationSelector';
// TODO: There already is a SheriffRankDisplay, but it doesn't work for our tables...
//  It selects a single item using a code...
import SheriffRankDisplay from './containers/SheriffRankDisplay';
import SheriffRankCodeSelector from '../../containers/SheriffRankCodeSelector';
import GenderDisplay from './containers/GenderDisplay';
import GenderSelector from './containers/GenderSelector';
import { ActionProps } from '../../components/Table/TableColumnCell/Actions';

import { buildPluginPermissions, userCan } from '../permissionUtils';

import avatarImg from '../../assets/images/avatar.png';

// TODO: Fix this interface!
export interface AdminUsersProps extends FormContainerProps {
    // roles?: any[];
    locations?: {}[];
    users?: {}[];
    userRoles?: {}[];
    userRolesGrouped?: {};
}

export interface AdminUsersDisplayProps extends FormContainerProps {}

class AdminUsersDisplay extends React.PureComponent<AdminUsersDisplayProps, any> {
    render() {
        return (
            <div />
        );
    }
}

const shouldSortByFunc = (col: any, colIndex: number) => {
    return (colIndex === 1);
};

export default class AdminUsers extends FormContainerBase<AdminUsersProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_USER_ROLES';
    // END NOTICE
    reduxFormKey = 'roles';
    formFieldNames = {
        users: 'roles.users',
        userRoles: 'roles.userRoles',
        userRolesGrouped: 'roles.userRolesGrouped',
        // roles: 'roles.roles'
    };
    title: string = 'Manage Users';

    DetailComponent: React.SFC<DetailComponentProps> =
        ({ parentModelId, parentModel, getPluginPermissions }) => {
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        const canManage = userCan(permissions, 'MANAGE');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onButtonClicked = (ev: React.SyntheticEvent<any>, context: any, model: any) => {
            context.setActiveRow(model.id);
        };

        // If parentModelId is not supplied, the parent component is in a 'new' state, and its data has not been saved
        // Don't render the detail component
        if (!parentModelId) return null;

        const userRoleActions = [
            ({ fields, index, model }) => {
                return (model && !model.id || model && model.id === '')
                    ? (
                        <RemoveRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage || canDelete)}
                        />
                    )
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (
                        <ExpireRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage)}
                            onClick={() => dataTableInstance && dataTableInstance.component &&
                                dataTableInstance.component.forceUpdate()
                            }
                        />
                    )
                    : (model && model.isExpired)
                    ? (
                        <UnexpireRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage)}
                            onClick={() => dataTableInstance && dataTableInstance.component &&
                                dataTableInstance.component.forceUpdate()
                            }
                        />
                    )
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <DeleteRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage || canDelete)}
                        />
                    )
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        return (
            <DataTable
                ref={(dt) => dataTableInstance = dt}
                fieldName={`${this.formFieldNames.userRolesGrouped}['${parentModelId}']`}
                title={''} // Leave this blank
                // TODO: Button action to forward to user roles page and expand row
                buttonLabel={'Assign User Roles'}
                displayHeaderActions={true}
                displayHeaderSave={false}
                actionsColumn={DataTable.ActionsColumn({
                    actions: userRoleActions,
                    trace: `[${this.name}] FormComponent -> DataTable` // Just for debugging
                })}
                columns={[
                    DataTable.SelectorFieldColumn('Assigned Role', {
                        fieldName: 'roleId',
                        colStyle: { width: '18%' },
                        selectorComponent: RoleSelector,
                        displayInfo: true
                    }),
                    DataTable.DateColumn('Effective Date', 'effectiveDate', {
                        colStyle: { width: '15%'},
                        displayInfo: true
                    }),
                    DataTable.DateColumn('Expiry Date', 'expiryDate', {
                        colStyle: { width: '15%'},
                        displayInfo: true
                    }),
                    DataTable.StaticDateColumn('Last Modified', {
                        fieldName: 'updatedDtm',
                        colStyle: { width: '15%' },
                        displayInfo: false }),
                    DataTable.StaticTextColumn('Assigned By', {
                        fieldName: 'updatedBy',
                        colStyle: { width: '15%' },
                        displayInfo: false
                    })
                ]}
                expandable={false}
                shouldDisableRow={() => parentModel.systemAccountInd === 1}
                shouldMarkRowAsDeleted={(model) => {
                    return model.isExpired;
                }}
                rowComponent={EmptyDetailRow}
                initialValue={{
                    userId: parentModelId
                }}
                modalProps={{ userId: parentModelId }}
                modalComponent={EmptyDetailRow}
            />
        );
    }

    FormComponent = (props: FormContainerProps<AdminUsersProps>) => {
        const { showSheriffProfileModal } = props;
        const { getPluginPermissions, setPluginFilters, displayFilters } = props;
        const { grantAll, permissions = [] } = buildPluginPermissions(getPluginPermissions);

        const canManage = userCan(permissions, 'MANAGE');
        const canExpire = userCan(permissions, 'EXPIRE_USER_ROLE');
        const canDelete = userCan(permissions, 'DELETE');

        // We can't use React hooks yet, and not sure if this project will ever be upgraded to 16.8
        // This is a quick n' dirty way to achieve the same thing
        let dataTableInstance: any;

        const onButtonClicked = (ev: React.SyntheticEvent<{}>, context?: any, model?: any) => {
            // Executes in DataTable's context
            if (model) context.setActiveRow(model.id);
        };

        // TODO: We need to find a way to make sorting on multiple columns work, which probably
        //  involves figuring how to grab all the field values at once...
        const onFilterDisplayName = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {
                        displayName: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterBadgeNo = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {
                        sheriff: {
                            badgeNo: newValue
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        // Note: Rank is on the sheriff, values will not be filtered for regular users
        const onFilterRank = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {
                        sheriff: {
                            rankCode: {
                                value: newValue,
                                exact: true
                            }
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        // Note: Gender is on the sheriff, values will not be filtered for regular users
        const onFilterGender = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {
                        sheriff: {
                            genderCode: {
                                value: newValue,
                                exact: true
                            }
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        // Note: Home Location is on the sheriff, values will not be filtered for regular users
        const onFilterHomeLocation = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {
                        sheriff: {
                            homeLocationId: newValue
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        // Note: Current Location is on the sheriff, values will not be filtered for regular users
        const onFilterCurrentLocation = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {
                        sheriff: {
                            currentLocationId: newValue
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onResetFilters = () => {
            if (setPluginFilters) {
                setPluginFilters({
                    users: {}
                }, setAdminRolesPluginFilters);
            }
        };

        const userActions = [
            ({ fields, index, model }) => {
                return (model && model.id)
                    ? (
                        <EditRow
                            showComponent={true}
                            fields={fields}
                            index={index}
                            model={model}
                            onClick={(userModel: Partial<User>) => {
                                const { sheriffId } = userModel;
                                if (typeof showSheriffProfileModal === 'function' && sheriffId) {
                                    // TODO: See if this works....
                                    showSheriffProfileModal(sheriffId, true, 'leaves');
                                    // showModal('SheriffProfileModal', { sheriffId, isEditing: true, show: true });
                                }
                            }}
                        />
                    )
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && !model.id || model && model.id === '')
                    ? (
                        <RemoveRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage || canDelete)}
                        />
                    )
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (
                        <ExpireRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage)}
                            onClick={() => dataTableInstance && dataTableInstance.component &&
                                dataTableInstance.component.forceUpdate()
                            }
                        />
                    )
                    : (model && model.isExpired)
                    ? (
                        <UnexpireRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage)}
                            onClick={() => dataTableInstance && dataTableInstance.component &&
                                dataTableInstance.component.forceUpdate()
                            }
                        />
                    )
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <DeleteRow
                            fields={fields}
                            index={index}
                            model={model}
                            showComponent={(grantAll || canManage || canDelete)}
                        />
                    )
                    : null;
            }
        ] as React.ReactType<ActionProps>[];

        const imageUrl = null;

        // @ts-ignore
        let imageSrc = (imageUrl)
            ? imageUrl
            : avatarImg;

        return (
            <div>
                <DataTable
                    ref={(dt) => dataTableInstance = dt}
                    fieldName={this.formFieldNames.users}
                    filterFieldName={(this.filterFieldNames) ? `${this.filterFieldNames.users}` : undefined}
                    title={''} // Leave this blank
                    buttonLabel={'Add User'}
                    displayHeaderActions={false}
                    displayHeaderSave={false}
                    onResetClicked={onResetFilters}
                    displayActionsColumn={true}
                    actionsColumn={DataTable.ActionsColumn({
                        actions: userActions,
                        trace: `[AdminScopePermissionsModal] -> DataTable` // Just for debugging
                    })}
                    columns={[
                        DataTable.HtmlColumn('', {
                            colStyle: { width: '32px' },
                            component: (
                                <div style={{padding: '0 5px 10px', textAlign: 'center'}}>
                                    <img
                                        className="profile-image"
                                        alt={'Profile Image'}
                                        ref={el => false}
                                        src={imageSrc}
                                        width="24"
                                        height="24"
                                        style={{
                                            width: '24px',
                                            height: '24px'
                                        }}
                                    />
                                </div>
                            )
                        }),
                        DataTable.StaticTextColumn('Badge No.', {
                            fieldName: 'sheriff.badgeNo',
                            colStyle: { width: '8%' },
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterBadgeNo
                        }),
                        DataTable.StaticTextColumn('Full Name', {
                            fieldName: 'displayName',
                            colStyle: { width: '22%' },
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterDisplayName
                        }),
                        // TODO: Searcg by all locations
                        DataTable.MappedTextColumn('Location', {
                            fieldName: 'sheriff.homeLocationId',
                            colStyle: { width: '15%' },
                            selectorComponent: LocationDisplay,
                            filterSelectorComponent: LocationSelector,
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterCurrentLocation
                        }),
                        DataTable.MappedTextColumn('Rank', {
                            fieldName: 'sheriff.rankCode',
                            colStyle: { width: '10%' },
                            selectorComponent: SheriffRankDisplay,
                            filterSelectorComponent: SheriffRankCodeSelector,
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterRank
                        }),
                        DataTable.MappedTextColumn('Gender', {
                            fieldName: 'sheriff.genderCode',
                            colStyle: { width: '10%' },
                            selectorComponent: GenderDisplay,
                            filterSelectorComponent: GenderSelector,
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterGender
                        }),
                        /* DataTable.MappedTextColumn('Home Location', {
                            fieldName: 'sheriff.homeLocationId',
                            colStyle: { width: '10%' },
                            selectorComponent: LocationDisplay,
                            filterSelectorComponent: LocationSelector,
                            displayInfo: false,
                            filterable: true,
                            filterColumn: onFilterHomeLocation
                        }) */
                    ]}
                    filterable={displayFilters}
                    expandable={true}
                    shouldMarkRowAsDeleted={(model) => {
                        return model.isExpired;
                    }}
                    rowComponent={this.renderDetail()}
                    modalComponent={EmptyDetailRow}
                    shouldSortBy={shouldSortByFunc}

                />
            </div>
        );
    }

    DisplayComponent = (props: FormContainerProps<AdminUsersDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminUsersDisplay {...props} />
        </div>
    )

    validate(values: AdminUsersProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: If we need to pre filter or server side filter,
    //  we'd implement filters here, filters is just a placeholder for now
    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getLocations()); // This data needs to always be available for select lists
        dispatch(getSheriffs()); // This data needs to always be available for select lists
        dispatch(getSheriffLocations()); // This data needs to always be available for select lists
        dispatch(getUsers());
        dispatch(getUserRoles());
        dispatch(getRoles()); // This data needs to always be available for select lists
    }

    // OK, so how do we supply the filters...
    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);

        // Get form data
        const locations = (filters && filters.locations)
            ? findAllLocations(filters.locations)(state)
            : getAllLocations(state);

        const users = (filters && filters.users)
            ? findAllUsers(filters.users)(state)
            : getAllUsers(state);

        // TODO: Finish this
        const sheriffs = (filters && filters.sheriffs)
            // ? findAllSheriffs(filters)(state)
            ? getAllSheriffs(state)
            : getAllSheriffs(state);

        const roles = (filters && filters.roles)
            ? findAllRoles(filters.roles)(state)
            : getAllRoles(state);

        const userRoles = (filters && filters.userRoles)
            ? findAllUserRoles(filters.userRoles)(state)
            : getAllUserRoles(state);

        const userRolesGrouped = (filters && filters.userRoles)
            ? findUserRolesGroupedByUserId(filters.userRoles)(state)
            : getUserRolesGroupedByUserId(state);

        return {
            ...filterData,
            locations,
            sheriffs,
            roles,
            users,
            userRoles,
            userRolesGrouped
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: FormValuesDiff = this.getDataFromFormValues(
            formValues,
            initialValues,
            ['userRolesGrouped']
        ) as FormValuesDiff;

        const deletedUsers: IdType[] = data.users.deletedIds as IdType[];
        const deletedUserRoles: IdType[] = data.userRolesGrouped.deletedIds as IdType[];
        const expiredUsers: IdType[] = data.users.expiredIds as IdType[];
        const expiredUserRoles: IdType[] = data.userRolesGrouped.expiredIds as IdType[];
        const unexpiredUsers: IdType[] = data.users.unexpiredIds as IdType[];
        const unexpiredUserRoles: IdType[] = data.userRolesGrouped.unexpiredIds as IdType[];

        const usersData = [
            ...data.users.added,
            ...data.users.updated
        ];

        const users: Partial<User>[] = (usersData)
            ? usersData.map((u: User) => ({
                ...u,
                // TODO: Need a way to set this stuff...
                //  createdBy, updated by fields should really be set in the backend using the current user
                //  We're just going to set the fields here temporarily to quickly check if things are
                //  working in the meantime...
                createdBy: 'DEV - FRONTEND',
                updatedBy: 'DEV - FRONTEND',
                createdDtm: new Date().toISOString(),
                updatedDtm: new Date().toISOString(),
                revisionCount: 0 // TODO: Is there entity versioning anywhere in this project???
            }))
            : [];

        const userRolesData = {
            ...data.userRolesGrouped.added,
            ...data.userRolesGrouped.updated
        };

        const userRoles: Partial<UserRole>[] = (userRolesData)
            ? Object.keys(userRolesData)
                .reduce((acc, cur, idx) => {
                    return acc
                        .concat(
                            userRolesData[cur]
                                .map((ur: UserRole) => {
                                    ur.userId = cur; // Set user ids on all rows, we need it set on new rows
                                    return ur;
                                })
                        );
                }, [])
                .map((ur: UserRole) => ({
                    ...ur,
                    createdBy: 'DEV - FRONTEND',
                    updatedBy: 'DEV - FRONTEND',
                    createdDtm: new Date().toISOString(),
                    updatedDtm: new Date().toISOString(),
                    revisionCount: 0
                }))
            : [];

        if (deletedUsers.length > 0) {
            await dispatch(deleteUsers(deletedUsers));
        }

        if (expiredUsers.length > 0) {
            await dispatch(expireUsers(expiredUsers));
        }

        if (unexpiredUsers.length > 0) {
            await dispatch(unexpireUsers(unexpiredUsers));
        }

        if (deletedUserRoles.length > 0) {
            await dispatch(deleteUserRoles(deletedUserRoles));
        }

        if (expiredUserRoles.length > 0) {
            await dispatch(expireUserRoles(expiredUserRoles));
        }

        if (unexpiredUserRoles.length > 0) {
            await dispatch(unexpireUserRoles(unexpiredUserRoles));
        }

        // We don't update users here, unless we're deleting them...
        /* if (users.length > 0) {
            await dispatch(createOrUpdateUsers(users));
        } */

        if (userRoles.length > 0) {
            await dispatch(createOrUpdateUserRoles(userRoles));
        }
    }
}
