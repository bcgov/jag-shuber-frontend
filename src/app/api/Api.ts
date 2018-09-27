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
    code: string;
    subCode: string;
    description: string;
    expiryDate?: DateType;
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

export interface API {

    // Sheriffs
    getSheriffs(): Promise<Sheriff[]>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff>;

    // Assignments
    getAssignments(dateRange: DateRange): Promise<Assignment[]>;
    createAssignment(assignment: Partial<Assignment>): Promise<Assignment>;
    updateAssignment(assignment: Partial<Assignment>): Promise<Assignment>;
    deleteAssignment(assignmentId: IdType): Promise<void>;
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
    getLeaveCancelCodes(): Promise<LeaveCancelCode[]>;

    getCourtrooms(): Promise<Courtroom[]>;
    getEscortRuns(): Promise<EscortRun[]>;
    getJailRoles(): Promise<JailRole[]>;
    getAlternateAssignmentTypes(): Promise<AlternateAssignment[]>;
    getSheriffRankCodes(): Promise<SheriffRank[]>;
    getCourtRoles(): Promise<CourtRole[]>;
    getGenderCodes(): Promise<GenderCode[]>;

    getLocations(): Promise<Location[]>;

    getToken(): Promise<string>;
    logout(): Promise<void>;
}