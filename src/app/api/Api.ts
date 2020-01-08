import moment from 'moment';
import { displayEnum } from '../infrastructure/EnumUtils';
import avatarImg from '../assets/images/avatar.png';
import * as ApiTypes from 'jag-shuber-api/dist/common/types';

export type MapType<T> = { [key: string]: T };
export type DateType = ApiTypes.DateType;
export type StringMap = MapType<string>;
export type IdType = string;
export type ShiftMap = MapType<Shift>;
export type LeaveMap = MapType<Leave>;
export type SheriffMap = MapType<Sheriff>;
export type AssignmentMap = MapType<Assignment>;
export type AssignmentDutyMap = MapType<AssignmentDuty>;
export type WorkSectionCode = 'COURTS' | 'JAIL' | 'ESCORTS' | 'OTHER';
export type Assignment = CourtAssignment | JailAssignment | EscortAssignment | OtherAssignment;
export type TimeType = ApiTypes.TimeType;
export type CourtroomMap = MapType<Courtroom>;
export type RunMap = MapType<EscortRun>;
export type JailRoleMap = MapType<JailRole>;
export type AlternateAssignmentMap = MapType<AlternateAssignment>;
export type DateRange = { startDate?: DateType, endDate?: DateType };
export type LocationMap = MapType<Location>;
export type SheriffRankCodeMap = MapType<SheriffRank>;
export type LeaveSubCodeMap = MapType<LeaveSubCode>;
export type LeaveCancelCodeMap = MapType<LeaveCancelCode>;
export type CourtRoleMap = MapType<CourtRole>;
export type GenderCodeMap = MapType<GenderCode>;
export type RoleMap = MapType<Role>;
export type RolePermissionMap = MapType<RolePermission>;
export type RoleFrontendScopeMap = MapType<RoleFrontendScope>;
export type RoleApiScopeMap = MapType<RoleApiScope>;
export type FrontendScopeMap = MapType<FrontendScope>;
export type FrontendScopePermissionMap = MapType<FrontendScopePermission>;
export type RoleFrontendScopePermissionMap = MapType<RoleFrontendScopePermission>;
export type RoleApiScopePermissionMap = MapType<RoleApiScopePermission>;
export type ApiScopeMap = MapType<ApiScope>;
export type UserMap = MapType<User>;
export type UserRoleMap = MapType<UserRole>;

export const WORK_SECTIONS: StringMap = {
    COURTS: 'Courts',
    JAIL: 'Jail',
    ESCORTS: 'Escorts',
    OTHER: 'Other'
};

/* tslint:disable:no-bitwise */
export enum DaysOfWeek {
    Mon = 1 << 0,
    Tue = 1 << 1,
    Wed = 1 << 2,
    Thu = 1 << 3,
    Fri = 1 << 4,
    Sat = 1 << 5,
    Sun = 1 << 6,
    Everyday = Mon | Tue | Wed | Thu | Fri | Sat | Sun,
    Weekdays = Mon | Tue | Wed | Thu | Fri
}

/* tslint:enable:no-bitwise */
export namespace DaysOfWeek {
    export function getDisplayValues(value: DaysOfWeek, getIndividualDays: boolean = false): string[] {
        let dayDisplay = displayEnum(DaysOfWeek, value);

        const weekdaysIndex = dayDisplay.indexOf('Weekdays');
        const satIndex = dayDisplay.indexOf('Sat');
        const sunIndex = dayDisplay.indexOf('Sun');

        if (weekdaysIndex > -1) {
            if (satIndex > -1 || sunIndex > -1) {
                dayDisplay.splice(weekdaysIndex, 1);
            }
        }
        if (getIndividualDays) {
            if (dayDisplay.indexOf('Weekdays') > -1) {
                dayDisplay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
            } else if (dayDisplay.indexOf('Everyday') > -1) {
                dayDisplay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            }
        }

        return dayDisplay;
    }

    export function getWeekdayNumbers(value: DaysOfWeek): number[] {
        const dayMap = {
            'Sun': 0,
            'Mon': 1,
            'Tue': 2,
            'Wed': 3,
            'Thu': 4,
            'Fri': 5,
            'Sat': 6
        };

        const dayNames = getDisplayValues(value);
        let dayNumbers: number[] = [];

        if (dayNames.indexOf('Everyday') !== -1) {
            dayNumbers = [0, 1, 2, 3, 4, 5, 6];
        } else if (dayNames.indexOf('Weekdays') !== -1) {
            dayNumbers = [1, 2, 3, 4, 5];
        } else {
            dayNames.forEach(day => {
                dayNumbers.push(dayMap[day]);
            });
        }

        return dayNumbers;
    }
}

