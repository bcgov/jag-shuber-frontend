import * as ShuberApi from 'jag-shuber-api';
import moment from 'moment';
import {
    API,
    AlternateAssignment,
    Assignment,
    AssignmentDuty,
    CourtAssignment,
    Location,
    Courtroom,
    DateType,
    EscortAssignment,
    IdType,
    JailAssignment,
    JailRole,
    Leave,
    OtherAssignment,
    EscortRun,
    Sheriff,
    SheriffDuty,
    Shift,
    ShiftCopyOptions,
    WorkSectionCode,
    ShiftUpdates,
    SheriffRank,
    DateRange,
    LeaveSubCode,
    LeaveCancelCode,
    CourtRole,
    GenderCode,
    SheriffDutyReassignmentDetails,
    User,
    Role,
    RolePermission,
    FrontendScope,
    FrontendScopePermission,
    ApiScope,
    RoleFrontendScope,
    RoleApiScope,
    UserRole
} from './Api';
import { SubmissionError } from 'redux-form';

export function extractWorksectionCode(workSectionCodePath: string): WorkSectionCode {
    const code = `${workSectionCodePath}`.split('/').slice(-1)[0] as any;
    return code !== '' ? code : 'OTHER';
}

export function toWorkSectionCodePath(workSectionCode: WorkSectionCode = 'OTHER'): string {
    return `/workSectionCodes/${workSectionCode}`;
}

class ShuberApiClient extends ShuberApi.Client {

    constructor(baseUrl: string) {
        super(baseUrl);
    }

    protected processError(err: any) {
        const apiError = super.processError(err);
        // If we've got a validation error, we likely submitted a form
        // so return a SubmissionError for the sake of redux forms
        if (ShuberApi.Errors.isValidationError(apiError)) {
            const fields = apiError.fields || {};
            const fieldKeys = Object.keys(fields);
            if (fieldKeys.length > 0) {
                const fieldErrors = {
                    _error: 'Submission Error'
                };
                fieldKeys.forEach(fieldKey => {
                    const fieldName = fieldKey.replace('model.', '');
                    fieldErrors[fieldName] = fields[fieldKey].message;
                });
                return new SubmissionError(fieldErrors);
            } else {
                return new SubmissionError({
                    _error: 'General Validation Error: todo, extract better error message from response'
                });
            }
        } else if (ShuberApi.Errors.isDatabaseError(apiError)) {
            apiError.message = apiError.detail;
        }

        // Otherwise just return the error
        return apiError;
    }

}

export default class Client implements API {

    private _client: ShuberApi.Client;
    private _locationId: string;

    constructor(baseUrl: string = '/') {
        this._client = new ShuberApiClient(baseUrl);
        this._client.requestInterceptor = (req) => {
            return req;
        };
    }

    get onTokenChanged(): ShuberApi.TypedEvent<string | undefined> {
        return this._client.onTokenChanged;
    }

    get isLocationSet() {
        return this._locationId != undefined;
    }

    setCurrentLocation(id: IdType) {
        this._locationId = id;
    }

    get currentLocation(): string {
        return this._locationId;
    }

