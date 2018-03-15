import {
    EscortAssignment,
    Assignment,
    CourtAssignment,
    JailAssignment,
    OtherAssignment,
    WorkSectionId
} from './Api';

export function isCourtAssignment(assignment: Partial<Assignment>): assignment is CourtAssignment {
    return (<CourtAssignment> assignment).workSectionId === 'COURTS';
}

export function isJailAssignment(assignment: Partial<Assignment>): assignment is JailAssignment {
    return (<JailAssignment> assignment).workSectionId === 'JAIL';
}

export function isEscortAssignment(assignment: Partial<Assignment>): assignment is EscortAssignment {
    return (<EscortAssignment> assignment).workSectionId === 'ESCORTS';
}

export function isOtherAssignment(assignment: Partial<Assignment>): assignment is OtherAssignment {
    return (<OtherAssignment> assignment).workSectionId === 'OTHER';
}

export function getWorkSectionColour(workSectionId?: WorkSectionId): string {
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
            colour = '#D9D9D9';
            break;
    }
    return colour;
}