export namespace Leave {
    export function getLeaveTypeDisplay(leave: Partial<Leave>): string {
        return leave.leaveCode === LEAVE_CODE_PERSONAL ? 'Leave' : 'Training';
    }
}

export namespace WorkSection {
    export function getWorkSectionSortCode(workSectionId?: WorkSectionCode): string {
        switch (workSectionId) {
            case 'COURTS':
                return '0';
            case 'JAIL':
                return '1';
            case 'ESCORTS':
                return '2';
            case 'OTHER':
                return '3';
            default:
                return '4';
        }
    }
}

export const BLANK_SHERIFF: Sheriff = {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: '',
    lastName: '',
    badgeNo: '-1',
    imageUrl: avatarImg
};

export const BLANK_LOCATION: Location = {
    id: '-1',
    name: '',
    code: '',
    regionId: ''
};

export const DEFAULT_RECURRENCE: DutyRecurrence[] = [
    {
        daysBitmap: DaysOfWeek.Weekdays,
        startTime: moment().hour(9).minute(0),
        endTime: moment().hour(12).minute(0),
        sheriffsRequired: 1
    },
    {
        daysBitmap: DaysOfWeek.Weekdays,
        startTime: moment().hour(13).minute(0),
        endTime: moment().hour(17).minute(0),
        sheriffsRequired: 2
    }
];

export const LEAVE_CODE_PERSONAL = 'PERSONAL';
export const LEAVE_CODE_TRAINING = 'TRAINING';

export const COURT_ASSIGNMENT_ROOM = 'ROOM';
export const COURT_ASSIGNMENT_ROLE = 'ROLE';
export interface SheriffProfile {
    sheriff: Sheriff;
    leaves?: Leave[];
}

export interface Sheriff {
    id: IdType;
    firstName: string;
    lastName: string;
    badgeNo: string;
    imageUrl?: string;
    alias?: string;
    genderCode?: string;
    rankCode?: string;
    homeLocationId?: IdType;
    currentLocationId?: IdType;
}

export interface GenderCode {
    code: IdType;
    description: string;
    expiryDate?: DateType;
}

export interface SheriffRank {
    code: string;
    description: string;
    expiryDate?: DateType;
    order: number;
}

export interface BaseAssignment {
    id: IdType;
    title: string;
    locationId: IdType;
    workSectionId: WorkSectionCode;
    dutyRecurrences?: DutyRecurrence[];
    startDateTime: DateType;
    endDateTime?: DateType;
}

export interface CourtAssignment extends BaseAssignment {
    workSectionId: 'COURTS';
    courtroomId?: IdType;
    courtRoleId?: IdType;
}

export interface JailAssignment extends BaseAssignment {
    workSectionId: 'JAIL';
    jailRoleCode: IdType;
}

export interface EscortAssignment extends BaseAssignment {
    workSectionId: 'ESCORTS';
    escortRunId: IdType;
}

export interface OtherAssignment extends BaseAssignment {
    workSectionId: 'OTHER';
    otherAssignCode: IdType;
}

export interface AssignmentDuty {
    id: IdType;
    assignmentId: IdType;
    startDateTime: DateType;
    endDateTime: DateType;
    sheriffDuties: SheriffDuty[];
    sheriffsRequired: number;
    dutyRecurrenceId?: IdType;
    comments?: string;
}

export interface SheriffDuty {
    id: IdType;
    sheriffId?: IdType;
    dutyId: IdType;
    startDateTime: DateType;
    endDateTime: DateType;
}

export interface SheriffUnassignedRange {
    sheriffId: IdType;
    startDateTime: DateType;
    endDateTime: DateType;
}

export interface SheriffDutyReassignmentDetails {
    sourceSheriffDuty: SheriffDuty;
    newSourceDutyEndTime: DateType;
    targetSheriffDuty: SheriffDuty;
    newTargetDutyStartTime: DateType;
}

export interface DutyRecurrence {
    id?: IdType;
    assignmentId?: IdType;
    startTime: DateType;
    endTime: DateType;
    daysBitmap: DaysOfWeek;
    sheriffsRequired: number;
}

export interface Location {
    id: IdType;
    name: string;
    code: string;
    parentLocationId?: string;
    regionId: string;
}

export interface Group {
    id: IdType;
    name: string;
}

export interface Region {
    id: number;
    name: string;
}

export interface Courtroom {
    id: IdType;
    locationId: IdType;
    code: IdType;
    name: string;
}