    async getSheriffs(): Promise<Sheriff[]> {
        const sheriffList = (await this._client.GetSheriffs(this.currentLocation) as Sheriff[]);
        return sheriffList;
    }

    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        const {
            homeLocationId = this.currentLocation,
            rankCode = 'DEPUTYSHERIFF'
        } = newSheriff;
        const sheriff = await this._client.CreateSheriff({
            ...newSheriff,
            homeLocationId,
            rankCode
        } as any);
        return sheriff as Sheriff;
    }

    async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
        const { id } = sheriffToUpdate;
        if (!id) {
            throw 'Sheriff to Update has no id';
        }
        return await this._client.UpdateSheriff(id, sheriffToUpdate) as Sheriff;
    }

    async getAssignments(dateRange: DateRange = {}): Promise<(CourtAssignment | JailAssignment | EscortAssignment | OtherAssignment)[]> {
        const { startDate, endDate } = dateRange;
        const list = await this._client.GetAssignments(this.currentLocation, startDate, endDate);
        return list as Assignment[];
    }
    async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        const assignmentToCreate: any = {
            ...assignment,
            locationId: this.currentLocation
        };
        const created = await this._client.CreateAssignment(assignmentToCreate);
        return created as Assignment;
    }

    async deleteDutyRecurrence(recurrenceId: string): Promise<void> {
        if (recurrenceId === undefined) {
            return;
        }

        await this._client.ExpireDutyRecurrence(recurrenceId);
    }

    async updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        const { id } = assignment;
        if (!id) {
            throw 'Assignment to Update has no id';
        }
        const updated = await this._client.UpdateAssignment(id, assignment as any);
        return updated as Assignment;
    }

    async deleteAssignment(assignmentIds: IdType[]): Promise<void> {
        await Promise.all(assignmentIds.map(id => this._client.ExpireAssignment(id)));
    }

    // TODO: getAssignmentDuties broke before, not sure why!!! Is this still an issue?
    async getAssignmentDuties(startDate: DateType = moment(), endDate?: DateType): Promise<AssignmentDuty[]> {
        // let duties: AssignmentDuty[] = (await this._client.GetDuties() as any);
        // return duties;
        return Promise.resolve([] as AssignmentDuty[]);
    }

    async createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        return (await this._client.CreateDuty(duty as any) as AssignmentDuty);
    }
    async updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        const { id } = duty;
        if (!id) {
            throw 'Duty to update has no Id';
        }
        return (await this._client.UpdateDuty(id, duty as any)) as AssignmentDuty;
    }

    async deleteAssignmentDuty(idPath: IdType): Promise<void> {
        await this._client.DeleteDuty(idPath);
    }

    async createSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        return await this._client.CreateSheriffDuty(sheriffDuty as any) as SheriffDuty;
    }
    async updateSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        const { id } = sheriffDuty;
        if (!id) {
            throw 'No Id included in sheriffDuty to update';
        }
        return await this._client.UpdateSheriffDuty(id, sheriffDuty as any) as SheriffDuty;
    }
    async deleteSheriffDuty(sheriffDutyId: string): Promise<void> {
        await this._client.DeleteSheriffDuty(sheriffDutyId);
    }

    async reassignSheriffDuty(reassignmentDetails: SheriffDutyReassignmentDetails): Promise<SheriffDuty[]> {
        const {
            newSourceDutyEndTime,
            sourceSheriffDuty,
            newTargetDutyStartTime,
            targetSheriffDuty
        } = reassignmentDetails;

        const sheriffDutyPromises: Promise<SheriffDuty>[] = [];

        // Source Sheriff Duty
        const sourceEndTimeMoment = moment(newSourceDutyEndTime);
        const sourceCutOffTime = moment(sourceSheriffDuty.startDateTime)
            .hours(sourceEndTimeMoment.hour())
            .minutes(sourceEndTimeMoment.minute())
            .toISOString();

        if (moment(sourceCutOffTime).isSame(moment(sourceSheriffDuty.startDateTime), 'minute')) {
            // Remove the sheriff from the source duty
            sheriffDutyPromises.push(this.updateSheriffDuty({
                ...sourceSheriffDuty,
                sheriffId: undefined
            }));
        } else if (!moment(sourceCutOffTime).isSame(moment(sourceSheriffDuty.endDateTime), 'minute')) {
            // Create a new sheriff duty to account for the remaining/uncoverd time in the source sheriff duty
            sheriffDutyPromises.push(this.createSheriffDuty({
                dutyId: sourceSheriffDuty.dutyId,
                startDateTime: sourceCutOffTime,
                endDateTime: moment(sourceSheriffDuty.endDateTime).toISOString()
            }));

            // End the source sheriff duty at the new source end time
            sheriffDutyPromises.push(this.updateSheriffDuty({
                ...sourceSheriffDuty,
                endDateTime: sourceCutOffTime,
            }));

        }

        // Target Sheriff Duty
        const targetStartTimeMoment = moment(newTargetDutyStartTime);
        const targetCutOffTime = moment(targetSheriffDuty.startDateTime)
            .hours(targetStartTimeMoment.hour())
            .minutes(targetStartTimeMoment.minute())
            .toISOString();

        if (moment(targetCutOffTime).isSame(moment(targetSheriffDuty.startDateTime), 'minute')
            && !targetSheriffDuty.sheriffId) {
            // Assign source sheriff to exisitng target sheriff duty
            sheriffDutyPromises.push(this.updateSheriffDuty({
                ...targetSheriffDuty,
                sheriffId: sourceSheriffDuty.sheriffId
            }));
        } else {
            // Create a new sheriff duty to account for the time the source sheriff will spend in the target duty
            sheriffDutyPromises.push(this.createSheriffDuty({
                dutyId: targetSheriffDuty.dutyId,
                startDateTime: targetCutOffTime,
                endDateTime: moment(targetSheriffDuty.endDateTime).toISOString(),
                sheriffId: sourceSheriffDuty.sheriffId
            }));

            if (!targetSheriffDuty.sheriffId) {
                //End the target sheriff duty at the new target start time
                sheriffDutyPromises.push(this.updateSheriffDuty({
                    ...targetSheriffDuty,
                    endDateTime: targetCutOffTime,
                }));
            }
        }

        return Promise.all(sheriffDutyPromises);
    }

    async createDefaultDuties(date: moment.Moment = moment()): Promise<AssignmentDuty[]> {
        return await this._client.ImportDefaultDuties({
            locationId: this.currentLocation,
            date: date.toISOString()
        }) as AssignmentDuty[];
    }

    async autoAssignSheriffDuties(date: moment.Moment = moment()): Promise<SheriffDuty[]> {
        return await this._client.AutoAssignSheriffDuties({
            locationId: this.currentLocation,
            date: date.toISOString()
        }) as SheriffDuty[];
    }

    async getShifts(): Promise<Shift[]> {
        const list = await this._client.GetShifts(this.currentLocation);
        return list as Shift[];
    }

    async updateMultipleShifts(shiftIds: IdType[], shiftUpdates: ShiftUpdates): Promise<Shift[]> {
        const { sheriffId, startTime, endTime, workSectionId, assignmentId } = shiftUpdates;
        return await this._client.UpdateMultipleShifts({
            shiftIds,
            sheriffId,
            workSectionId,
            startTime: startTime ? moment(startTime).toISOString() : undefined,
            endTime: endTime ? moment(endTime).toISOString() : undefined,
            assignmentId
        }) as Shift[];
    }

    async updateShift(shiftToUpdate: Partial<Shift>): Promise<Shift> {
        const { id } = shiftToUpdate;
        if (!id) {
            throw 'Shift to Update has no id';
        }
        return await this._client.UpdateShift(id, shiftToUpdate as any) as Shift;
    }

    async createShift(newShift: Partial<Shift>): Promise<Shift> {
        const shiftToCreate: any = {
            ...newShift,
            locationId: this.currentLocation
        };
        const created = await this._client.CreateShift(shiftToCreate);
        return created as Shift;
    }

    async deleteShift(shiftIds: IdType[]): Promise<void> {
        await Promise.all(shiftIds.map(id => this._client.DeleteShift(id)));
    }

    async copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]> {
        const { startOfWeekDestination, startOfWeekSource, shouldIncludeSheriffs } = shiftCopyDetails;
        return await this._client.CopyShifts({
            startOfWeekDestination: moment(startOfWeekDestination).toISOString(),
            startOfWeekSource: moment(startOfWeekSource).toISOString(),
            shouldIncludeSheriffs,
            locationId: this.currentLocation
        }) as Shift[];
    }

    async getLeaves(): Promise<Leave[]> {
        const leaves = await this._client.GetLeaves();
        return leaves.map(l => ({
            ...l,
            isPartial: l.isPartial === 1
        } as Leave));
    }

    createLeave(newLeave: Partial<Leave>): Promise<Leave> {
        return this._client.CreateLeave({
            ...newLeave,
            isPartial: newLeave.isPartial ? 1 : 0
        } as any) as Promise<Leave>;
    }

    updateLeave(updatedLeave: Leave): Promise<Leave> {
        return this._client.UpdateLeave(updatedLeave.id, {
            ...updatedLeave,
            isPartial: updatedLeave.isPartial ? 1 : 0
        } as any) as Promise<Leave>;
    }

    getLeaveSubCodes(): Promise<LeaveSubCode[]> {
        return this._client.GetLeaveSubCodes() as Promise<LeaveSubCode[]>;
    }

    createLeaveSubCode(subCode: Partial<LeaveSubCode>): Promise<LeaveSubCode> {
        return Promise.resolve({} as LeaveSubCode);
    }

    updateLeaveSubCode(subCode: Partial<LeaveSubCode>): Promise<LeaveSubCode> {
        const { code } = subCode;
        if (!code) {
            throw 'No code included in the sub code to update';
        }
        return Promise.resolve({} as LeaveSubCode);
    }

    deleteLeaveSubCode(code: IdType): Promise<void> {
        return Promise.resolve();
    }

    deleteLeaveSubCodes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
        }

        return Promise.resolve();
    }

    getLeaveCancelCodes(): Promise<LeaveCancelCode[]> {
        return this._client.GetLeaveCancelReasonCodes() as Promise<LeaveCancelCode[]>;
    }

    async getLocations(): Promise<Location[]> {
        const list = await this._client.GetLocations();
        return list as Location[];
    }

    async getCourtrooms(): Promise<Courtroom[]> {
        const list = await this._client.GetCourtrooms(this.currentLocation);
        return list as Courtroom[];
    }

    async createCourtroom(courtroom: Partial<Courtroom>): Promise<Courtroom> {
        return await this._client.CreateCourtroom(courtroom) as Courtroom;
    }

    async updateCourtroom(courtroom: Partial<Courtroom>): Promise<Courtroom> {
        const { id } = courtroom;
        if (!id) {
            throw 'No Id included in the courtroom to update';
        }
        return await this._client.UpdateCourtroom(id, courtroom) as Courtroom;
    }

    async deleteCourtroom(courtroomId: string): Promise<void> {
        return await this._client.DeleteCourtroom(courtroomId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteCourtrooms(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteCourtroom(id));
        }

        return Promise.resolve();
    }

    async getEscortRuns(): Promise<EscortRun[]> {
        const list = await this._client.GetEscortRuns(this.currentLocation);
        return list as EscortRun[];
    }

    async getJailRoles(): Promise<JailRole[]> {
        const list = await this._client.GetJailRoleCodes();
        return list as JailRole[];
    }

    async getAlternateAssignmentTypes(): Promise<AlternateAssignment[]> {
        const list = await this._client.GetOtherAssignCodes();
        return list as AlternateAssignment[];
    }

    async getSheriffRankCodes(): Promise<SheriffRank[]> {
        const list = await this._client.GetSheriffRankCodes();
        return list as SheriffRank[];
    }

    async getCourtRoles(): Promise<CourtRole[]> {
        const list = await this._client.GetCourtRoleCodes();
        return list as CourtRole[];
    }

    async getGenderCodes(): Promise<GenderCode[]> {
        const list = await this._client.GetGenderCodes();
        return list as GenderCode[];
    }

    // Methods for users
    async getUsers(): Promise<User[]> {
        const list = await this._client.GetUsersByLocationId(this.currentLocation);
        return list as User[];
    }

    async getUser(id: IdType): Promise<User> {
        if (!id) {
            throw 'No Id to request';
        }
        return await this._client.GetUserById(id) as User;
    }

    async createUser(user: Partial<User>): Promise<User> {
        return await this._client.CreateUser(user) as User;
    }

    async updateUser(user: Partial<User>): Promise<User> {
        const { id } = user;
        if (!id) {
            throw 'No Id to request';
        }
        return await this._client.GetUserById(id) as User;
    }

    async deleteUser(userId: IdType): Promise<void> {
        return await this._client.DeleteUser(userId);
    }

    async deleteUsers(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteUser(id));
        }

        return Promise.resolve();
    }

    // Methods for roles
    async getRoles(): Promise<Role[]> {
        const list = await this._client.GetRoles();
        return list as Role[];
    }

    async getRole(): Promise<Role> {
        return {} as Role;
    }

    async createRole(role: Partial<Role>): Promise<Role> {
        return await this._client.CreateRole(role) as Role;
    }

    async updateRole(role: Partial<Role>): Promise<Role> {
        const { id } = role;
        if (!id) {
            throw 'No Id included in role to update';
        }
        return await this._client.UpdateRole(id, role) as Role;
    }

    // TODO: Add expireRole? or expireUserRole?

    async deleteRole(roleId: string): Promise<void> {
        return await this._client.DeleteRole(roleId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteRole(id));
        }

        return Promise.resolve();
    }

    async getRolePermissions(): Promise<RolePermission[]> {
        const list = await this._client.GetRolePermissions();
        return list as RolePermission[];
    }

    async getRolePermission(): Promise<RolePermission> {
        return {} as RolePermission;
    }

    async createRolePermission(rolePermission: Partial<RolePermission>): Promise<RolePermission> {
        return await this._client.CreateRolePermission(rolePermission) as RolePermission;
    }

    async updateRolePermission(rolePermission: Partial<RolePermission>): Promise<RolePermission> {
        const { id } = rolePermission;
        if (!id) {
            throw 'No Id included in the rolePermission to update';
        }
        return await this._client.UpdateRolePermission(id, rolePermission) as RolePermission;
    }

    async deleteRolePermission(permissionId: IdType): Promise<void> {
        return await this._client.DeleteRolePermission(permissionId);
    }

    async deleteRolePermissions(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteRolePermission(id));
        }

        return Promise.resolve();
    }

    async getFrontendScopes(): Promise<FrontendScope[]> {
        const list = await this._client.GetFrontendScopes();
        return list as FrontendScope[];
    }

    async getFrontendScope(): Promise<FrontendScope> {
        return {} as FrontendScope;
    }

    async createFrontendScope(frontendScope: Partial<FrontendScope>): Promise<FrontendScope> {
        return this._client.CreateFrontendScope(frontendScope) as FrontendScope;
    }

    async updateFrontendScope(frontendScope: Partial<FrontendScope>): Promise<FrontendScope> {
        const { id } = frontendScope;
        if (!id) {
            throw 'No Id included in the frontendScope to update';
        }
        return this._client.UpdateFrontendScope(id, frontendScope) as FrontendScope;
    }

    async deleteFrontendScope(frontendScopeId: IdType): Promise<void> {
        return this._client.DeleteFrontendScope(frontendScopeId);
    }

    async deleteFrontendScopes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteFrontendScope(id));
        }

        return Promise.resolve();
    }

    async getFrontendScopePermissions(): Promise<FrontendScopePermission[]> {
        const list = await this._client.GetFrontendScopePermissions();
        return list as FrontendScopePermission[];
    }

    async getFrontendScopePermission(): Promise<FrontendScopePermission> {
        return {} as FrontendScopePermission;
    }

    async createFrontendScopePermission(permission: FrontendScopePermission): Promise<FrontendScopePermission> {
        return this._client.CreateFrontendScopePermission(permission) as FrontendScopePermission;
    }

    async updateFrontendScopePermission(permission: FrontendScopePermission): Promise<FrontendScopePermission> {
        const { id } = permission;
        if (!id) {
            throw 'No Id included in the frontendScopePermission to update';
        }
        return this._client.UpdateFrontendScopePermission(id, permission) as FrontendScopePermission;
    }

    async deleteFrontendScopePermission(permissionId: IdType): Promise<void> {
        return await this._client.DeleteFrontendScopePermission(permissionId);
    }

     async deleteFrontendScopePermissions(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteFrontendScopePermission(id));
        }

        return Promise.resolve();
    }

    async getApiScopes(): Promise<ApiScope[]> {
        const list = await this._client.GetApiScopes();
        return list as ApiScope[];
    }

    async getApiScope(): Promise<ApiScope> {
        return {} as ApiScope;
    }

    async createApiScope(apiScope: Partial<ApiScope>): Promise<ApiScope> {
        return this._client.CreateApiScope(apiScope) as ApiScope;
    }

    async updateApiScope(apiScope: Partial<ApiScope>): Promise<ApiScope> {
        const { id } = apiScope;
        if (!id) {
            throw 'No Id included in the apiScope to update';
        }
        return this._client.UpdateApiScope(id, apiScope) as ApiScope;
    }

    async deleteApiScope(frontendScopeId: IdType): Promise<void> {
        return this._client.DeleteApiScope(frontendScopeId);
    }

    async deleteApiScopes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteApiScope(id));
        }

        return Promise.resolve();
    }

    async getRoleFrontendScopes(): Promise<RoleFrontendScope[]> {
        const list = await this._client.GetRoleFrontendScopes();
        return list as RoleFrontendScope[];
    }

    async getRoleFrontendScope(): Promise<RoleFrontendScope> {
        return {} as RoleFrontendScope;
    }

    async createRoleFrontendScope(roleScope: Partial<RoleFrontendScope>): Promise<RoleFrontendScope> {
        return await this._client.CreateRoleFrontendScope(roleScope) as RoleFrontendScope;
    }

    async updateRoleFrontendScope(roleScope: Partial<RoleFrontendScope>): Promise<RoleFrontendScope> {
        const { id } = roleScope;
        if (!id) {
            throw 'No Id included in the roleFrontendScope to update';
        }
        return await this._client.UpdateRoleFrontendScope(id, roleScope) as RoleFrontendScope;
    }

    async deleteRoleFrontendScope(roleScopeId: IdType): Promise<void> {
        return await this._client.DeleteRoleFrontendScope(roleScopeId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteRoleFrontendScopes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteRoleFrontendScope(id));
        }

        return Promise.resolve();
    }

    async getRoleApiScopes(): Promise<RoleApiScope[]> {
        const list = await this._client.GetRoleApiScopes();
        return list as RoleApiScope[];
    }

    async getRoleApiScope(): Promise<RoleApiScope> {
        return {} as RoleApiScope;
    }

    async createRoleApiScope(roleScope: Partial<RoleApiScope>): Promise<RoleApiScope> {
        return await this._client.CreateRoleApiScope(roleScope) as RoleApiScope;
    }

    async updateRoleApiScope(roleScope: Partial<RoleApiScope>): Promise<RoleApiScope> {
        const { id } = roleScope;
        if (!id) {
            throw 'No Id included in the roleApiScope to update';
        }
        return await this._client.UpdateRoleFrontendScope(id, roleScope) as RoleApiScope;
    }

    async deleteRoleApiScope(roleScopeId: IdType): Promise<void> {
        return await this._client.DeleteRoleApiScope(roleScopeId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteRoleApiScopes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteRoleApiScope(id));
        }

        return Promise.resolve();
    }

    async getUserRoles(): Promise<UserRole[]> {
        const list = await this._client.GetUserRoles();
        return list as RoleApiScope[];
    }

    async getUserRole(): Promise<UserRole> {
        return {} as UserRole;
    }

    async createUserRole(userRole: UserRole): Promise<UserRole> {
        return await this._client.CreateUserRole(userRole) as UserRole;
    }

    async updateUserRole(userRole: UserRole): Promise<UserRole> {
        const { id } = userRole;
        if (!id) {
            throw 'No Id included in the userRole to update';
        }
        return await this._client.UpdateUserRole(id, userRole) as UserRole;
    }

    async deleteUserRole(userRoleId: IdType): Promise<void> {
        return Promise.resolve();
    }

    async deleteUserRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteUserRole(id));
        }

        return Promise.resolve();
    }
    // END! Methods for roles

    getToken(): Promise<string> {
        return this._client.GetToken();
    }
    logout(): Promise<void> {
        return this._client.Logout();
    }

}
