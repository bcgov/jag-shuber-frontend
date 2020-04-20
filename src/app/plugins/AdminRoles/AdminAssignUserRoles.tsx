import React from 'react';
import {
    Button, Glyphicon,
    Table
} from 'react-bootstrap';
import {
    FormErrors
} from 'redux-form';

import { Dispatch } from 'redux';

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
    FormContainerProps,
} from '../../components/Form/FormContainer';

import DataTable, { DetailComponentProps, EmptyDetailRow } from '../../components/Table/DataTable';

import EditRow from '../../components/TableColumnActions/EditRow';
import RemoveRow from '../../components/TableColumnActions/RemoveRow';
import DeleteRow from '../../components/TableColumnActions/DeleteRow';
import ExpireRow from '../../components/TableColumnActions/ExpireRow';
import UnexpireRow from '../../components/TableColumnActions/UnexpireRow';
import RoleSelector from './containers/RoleSelector';
import LocationDisplay from './containers/LocationDisplay';
import LocationSelector from '../../containers/LocationSelector';
import SheriffRankDisplay from './containers/SheriffRankDisplay';
import SheriffRankCodeSelector from '../../containers/SheriffRankCodeSelector';
import GenderDisplay from './containers/GenderDisplay';
import GenderSelector from './containers/GenderSelector';
import { ActionProps } from '../../components/TableColumnCell/Actions';

import { buildPluginPermissions, userCan } from '../permissionUtils';

import avatarImg from '../../assets/images/avatar.png';

// TODO: There already is a SheriffRankDisplay, but it doesn't work for our tables...
//  It selects a single item using a code...

// TODO: Fix this interface!
export interface AdminAssignUserRolesProps extends FormContainerProps {
    // roles?: any[];
    locations?: {}[];
    users?: {}[];
    userRoles?: {}[];
    userRolesGrouped?: {};
}

export interface AdminAssignUserRolesDisplayProps extends FormContainerProps {

}