export interface JailRole {
    code: IdType;
    description: string;
    expiryDate?: DateType;
}

export interface CourtRole {
    code: IdType;
    description: string;
    expiryDate?: DateType;
}

export interface Shift {
    id: IdType;
    sheriffId?: IdType;
    locationId: IdType;
    workSectionId?: WorkSectionCode;
    startDateTime: DateType;
    endDateTime: DateType;
    assignmentId?: IdType;
}

export interface ShiftUpdates {
    sheriffId?: IdType;
    startTime?: DateType;
    endTime?: DateType;
    workSectionId?: WorkSectionCode | 'varied';
    assignmentId?: string | 'varied';
}

export interface ShiftCopyOptions {
    shouldIncludeSheriffs: boolean;
    startOfWeekSource: DateType;
    startOfWeekDestination: DateType;
}

export interface Leave {
    id: IdType;
    sheriffId: IdType;
    leaveCode: string;
    leaveSubCode: string;
    startDate: DateType;
    endDate?: DateType;
    cancelDate?: DateType;
    cancelReasonCode?: string;
    isPartial?: boolean;
    startTime?: TimeType;
    endTime?: TimeType;
}

export interface LeaveSubCode {
    id?: IdType; // Used on client-side only
    code: string;
    subCode: string;
    description: string;
    expiryDate?: string;
}

export interface LeaveCancelCode {
    code: string;
    description: string;
    expiryDate?: DateType;
}

export interface EscortRun {
    id: IdType;
    locationId: IdType | string;
    title: string;
}

export interface AlternateAssignment {
    code: IdType | string;
    description: string;
    expiryDate?: DateType;
}

export interface AssignmentScheduleItem {
    id: string;
    assignmentId: IdType;
    locationId: IdType;
    startDateTime: DateType;
    endDateTime: DateType;
    workSectionId: WorkSectionCode;
}

