import { 
    EscortAssignment,
    Assignment, 
    CourtAssignment,
    JailAssignment,
    OtherAssignment
} from "./Api";

export function isCourtAssignment(assignment:Partial<Assignment>): assignment is CourtAssignment{
    return (<CourtAssignment>assignment).workSectionId == "COURTS";
}

export function isJailAssignment(assignment:Partial<Assignment>): assignment is JailAssignment{
    return (<JailAssignment>assignment).workSectionId == "JAIL";
}

export function isEscortAssignment(assignment:Partial<Assignment>): assignment is EscortAssignment{
    return (<EscortAssignment>assignment).workSectionId == "ESCORTS";
}

export function isOtherAssignment(assignment:Partial<Assignment>): assignment is OtherAssignment{
    return (<OtherAssignment>assignment).workSectionId == "OTHER";
}