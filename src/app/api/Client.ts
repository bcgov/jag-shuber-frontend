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
    DateRange,
    EscortAssignment,
    IdType,
    JailAssignment,
    JailRoleCode,
    Leave,
    OtherAssignment,
    EscortRun,
    Sheriff,
    SheriffDuty,
    SheriffLocation,
    Shift,
    ShiftCopyOptions,
    WorkSectionCode,
    ShiftUpdates,
    SheriffRank,
    LeaveSubCode,
    LeaveCancelCode,
    CourtRoleCode,
    GenderCode,
    SheriffDutyReassignmentDetails,
    User,
    Role,
    RolePermission,
    FrontendScope,
    FrontendScopeApi,
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
        this._client.requestInterceptor = (req: any) => {
            return req;
        };
    }

    get onTokenChanged(): ShuberApi.TypedEvent<string | undefined> {
        return this._client.onTokenChanged;
    }

    get isLocationSet() {
        return this._locationId !== undefined;
    }

    setCurrentLocation(id: IdType) {
        this._locationId = id;
    }

    get currentLocation(): string {
        return this._locationId;
    }

    async getSheriffs(): Promise<Sheriff[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const sheriffList = (await this._client.GetSheriffs(currentLocation) as Sheriff[]);
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

    // Sheriff Locations
    async getSheriffLocation(id: IdType): Promise<SheriffLocation> {
        return await this._client.GetSheriffLocationById(id) as SheriffLocation;
    }

    async getSheriffLocations(): Promise<SheriffLocation[]> {
        return await this._client.GetSheriffLocations() as SheriffLocation[];
    }

    async createSheriffLocation(sheriffLocation: Partial<SheriffLocation>): Promise<SheriffLocation> {
        return await this._client.CreateSheriffLocation(sheriffLocation) as SheriffLocation;
    }

    async updateSheriffLocation(sheriffLocation: Partial<SheriffLocation>): Promise<SheriffLocation> {
        const { id } = sheriffLocation;
        if (!id) {
            throw 'No Id included in the sheriffLocation to update';
        }
        return await this._client.UpdateSheriffLocation(id, sheriffLocation) as SheriffLocation;
    }

    async deleteSheriffLocation(sheriffLocationId: string): Promise<void> {
        return await this._client.DeleteSheriffLocation(sheriffLocationId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteSheriffLocations(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteSheriffLocation(id));
        }

        return Promise.resolve();
    }
    // END SheriffLocations

    async getAssignments(dateRange: DateRange = {}): Promise<(CourtAssignment | JailAssignment | EscortAssignment | OtherAssignment)[]> {
        const { startDate, endDate } = dateRange;
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetAssignments(currentLocation, startDate, endDate);
        return list as Assignment[];
    }
    async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const assignmentToCreate: any = {
            ...assignment,
            locationId: currentLocation
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
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : 'ALL_LOCATIONS';

        const startDateString = (endDate) ? startDate.toString() : '';
        const endDateString = (endDate) ? endDate.toString() : '';
        // TODO: Double check to make sure Assignment Duties are working correctly!
        const duties: AssignmentDuty[] = await this._client
            .GetDuties(currentLocation, startDateString, endDateString) as any;

        return duties;
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
                // End the target sheriff duty at the new target start time
                sheriffDutyPromises.push(this.updateSheriffDuty({
                    ...targetSheriffDuty,
                    endDateTime: targetCutOffTime,
                }));
            }
        }

        return Promise.all(sheriffDutyPromises);
    }

    async createDefaultDuties(date: moment.Moment = moment()): Promise<AssignmentDuty[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        return await this._client.ImportDefaultDuties({
            locationId: currentLocation,
            date: date.toISOString()
        }) as AssignmentDuty[];
    }

    async autoAssignSheriffDuties(date: moment.Moment = moment()): Promise<SheriffDuty[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        return await this._client.AutoAssignSheriffDuties({
            locationId: currentLocation,
            date: date.toISOString()
        }) as SheriffDuty[];
    }

    async getShifts(): Promise<Shift[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetShifts(currentLocation);
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
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const shiftToCreate: any = {
            ...newShift,
            locationId: currentLocation
        };
        const created = await this._client.CreateShift(shiftToCreate);
        return created as Shift;
    }

    async deleteShift(shiftIds: IdType[]): Promise<void> {
        await Promise.all(shiftIds.map(id => this._client.DeleteShift(id)));
    }

    async copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]> {
        const { startOfWeekDestination, startOfWeekSource, shouldIncludeSheriffs } = shiftCopyDetails;
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        return await this._client.CopyShifts({
            startOfWeekDestination: moment(startOfWeekDestination).toISOString(),
            startOfWeekSource: moment(startOfWeekSource).toISOString(),
            shouldIncludeSheriffs,
            locationId: currentLocation
        }) as Shift[];
    }

    async getLeaves(): Promise<Leave[]> {
        const leaves = await this._client.GetLeaves();
        return leaves.map(l => ({
            ...l,
            isPartial: l.isPartial === 1
        } as Leave));
    }

    async createLeave(newLeave: Partial<Leave>): Promise<Leave> {
        return await this._client.CreateLeave({
            ...newLeave,
            isPartial: newLeave.isPartial ? 1 : 0
        } as any) as Leave;
    }

    async updateLeave(updatedLeave: Leave): Promise<Leave> {
        return await this._client.UpdateLeave(updatedLeave.id, {
            ...updatedLeave,
            isPartial: updatedLeave.isPartial ? 1 : 0
        } as any) as Leave;
    }

    async getLeaveSubCodes(dateRange: DateRange = {}): Promise<LeaveSubCode[]> {
        const { startDate, endDate } = dateRange;
        return await this._client.GetLeaveSubCodes(startDate as string, endDate as string) as LeaveSubCode[];
    }

    async createLeaveSubCode(subCode: Partial<LeaveSubCode>): Promise<LeaveSubCode> {
        return await this._client.CreateLeaveSubCode(subCode) as LeaveSubCode;
    }

    async updateLeaveSubCode(subCode: Partial<LeaveSubCode>): Promise<LeaveSubCode> {
        const { code } = subCode;
        if (!code) {
            throw 'No code included in the sub code to update';
        }
        return await this._client.UpdateLeaveSubCode(code, subCode) as LeaveSubCode;
    }

    async deleteLeaveSubCode(code: IdType): Promise<void> {
        return await this._client.DeleteLeaveSubCode(code);
    }

    async deleteLeaveSubCodes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteLeaveSubCode(id));
        }

        return Promise.resolve();
    }

    async expireLeaveSubCode(code: IdType): Promise<void> {
        return await this._client.ExpireLeaveSubCode(code);
    }

    async expireLeaveSubCodes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireLeaveSubCode(id));
        }

        return Promise.resolve();
    }

    async unexpireLeaveSubCode(code: IdType): Promise<void> {
        return await this._client.UnexpireLeaveSubCode(code);
    }

    async unexpireLeaveSubCodes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireLeaveSubCode(id));
        }

        return Promise.resolve();
    }

    async getLeaveCancelCodes(): Promise<LeaveCancelCode[]> {
        return await this._client.GetLeaveCancelReasonCodes() as LeaveCancelCode[];
    }

    async getLocations(): Promise<Location[]> {
        const list = await this._client.GetLocations();
        return list as Location[];
    }

    async getCourtrooms(): Promise<Courtroom[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetCourtrooms(currentLocation);
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

    async expireCourtroom(courtroomId: string): Promise<void> {
        return await this._client.ExpireCourtroom(courtroomId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async expireCourtrooms(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireCourtroom(id));
        }

        return Promise.resolve();
    }

    async unexpireCourtroom(courtroomId: string): Promise<void> {
        return await this._client.UnexpireCourtroom(courtroomId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async unexpireCourtrooms(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireCourtroom(id));
        }

        return Promise.resolve();
    }

    async getEscortRuns(): Promise<EscortRun[]> {
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetEscortRuns(currentLocation);
        return list as EscortRun[];
    }

    async createEscortRun(run: Partial<EscortRun>): Promise<EscortRun> {
        return await this._client.CreateEscortRun(run) as EscortRun;
    }

    async updateEscortRun(run: Partial<EscortRun>): Promise<EscortRun> {
        const { id } = run;
        if (!id) {
            throw 'No Id included in the escort run to update';
        }
        return await this._client.UpdateEscortRun(id, run) as EscortRun;
    }

    async deleteEscortRun(runId: string): Promise<void> {
        return await this._client.DeleteEscortRun(runId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteEscortRuns(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteEscortRun(id));
        }

        return Promise.resolve();
    }

    async expireEscortRun(runId: string): Promise<void> {
        return await this._client.ExpireEscortRun(runId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async expireEscortRuns(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireEscortRun(id));
        }

        return Promise.resolve();
    }

    async unexpireEscortRun(runId: string): Promise<void> {
        return await this._client.UnexpireEscortRun(runId);
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async unexpireEscortRuns(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireEscortRun(id));
        }

        return Promise.resolve();
    }

    async getCourtRoles(): Promise<CourtRoleCode[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetCourtRoleCodes(currentLocation);
        return list as CourtRoleCode[];
    }

    async createCourtRole(courtRole: Partial<CourtRoleCode>): Promise<CourtRoleCode> {
        // return Promise.resolve({} as CourtRoleCode);
        return await this._client.CreateCourtRoleCode(courtRole as ShuberApi.CourtRoleCode) as CourtRoleCode;
    }

    async updateCourtRole(courtRole: Partial<CourtRoleCode>): Promise<CourtRoleCode> {
        const { id } = courtRole;
        if (!id) {
            throw 'No Id included in the court role to update';
        }
        return await this._client.UpdateCourtRoleCode(id, courtRole as ShuberApi.CourtRoleCode) as CourtRoleCode;
        // return Promise.resolve({} as CourtRoleCode);
    }

    async deleteCourtRole(courtRoleId: string): Promise<void> {
        return await this._client.DeleteCourtRoleCode(courtRoleId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteCourtRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteCourtRoleCode(id));
        }

        return Promise.resolve();
    }

    async expireCourtRole(courtRoleId: string): Promise<void> {
        return await this._client.ExpireCourtRoleCode(courtRoleId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async expireCourtRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireCourtRoleCode(id));
        }

        return Promise.resolve();
    }

    async unexpireCourtRole(courtRoleId: string): Promise<void> {
        return await this._client.UnexpireCourtRoleCode(courtRoleId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async unexpireCourtRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireCourtRoleCode(id));
        }

        return Promise.resolve();
    }

    async getJailRoles(): Promise<JailRoleCode[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetJailRoleCodes(currentLocation);
        return list as JailRoleCode[];
    }

    async createJailRole(jailRole: Partial<JailRoleCode>): Promise<JailRoleCode> {
        // return Promise.resolve({} as JailRoleCode);
        return await this._client.CreateJailRoleCode(jailRole as ShuberApi.JailRoleCode) as JailRoleCode;
    }

    async updateJailRole(jailRole: Partial<JailRoleCode>): Promise<JailRoleCode> {
        const { id } = jailRole;
        if (!id) {
            throw 'No Id included in the jail role code to update';
        }
        return await this._client.UpdateJailRoleCode(id, jailRole as ShuberApi.JailRoleCode) as JailRoleCode;
        // return Promise.resolve({} as JailRoleCode);
    }

    async deleteJailRole(jailRoleId: string): Promise<void> {
        return await this._client.DeleteJailRoleCode(jailRoleId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteJailRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteJailRoleCode(id));
        }

        return Promise.resolve();
    }

    async expireJailRole(jailRoleId: string): Promise<void> {
        return await this._client.ExpireJailRoleCode(jailRoleId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async expireJailRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireJailRoleCode(id));
        }

        return Promise.resolve();
    }

    async unexpireJailRole(jailRoleId: string): Promise<void> {
        return await this._client.UnexpireJailRoleCode(jailRoleId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async unexpireJailRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireJailRoleCode(id));
        }

        return Promise.resolve();
    }

    // TODO: Calling these alternate assignments here and other assignments in the API is kind of weird we should rename these if we can
    async getAlternateAssignmentTypes(): Promise<AlternateAssignment[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetOtherAssignCodes(currentLocation);
        return list as AlternateAssignment[];
    }

    async createAlternateAssignmentType(assignmentType: Partial<AlternateAssignment>): Promise<AlternateAssignment> {
        // return Promise.resolve({} as AlternateAssignment);
        return await this._client.CreateOtherAssignCode(assignmentType as ShuberApi.OtherAssignCode) as AlternateAssignment;
    }

    async updateAlternateAssignmentType(assignmentType: Partial<AlternateAssignment>): Promise<AlternateAssignment> {
        const { id } = assignmentType;
        if (!id) {
            throw 'No Id included in the alternate assignment to update';
        }
        return await this._client.UpdateOtherAssignCode(id, assignmentType as ShuberApi.OtherAssignCode) as AlternateAssignment;
        // return Promise.resolve({} as AlternateAssignment);
    }

    async deleteAlternateAssignmentType(assignmentTypeId: string): Promise<void> {
        return await this._client.DeleteOtherAssignCode(assignmentTypeId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async deleteAlternateAssignmentTypes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteOtherAssignCode(id));
        }

        return Promise.resolve();
    }

    async expireAlternateAssignmentType(assignmentTypeId: string): Promise<void> {
        return await this._client.ExpireOtherAssignCode(assignmentTypeId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async expireAlternateAssignmentTypes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireOtherAssignCode(id));
        }

        return Promise.resolve();
    }

    async unexpireAlternateAssignmentType(assignmentTypeId: string): Promise<void> {
        return await this._client.UnexpireOtherAssignCode(assignmentTypeId);
        // return Promise.resolve();
    }

    /**
     * TODO: We need a proper endpoint to deal with this this loop isn't gonna do it...
     * @param ids
     */
    async unexpireAlternateAssignmentTypes(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireOtherAssignCode(id));
        }

        return Promise.resolve();
    }

    async getSheriffRankCodes(): Promise<SheriffRank[]> {
        const list = await this._client.GetSheriffRankCodes();
        return list as SheriffRank[];
    }

    async getGenderCodes(): Promise<GenderCode[]> {
        const list = await this._client.GetGenderCodes();
        return list as GenderCode[];
    }

    // Methods for users
    async getUsers(): Promise<User[]> {
        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : undefined;

        const list = await this._client.GetUsersByLocationId(currentLocation);
        return list as User[];
    }

    async getCurrentUser(): Promise<User> {
        return await this._client.GetCurrentUser() as User;
    }

    async getUser(userId: IdType): Promise<User> {
        if (!userId) {
            throw 'No Id to request';
        }
        return await this._client.GetUserById(userId) as User;
    }

    async createUser(user: Partial<User>): Promise<User> {
        return await this._client.CreateUser(user) as User;
    }

    async uploadUserImage(userId: IdType, image: Partial<any>): Promise<void> {
        if (!userId) {
            throw 'No Id to request';
        }

        console.log('dump user image upload request, we still need to post the payload');
        console.log(image);
        return await this._client.UploadUserImage(userId);
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

    async expireUser(userId: IdType): Promise<void> {
        return await this._client.ExpireUser(userId);
    }

    async expireUsers(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireUser(id));
        }

        return Promise.resolve();
    }

    async unexpireUser(userId: IdType): Promise<void> {
        return await this._client.ExpireUser(userId);
    }

    async unexpireUsers(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireUser(id));
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
        return await this._client.CreateFrontendScope(frontendScope) as FrontendScope;
    }

    async updateFrontendScope(frontendScope: Partial<FrontendScope>): Promise<FrontendScope> {
        const { id } = frontendScope;
        if (!id) {
            throw 'No Id included in the frontendScope to update';
        }
        return await this._client.UpdateFrontendScope(id, frontendScope) as FrontendScope;
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

    async getFrontendScopeApis(): Promise<FrontendScopeApi[]> {
        const list = await this._client.GetFrontendScopeApis();
        return list as FrontendScopeApi[];
    }

    async getFrontendScopeApi(): Promise<FrontendScopeApi> {
        return {} as FrontendScopeApi;
    }

    async createFrontendScopeApi(permission: FrontendScopeApi): Promise<FrontendScopeApi> {
        return await this._client.CreateFrontendScopeApi(permission) as FrontendScopeApi;
    }

    async updateFrontendScopeApi(permission: FrontendScopeApi): Promise<FrontendScopeApi> {
        const { id } = permission;
        if (!id) {
            throw 'No Id included in the frontendScopeApi to update';
        }
        return await this._client.UpdateFrontendScopeApi(id, permission) as FrontendScopeApi;
    }

    async deleteFrontendScopeApi(permissionId: IdType): Promise<void> {
        return await this._client.DeleteFrontendScopeApi(permissionId);
    }

     async deleteFrontendScopeApis(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.DeleteFrontendScopeApi(id));
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
        return await this._client.CreateFrontendScopePermission(permission) as FrontendScopePermission;
    }

    async updateFrontendScopePermission(permission: FrontendScopePermission): Promise<FrontendScopePermission> {
        const { id } = permission;
        if (!id) {
            throw 'No Id included in the frontendScopePermission to update';
        }
        return await this._client.UpdateFrontendScopePermission(id, permission) as FrontendScopePermission;
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

    async getUserRoles(dateRange: DateRange = {}): Promise<UserRole[]> {
        const { startDate, endDate } = dateRange;

        // TODO: Not sure if this is the best solution, but it gets things working they way we want to for now...
        //  ALL_LOCATIONS key is added to selectorValues in LocationSelector.
        const currentLocation = (this.currentLocation && this.currentLocation !== 'ALL_LOCATIONS')
            ? this.currentLocation
            : ''; // TODO: Add entry to ExtendedClient, so this can remain 'undefined'

        const list = await this._client.GetUserRoles(currentLocation, startDate as string, endDate as string);
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

    async expireUserRole(userRoleId: IdType): Promise<void> {
        if (userRoleId === undefined) {
            return;
        }

        return await this._client.ExpireUserRole(userRoleId);
    }

    async expireUserRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.ExpireUserRole(id));
        }

        return Promise.resolve();
    }

    async unexpireUserRole(userRoleId: IdType): Promise<void> {
        if (userRoleId === undefined) {
            return;
        }

        return await this._client.UnexpireUserRole(userRoleId);
    }

    async unexpireUserRoles(ids: IdType[]): Promise<void> {
        if (ids.length > 0) {
             ids.forEach(id => this._client.UnexpireUserRole(id));
        }

        return Promise.resolve();
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