// Users, roles & permissions
export interface User {
    id?: IdType;
    displayName?: string;
    defaultLocationId?: IdType;
    systemAccountInd?: number;
    sheriffId?: IdType;
    sheriff?: Sheriff;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface Role {
    id: IdType;
    roleName?: string;
    roleCode?: string;
    systemCodeInd?: number;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface UserRole {
    id?: IdType;
    userId?: IdType;
    roleId?: IdType;
    effectiveDate?: string;
    expiryDate?: string;
    locationId?: IdType;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface ApiScope {
    id?: IdType;
    apiScopeId?: string;
    scopeName?: string; // Human-friendly scope name
    scopeCode?: string; // Code type for the scope
    systemScopeInd?: string; // Is the scope required by the SYSTEM
    description?: string; // Scope description
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface FrontendScope {
    id?: IdType;
    frontendScopeId?: string;
    scopeName?: string; // Human-friendly scope name
    scopeCode?: string; // Code type for the scope
    systemScopeInd?: string; // Is the scope required by the SYSTEM
    description?: string; // Scope description
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface FrontendScopePermission {
    id?: IdType;
    frontendScopeId?: string;
    permissionCode?: string;
    displayName?: string;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface ApiScopePermission {
    id?: IdType;
    apiScopeId?: string;
    permissionCode?: string;
    displayName?: string;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface RoleApiScope {
    id?: IdType;
    roleId?: string;
    scopeId?: string;
    // TODO: I think we can rip rolePermissions out, we're not using it
    rolePermissions: Array<RolePermission | undefined>;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface RoleFrontendScope {
    id?: IdType;
    roleId?: string;
    scopeId?: string;
    // TODO: I think we can rip rolePermissions out, we're not using it
    rolePermissions: Array<RolePermission | undefined>;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

/**
 * Scoped access to API routes.
 */
export interface RolePermission {
    id?: IdType;
    roleId?: string;
    roleApiScopeId?: string,
    roleFrontendScopeId?: string,
    frontendScopePermissionId?: string,
    displayName?: string; // TODO: This should be client-side only!
    description?: string; // TODO: This should be client-side only!
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}

export interface RoleFrontendScopePermission extends RolePermission {
    scope?: FrontendScope;
    roleScope?: RoleFrontendScope;
    scopePermission?: FrontendScopePermission;
    // hasPermission is not in the API entity
    // It is only used on the client-side
    hasPermission?: boolean;
}
export interface RoleApiScopePermission extends RolePermission {
    scope?: ApiScope;
    roleScope?: RoleApiScope;
    scopePermission?: ApiScopePermission;
    // hasPermission is not in the API entity
    // It is only used on the client-side
    hasPermission?: boolean;
}

// Queries
// First some base stuff
export interface ExpirableRecordQuery {
    effectiveDate?: DateType; // TODO: Verify that these DateTypes will work
    expiryDate?: DateType; // TODO: Verify that these DateTypes will work
}

export interface RecordMetaQuery {
    createdBy?: string;
    createdDtm?: DateType; // TODO: Verify that these DateTypes will work
    updatedBy?: string;
    updatedDtm?: DateType; // TODO: Verify that these DateTypes will work
    revisionCount?: number; // TODO: Verify that these DateTypes will work
}

export interface CodeQuery {
    code?: string;
}

export interface ScopeQuery {
    scopeName?: string;
    scopeCode?: string;
}

// Concrete query types
export interface RoleQuery extends RecordMetaQuery {
    roleName?: string;
    roleCode?: string;
}

export interface SheriffQuery extends RecordMetaQuery {
    firstName?: string;
    lastName?: string;
    badgeNo?: string | number;
    sheriffRankCode?: string;
    currentLocationId?: string;
    homeLocationId?: string;
    genderCode?: string;
}

// TODO: Or should it be the other way around - SheriffQuery extends UserQuery?
export interface UserQuery extends SheriffQuery {
    displayName?: string;
    locationId?: string;
    defaultLocationId?: string;
}

export interface ApiScopeQuery extends ScopeQuery {}
export interface FrontendScopeQuery extends ScopeQuery {}

export interface API {
    // Sheriffs
    getSheriffs(): Promise<Sheriff[]>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff>;

    // Assignments
    getAssignments(dateRange: DateRange): Promise<Assignment[]>;
    createAssignment(assignment: Partial<Assignment>): Promise<Assignment>;
    updateAssignment(assignment: Partial<Assignment>): Promise<Assignment>;
    deleteAssignment(assignmentId: IdType[]): Promise<void>;
    deleteDutyRecurrence(recurrenceId: IdType): Promise<void>;

    // Assignment Duties
    getAssignmentDuties(startDate?: DateType, endDate?: DateType): Promise<AssignmentDuty[]>;
    createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty>;
    updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty>;
    deleteAssignmentDuty(dutyId: IdType): Promise<void>;

    createSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty>;
    updateSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty>;
    deleteSheriffDuty(sheriffDutyId: IdType): Promise<void>;
    reassignSheriffDuty(reassignmentDetails: SheriffDutyReassignmentDetails): Promise<SheriffDuty[]>;

    // Default Duties
    createDefaultDuties(date?: DateType): Promise<AssignmentDuty[]>;

    // Auto Assign Sheriff Duties
    autoAssignSheriffDuties(date?: DateType): Promise<SheriffDuty[]>;

    // Sheriff Shifts
    getShifts(): Promise<Shift[]>;
    updateMultipleShifts(shiftIds: IdType[], shiftUpdates: ShiftUpdates): Promise<Shift[]>;
    updateShift(updatedShift: Partial<Shift>): Promise<Shift>;
    createShift(newShift: Partial<Shift>): Promise<Shift>;
    deleteShift(shiftIds: IdType[]): Promise<void>;
    copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]>;

    // Sheriff Leaves
    getLeaves(): Promise<Leave[]>;
    createLeave(newLeave: Partial<Leave>): Promise<Leave>;
    updateLeave(updatedLeave: Leave): Promise<Leave>;
    getLeaveSubCodes(): Promise<LeaveSubCode[]>;
    createLeaveSubCode(newLeaveSubCode: Partial<LeaveSubCode>): Promise<LeaveSubCode>;
    updateLeaveSubCode(updatedLeaveSubCode: LeaveSubCode): Promise<LeaveSubCode>;
    deleteLeaveSubCode(subCodeId: IdType): Promise<void>;
    deleteLeaveSubCodes(ids: IdType[]): Promise<void>;
    getLeaveCancelCodes(): Promise<LeaveCancelCode[]>;

    // Courtrooms
    getCourtrooms(): Promise<Courtroom[]>;
    createCourtroom(newCourtroom: Partial<Courtroom>): Promise<Courtroom>;
    updateCourtroom(updatedCourtroom: Partial<Courtroom>): Promise<Courtroom>;
    deleteCourtroom(courtroomId: IdType): Promise<void>;
    deleteCourtrooms(courtroomIds: IdType[]): Promise<void>;

    getEscortRuns(): Promise<EscortRun[]>;
    getJailRoles(): Promise<JailRole[]>;
    getAlternateAssignmentTypes(): Promise<AlternateAssignment[]>;
    getSheriffRankCodes(): Promise<SheriffRank[]>;
    getCourtRoles(): Promise<CourtRole[]>;
    getGenderCodes(): Promise<GenderCode[]>;

    getLocations(): Promise<Location[]>;

    // Users, roles & permissions
    getUser(id: IdType): Promise<User>;
    createUser(newUser: Partial<User>): Promise<User>;
    updateUser(updatedUser: User): Promise<User>;
    deleteUser(userId: IdType): Promise<void>;
    getUsers(): Promise<User[]>;
    deleteUsers(ids: IdType[]): Promise<void>;

    getUserRole(): Promise<UserRole>;
    createUserRole(newUserRole: Partial<UserRole>): Promise<UserRole>;
    updateUserRole(updatedUserRole: UserRole): Promise<UserRole>;
    deleteUserRole(id: IdType): Promise<void>;
    expireUserRole(id: IdType): Promise<void>;
    getUserRoles(): Promise<UserRole[]>;
    deleteUserRoles(ids: IdType[]): Promise<void>;
    expireUserRoles(ids: IdType[]): Promise<void>;

    getRole(): Promise<Role>;
    createRole(newRole: Partial<Role>): Promise<Role>;
    updateRole(updatedRole: Role): Promise<Role>;
    deleteRole(roleId: IdType): Promise<void>;
    getRoles(): Promise<Role[]>;
    deleteRoles(ids: IdType[]): Promise<void>;

    getRolePermission(): Promise<RolePermission>;
    createRolePermission(newRolePermission: Partial<RolePermission>): Promise<RolePermission>;
    updateRolePermission(updatedRolePermission: RolePermission): Promise<RolePermission>;
    getRolePermissions(): Promise<RolePermission[]>;
    deleteRolePermissions(permissionIds: IdType[]): Promise<void>;

    getFrontendScope(): Promise<FrontendScope>;
    createFrontendScope(newFrontendScope: Partial<FrontendScope>): Promise<FrontendScope>;
    updateFrontendScope(updatedFrontendScope: FrontendScope): Promise<FrontendScope>;
    getFrontendScopes(): Promise<FrontendScope[]>;
    deleteFrontendScope(frontendScopeId: IdType): Promise<void>;
    deleteFrontendScopes(frontendScopeIds: IdType[]): Promise<void>;

    getFrontendScopePermission(): Promise<FrontendScopePermission>;
    createFrontendScopePermission(newFrontendScopePermission: Partial<FrontendScopePermission>): Promise<FrontendScopePermission>;
    updateFrontendScopePermission(updatedFrontendScopePermission: FrontendScopePermission): Promise<FrontendScopePermission>;
    getFrontendScopePermissions(): Promise<FrontendScopePermission[]>;
    deleteFrontendScopePermissions(frontendScopePermissionIds: IdType[]): Promise<void>;

    getApiScope(): Promise<ApiScope>;
    createApiScope(newApiScope: Partial<ApiScope>): Promise<ApiScope>;
    updateApiScope(updatedApiScope: ApiScope): Promise<ApiScope>;
    getApiScopes(): Promise<ApiScope[]>;
    deleteApiScope(apiScopeId: IdType): Promise<void>;
    deleteApiScopes(apiScopeIds: IdType[]): Promise<void>;

    getRoleFrontendScope(): Promise<RoleFrontendScope>;
    createRoleFrontendScope(newRoleFrontendScope: Partial<RoleFrontendScope>): Promise<RoleFrontendScope>;
    updateRoleFrontendScope(updatedRoleFrontendScope: RoleFrontendScope): Promise<RoleFrontendScope>;
    getRoleFrontendScopes(): Promise<RoleFrontendScope[]>;
    deleteRoleFrontendScope(roleFrontendScopeIds: IdType): Promise<void>;
    deleteRoleFrontendScopes(roleFrontendScopeIds: IdType[]): Promise<void>;

    getRoleApiScope(): Promise<RoleApiScope>;
    createRoleApiScope(newRoleApiScope: Partial<RoleApiScope>): Promise<RoleApiScope>;
    updateRoleApiScope(updatedRoleApiScope: RoleApiScope): Promise<RoleApiScope>;
    getRoleApiScopes(): Promise<RoleApiScope[]>;
    deleteRoleApiScope(roleApiScopeId: IdType): Promise<void>;
    deleteRoleApiScopes(roleApiScopeIds: IdType[]): Promise<void>;

    getToken(): Promise<string>;
    logout(): Promise<void>;
}
