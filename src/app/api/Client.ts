import * as ShuberApi from 'jag-shuber-api';
import * as moment from 'moment';
import {
    API,
    AlternateAssignment,
    Assignment,
    AssignmentDuty,
    AssignmentDutyDetails,
    CourtAssignment,
    Courthouse,
    Courtroom,
    DateType,
    EscortAssignment,
    IdType,
    JailAssignment,
    JailRole,
    Leave,
    OtherAssignment,
    RecurrenceInfo,
    Run,
    Sheriff,
    SheriffDuty,
    Shift,
    ShiftCopyOptions,
    WorkSectionCode,
    ShiftUpdates
} from './Api';
import MockApi from './Mock/MockApi';
// import { isCourtAssignment, isEscortAssignment, isJailAssignment, isOtherAssignment } from './utils';

export function extractWorksectionCode(workSectionCodePath: string): WorkSectionCode {
    const code = `${workSectionCodePath}`.split('/').slice(-1)[0] as any;
    return code !== '' ? code : 'OTHER';
}

export function toWorkSectionCodePath(workSectionCode: WorkSectionCode = 'OTHER'): string {
    return `/workSectionCodes/${workSectionCode}`;
}

export default class Client implements API {
    private _client: ShuberApi.Client;
    private _courthouseId: string;
    private _mockApi: MockApi;

    constructor(baseUrl: string = '/') {
        this._client = new ShuberApi.Client(baseUrl);
        this._mockApi = new MockApi();
    }

    get isCourthouseSet() {
        return this._courthouseId != undefined;
    }

    setCurrentCourthouse(id: IdType) {
        this._courthouseId = id;
    }

    get currentCourthouse(): string {
        return this._courthouseId;
    }

    async getSheriffs(): Promise<Sheriff[]> {
        const sheriffList = (await this._client.GetSheriffs(this.currentCourthouse) as Sheriff[]);
        return sheriffList;
    }
    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        const sheriff = await this._client.CreateSheriff({
            ...newSheriff,
            homeCourthouseId: this.currentCourthouse,
            rankCode: 'DEPUTYSHERIFF',
        });
        return sheriff as Sheriff;
    }
    async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
        //return await this._halClient.update('/sheriffs', sheriffToUpdate, true, SheriffResource);
        throw Error('Not Implemented');
    }

    async getAssignments(): Promise<(CourtAssignment | JailAssignment | EscortAssignment | OtherAssignment)[]> {
        const list = await this._client.GetAssignments(this.currentCourthouse);
        return list as Assignment[];
    }
    async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        throw "Not Implemented"
    }
    async createRecurrences(assignmentId: IdType, recurrences: RecurrenceInfo[] = []): Promise<any[]> {
        throw "Not Implemented";
    }

    async deleteDutyRecurrence(recurrenceId: string): Promise<void> {
        if (recurrenceId === undefined) {
            return;
        }

        await this._client.ExpireDutyRecurrence(recurrenceId);
    }

    updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        throw Error('Coming Soon!!');
        // console.warn('Using Mock API');
        // return this._mockApi.updateAssignment(assignment);
    }

    async deleteAssignment(assignmentId: IdType): Promise<void> {
        if (assignmentId === undefined) {
            return;
        }
        await this._client.ExpireAssignment(assignmentId);
    }

    async getAssignmentDuties(startDate: DateType = moment(), endDate?: DateType): Promise<AssignmentDuty[]> {
        let duties: AssignmentDuty[] = (await this._client.GetDuties() as any);
        return duties;
    }

    getAssignmentDutyDetails(): Promise<AssignmentDutyDetails[]> {
        console.warn('Using Mock API');
        return this._mockApi.getAssignmentDutyDetails();
    }

    updateAssignmentDutyDetails(dutyDetails: Partial<AssignmentDutyDetails>): Promise<AssignmentDutyDetails> {
        console.warn('Using Mock API');
        return this._mockApi.updateAssignmentDutyDetails(dutyDetails);
    }

    createAssignmentDutyDetails(dutyDetails: Partial<AssignmentDutyDetails>): Promise<AssignmentDutyDetails> {
        console.warn('Using Mock API');
        return this._mockApi.createAssignmentDutyDetails(dutyDetails);
    }

    async createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        throw 'Not Implemented';
    }
    async updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        throw "Not Implemented";
    }

    async deleteAssignmentDuty(idPath: IdType): Promise<void> {
        await this._client.DeleteDuty(idPath);
    }

    async createSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        throw "Not Implemented";
    }
    async updateSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        throw "Not Implemented"
    }
    async deleteSheriffDuty(sheriffDutyId: string): Promise<void> {
        //await this._client.(sheriffDutyId);
        throw "Not Implemented";
    }

    async createDefaultDuties(date: moment.Moment = moment()): Promise<AssignmentDuty[]> {
        throw "Not Implemented";
    }

    getShifts(): Promise<Shift[]> {
        console.warn('Using Mock API');
        return this._mockApi.getShifts();
    }
    updateMultipleShifts(shiftIds: IdType[], shiftUpdates: ShiftUpdates): Promise<Shift[]> {
        console.warn('Using Mock API');
        return this._mockApi.updateMultipleShifts(shiftIds, shiftUpdates);
    }
    updateShift(shiftToUpdate: Partial<Shift>): Promise<Shift> {
        console.warn('Using Mock API');
        return this._mockApi.updateShift(shiftToUpdate);
    }
    createShift(newShift: Partial<Shift>): Promise<Shift> {
        console.warn('Using Mock API');
        return this._mockApi.createShift(newShift);
    }
    deleteShift(shiftIds: IdType[]): Promise<void> {
        console.warn('Using Mock API');
        return this._mockApi.deleteShift(shiftIds);
    }

    copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]> {
        console.warn('Using Mock API');
        return this._mockApi.copyShifts(shiftCopyDetails);
    }
    getLeaves(): Promise<Leave[]> {
        console.warn('Using Mock API');
        return this._mockApi.getLeaves();
    }

    async getCourthouses(): Promise<Courthouse[]> {
        const list = await this._client.GetCourthouses();
        return list as Courthouse[];
    }

    async getCourtrooms(): Promise<Courtroom[]> {
        const list = await this._client.GetCourtrooms(this.currentCourthouse);
        return list as Courtroom[];
    }

    async getRuns(): Promise<Run[]> {
        const list = await this._client.GetRuns(this.currentCourthouse);
        return list as Run[];
    }

    async getJailRoles(): Promise<JailRole[]> {
        const list = await this._client.GetJailRoleCodes();
        return list as JailRole[];
    }

    async getAlternateAssignmentTypes(): Promise<AlternateAssignment[]> {
        const list = await this._client.GetOtherAssignCodes();
        return list as AlternateAssignment[];
    }

}