class AdminAssignUserRolesDisplay extends React.PureComponent<AdminAssignUserRolesDisplayProps, any> {
    render() {
        const { data = [] } = this.props;

        // TODO: Rip out dummy data
        const testData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
        return (
            <div>
                {/*<h3>Roles</h3>*/}
                <Table responsive={true} striped={true} >
                    <thead>
                        <tr>
                            <th className="text-left">Role Name</th>
                            <th className="text-left">Role Code</th>
                            <th className="text-left">Description</th>
                            <th className="text-left">Last Modified</th>
                            <th className="text-left">Status</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {testData.map(r => {
                            return (
                                <tr key={r.id}>
                                    <td>Test Role</td>
                                    <td>TEST_ROLE</td>
                                    <td>Ipsum Lorem Dolor</td>
                                    <td>{new Date().toLocaleDateString()}</td>
                                    <td>
                                        Active
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </Table>
            </div>
        );
    }
}

const shouldSortByFunc = (col: any, colIndex: number) => {
    return (colIndex === 1);
};

export default class AdminAssignUserRoles extends FormContainerBase<AdminAssignUserRolesProps> {
    // NOTICE!
    // This key maps to the [appScope: FrontendScope] (in the token)
    // To set permissions for a new plugin, add a corresponding entry under System Settings > Components
    // with the name as defined as the plugin's name.
    name = 'ADMIN_PLUGIN_USER_ROLES';
    // END NOTICE
    reduxFormKey = 'roles';
    formFieldNames = {
        users: 'roles.users',
        userRoles: 'roles.userRoles',
        userRolesGrouped: 'roles.userRolesGrouped',
        // roles: 'roles.roles'
    };
    title: string = 'Assign User Roles';
    // pluginFiltersAreSet = false;
    showExpired = false;

    DetailComponent: React.SFC<DetailComponentProps> = ({ parentModelId, parentModel, getPluginPermissions }) => {
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
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (<ExpireRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage)} onClick={() => dataTableInstance.forceUpdate()} />)
                    : (model && model.isExpired)
                    ? (<UnexpireRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage)} onClick={() => dataTableInstance.forceUpdate()} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={(grantAll || canManage || canDelete)} />)
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
                    actions: userRoleActions
                })}
                columns={[
                    DataTable.SelectorFieldColumn('Assigned Role', { fieldName: 'roleId', colStyle: { width: '18%' }, selectorComponent: RoleSelector, displayInfo: true }),
                    DataTable.DateColumn('Effective Date', 'effectiveDate', { colStyle: { width: '15%'}, displayInfo: true }),
                    DataTable.DateColumn('Expiry Date', 'expiryDate', { colStyle: { width: '15%'}, displayInfo: true }),
                    DataTable.StaticDateColumn('Last Modified', { fieldName: 'updatedDtm', colStyle: { width: '15%' }, displayInfo: false }),
                    DataTable.StaticTextColumn('Assigned By', { fieldName: 'updatedBy', colStyle: { width: '15%' }, displayInfo: false })
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

    FormComponent = (props: FormContainerProps<AdminAssignUserRolesProps>) => {
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

        // TODO: We need to find a way to make sorting on multiple columns work, which probably involves figuring how to grab all the field values at once...
        const onFilterDisplayName = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                // console.log('setting plugin filters');
                setPluginFilters({
                    users: {
                        displayName: newValue
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        const onFilterBadgeNo = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                // console.log('setting plugin filters');
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
                // console.log('setting plugin filters');
                setPluginFilters({
                    users: {
                        sheriff: {
                            rankCode: newValue
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        // Note: Gender is on the sheriff, values will not be filtered for regular users
        const onFilterGender = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                // console.log('setting plugin filters');
                setPluginFilters({
                    users: {
                        sheriff: {
                            genderCode: newValue
                        }
                    }
                }, setAdminRolesPluginFilters);
            }
        };

        // Note: Home Location is on the sheriff, values will not be filtered for regular users
        const onFilterHomeLocation = (event: Event, newValue: any, previousValue: any, name: string) => {
            if (setPluginFilters) {
                // console.log('setting plugin filters');
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
                console.log('setting plugin filters');
                console.log(newValue);
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
                // console.log('reset plugin filters');
                setPluginFilters({
                    users: {}
                }, setAdminRolesPluginFilters);
            }
        };

        const userActions = [
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (
                        <Button bsStyle="default" onClick={(ev) => onButtonClicked(ev, dataTableInstance, model)}>
                            <Glyphicon glyph="lock" />
                        </Button>
                    )
                    : null;
            },
            /* ({ fields, index, model }) => {
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
                    ? (<RemoveRow fields={fields} index={index} model={model} showComponent={true} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '' && !model.isExpired)
                    ? (<ExpireRow fields={fields} index={index} model={model} showComponent={true} onClick={() => dataTableInstance.forceUpdate()} />)
                    : (model && model.isExpired)
                    ? (<UnexpireRow fields={fields} index={index} model={model} showComponent={true} onClick={() => dataTableInstance.forceUpdate()} />)
                    : null;
            },
            ({ fields, index, model }) => {
                return (model && model.id && model.id !== '')
                    ? (<DeleteRow fields={fields} index={index} model={model} showComponent={grantAll} />)
                    : null;
            } */
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
                        actions: userActions
                    })}
                    columns={[
                        // TODO: We temporarily disabled filtering on badgeNo, it's tied to the sheriff, not sure how to handle that case yet...
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
                        // TODO: We temporarily disabled filtering on badgeNo, it's tied to the sheriff, not sure how to handle that case yet...
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
                        // DataTable.StaticTextColumn('Last Name', { fieldName: 'lastName', colStyle: { width: '175px' }, displayInfo: false, filterable: true }),
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
                        }), */
                        // DataTable.DateColumn('Last Modified', 'createdDtm'),
                        // DataTable.SelectorFieldColumn('Status', { displayInfo: true }), // No point really in setting the status here
                    ]}
                    filterable={displayFilters}
                    expandable={true}
                    // expandedRows={[1, 2]}
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

    DisplayComponent = (props: FormContainerProps<AdminAssignUserRolesDisplayProps>) => (
        <div>
            {/*<Alert>No roles exist</Alert>*/}
            <AdminAssignUserRolesDisplay {...props} />
        </div>
    )

    validate(values: AdminAssignUserRolesProps = {}): FormErrors | undefined {
        return undefined;
    }

    // TODO: If we need to pre filter or server side filter,
    //  we'd implement filters here, filters is just a placeholder for now
    fetchData(dispatch: Dispatch<{}>, filters: {} | undefined) {
        dispatch(getLocations()); // This data needs to always be available for select lists
        dispatch(getSheriffs()); // This data needs to always be available for select lists
        dispatch(getUsers());
        dispatch(getUserRoles());
        dispatch(getRoles()); // This data needs to always be available for select lists
    }

    // OK, so how do we supply the filters...
    getData(state: RootState, filters: any | undefined) {
        // Get filter data
        const filterData = this.getFilterData(filters);
        // console.log('AdminAssignUserRoles filterData');
        // console.log(filterData);

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

    getDataFromFormValues(formValues: {}, initialValues: {}): FormContainerProps {
        return super.getDataFromFormValues(formValues) || {
        };
    }

    mapDeletesFromFormValues(map: any) {
        const deletedUserIds: IdType[] = [];
        const deletedUserRoleIds: IdType[] = [];

        if (map.users) {
            const initialValues = map.users.initialValues;
            const existingIds = map.users.values.map((val: any) => val.id);

            const removeUserIds = initialValues
                .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                .map((val: any) => val.id);

            deletedUserIds.push(...removeUserIds);
        }

        if (map.userRolesGrouped) {
            const initialValues = map.userRolesGrouped.initialValues;

            const removeUserRoleIds = Object.keys(initialValues).reduce((acc: any, cur: any) => {
                const initValues = map.userRolesGrouped.initialValues[cur];
                const existingIds = map. userRolesGrouped.values[cur].map((val: any) => val.id);

                const removeIds = initValues
                    .filter((val: any) => (existingIds.indexOf(val.id) === -1))
                    .map((val: any) => val.id);

                return acc.concat(removeIds);
            }, []);

            deletedUserRoleIds.push(...removeUserRoleIds);
        }

        return {
            users: deletedUserIds,
            userRoles: deletedUserRoleIds
        };
    }

    mapExpiredFromFormValues(map: any, isExpired?: boolean) {
        isExpired = isExpired || false;
        const expiredUserIds: IdType[] = [];

        if (map.users) {
            const values = map.users.values;

            const userIds = values
                .filter((val: any) => val.isExpired === isExpired)
                .map((val: any) => val.id);

            expiredUserIds.push(...userIds);
        }

        const expiredUserRoleIds: IdType[] = [];

        if (map.userRolesGrouped) {
            const values = map.userRolesGrouped.values;

            const expireUserRoleIds = Object.keys(values).reduce((acc: any, cur: any) => {
                const userRoleIds = values[cur]
                    .filter((val: any) => val.isExpired === isExpired)
                    .map((val: any) => val.id);

                return acc.concat(userRoleIds);
            }, []);

            expiredUserRoleIds.push(...expireUserRoleIds);
        }

        console.log('expired user role ids');
        console.log(expiredUserRoleIds);

        return {
            users: expiredUserIds,
            userRoles: expiredUserRoleIds
        };
    }

    async onSubmit(formValues: any, initialValues: any, dispatch: Dispatch<any>) {
        const data: any = this.getDataFromFormValues(formValues, initialValues) || {};
        const dataToExpire: any = this.getDataToExpireFromFormValues(formValues, initialValues, true) || {};
        const dataToUnexpire: any = this.getDataToExpireFromFormValues(formValues, initialValues, false) || {};
        const dataToDelete: any = this.getDataToDeleteFromFormValues(formValues, initialValues) || {};

        // Delete records before saving new ones!
        const deletedUsers: IdType[] = dataToDelete.users as IdType[];
        const deletedUserRoles: IdType[] = dataToDelete.userRoles as IdType[];

        // Expire records before saving new ones!
        const expiredUsers: IdType[] = dataToExpire.users as IdType[];
        const expiredUserRoles: IdType[] = dataToExpire.userRoles as IdType[];
        const unexpiredUsers: IdType[] = dataToUnexpire.users as IdType[];
        const unexpiredUserRoles: IdType[] = dataToUnexpire.userRoles as IdType[];

        const users: Partial<User>[] = (data.users) ? data.users.map((u: User) => ({
            ...u,
            // TODO: Need a way to set this stuff... createdBy, updated by fields should really be set in the backend using the current user
            // We're just going to set the fields here temporarily to quickly check if things are working in the meantime...
            createdBy: 'DEV - FRONTEND',
            updatedBy: 'DEV - FRONTEND',
            createdDtm: new Date().toISOString(),
            updatedDtm: new Date().toISOString(),
            revisionCount: 0 // TODO: Is there entity versioning anywhere in this project???
        })) : [];

        const userRoles: Partial<UserRole>[] = (data.userRolesGrouped)
            ? Object.keys(data.userRolesGrouped)
                .reduce((acc, cur, idx) => {
                    return acc
                        .concat(
                            data.userRolesGrouped[cur]
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
