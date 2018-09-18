import moment from 'moment';
import {
    EscortAssignment,
    Assignment,
    CourtAssignment,
    JailAssignment,
    OtherAssignment,
    WorkSectionCode,
    Shift,
    DateType,
    DaysOfWeek,
    IdType
} from './Api';

export type ShiftCreationPayload = {
    weekStart: DateType;
    workSectionId?: WorkSectionCode;
    startTime: DateType;
    endTime: DateType;
    days: DaysOfWeek;
    repeatNumber: number;
    assignmentId?: IdType;
};

export function isCourtAssignment(assignment: Partial<Assignment>): assignment is CourtAssignment {
    return (<CourtAssignment>assignment).workSectionId === 'COURTS';
}

export function isJailAssignment(assignment: Partial<Assignment>): assignment is JailAssignment {
    return (<JailAssignment>assignment).workSectionId === 'JAIL';
}

export function isEscortAssignment(assignment: Partial<Assignment>): assignment is EscortAssignment {
    return (<EscortAssignment>assignment).workSectionId === 'ESCORTS';
}

export function isOtherAssignment(assignment: Partial<Assignment>): assignment is OtherAssignment {
    return (<OtherAssignment>assignment).workSectionId === 'OTHER';
}

export function getWorkSectionColour(workSectionId?: WorkSectionCode): string {
    let colour;

    switch (workSectionId) {
        case 'COURTS':
            colour = '#2CB7BA';
            break;
        case 'ESCORTS':
            colour = '#F3BD48';
            break;
        case 'JAIL':
            colour = '#804A86';
            break;
        case 'OTHER':
            colour = '#B74343';
            break;
        default:
            colour = '#999999';
            break;
    }
    return colour;
}

export class ShiftFactory {
    static createShifts(shiftInfo: ShiftCreationPayload): Partial<Shift>[] {
        let partialShifts: Partial<Shift>[] = [];
        const dayNumbers = DaysOfWeek.getWeekdayNumbers(shiftInfo.days);

        dayNumbers.forEach(day => {
            const startTimeMoment = moment(shiftInfo.startTime);
            const endTimeMoment = moment(shiftInfo.endTime);

            let newShift = {
                workSectionId: shiftInfo.workSectionId,
                startDateTime: moment(shiftInfo.weekStart).day(0).add(
                    { days: day, hours: startTimeMoment.hours(), minutes: startTimeMoment.minutes() }
                ),
                endDateTime: moment(shiftInfo.weekStart).day(0).add(
                    { days: day, hours: endTimeMoment.hours(), minutes: endTimeMoment.minutes() }
                ),
                assignmentId: shiftInfo.assignmentId
            };

            for (let i = 1; i <= shiftInfo.repeatNumber; i++) {
                partialShifts.push(newShift);
            }

        });

        return partialShifts;
    }
}