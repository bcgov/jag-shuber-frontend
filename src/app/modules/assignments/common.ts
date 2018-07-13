import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    AssignmentDutyMap,
    Assignment,
    AssignmentMap,
    AssignmentDuty,
    AlternateAssignmentMap,
    CourtRoleMap,
    CourtroomMap
} from '../../api/Api';

export interface AssignmentModuleState {
    // Assignments
    assignmentMap?: RequestActionState<AssignmentMap>;
    createAssignment?: RequestActionState<Assignment>;
    updateAssignment?: RequestActionState<Assignment>;
    deleteAssignmentDutyRecurrence?: RequestActionState<void>;

    alternateAssignmentMap?: RequestActionState<AlternateAssignmentMap>;
    courtRoleMap?: RequestActionState<CourtRoleMap>;
    courtroomMap?: RequestActionState<CourtroomMap>;

    // Duties
    assignmentDutyMap?: RequestActionState<AssignmentDutyMap>;
    createAssignmentDuty?: RequestActionState<AssignmentDuty>;
    updateAssignmentDuty?: RequestActionState<AssignmentDuty>;
    deleteAssignmentDuty?: RequestActionState<void>;
    createDefaultDuties?: RequestActionState<AssignmentDuty[]>;

    // Sheriff Duties
    deleteSheriffDuty?: RequestActionState<void>;

}
export const STATE_KEY: string = 'assignments';