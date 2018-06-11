import { RequestActionState } from '../../infrastructure/RequestAction';
import {
    AssignmentDutyMap,
    Assignment,
    AssignmentMap,
    AssignmentDuty,
    // AssignmentDutyDetailsMap, 
    // AssignmentDutyDetails
} from '../../api/Api';

export interface AssignmentModuleState {
    // Assignments
    assignmentMap?: RequestActionState<AssignmentMap>;
    createAssignment?: RequestActionState<Assignment>;
    updateAssignment?: RequestActionState<Assignment>;
    deleteAssignmentDutyRecurrence?: RequestActionState<void>;

    // Duties
    assignmentDutyMap?: RequestActionState<AssignmentDutyMap>;
    createAssignmentDuty?: RequestActionState<AssignmentDuty>;
    updateAssignmentDuty?: RequestActionState<AssignmentDuty>;
    deleteAssignmentDuty?: RequestActionState<void>;
    createDefaultDuties?: RequestActionState<AssignmentDuty[]>;
    // assignmentDutyDetailsMap?: RequestActionState<AssignmentDutyDetailsMap>;
    // createAssignmentDutyDetail?: RequestActionState<AssignmentDutyDetails>;
    // updateAssignmentDutyDetail?: RequestActionState<AssignmentDutyDetails>;

    // Sheriff Duties
    deleteSheriffDuty?: RequestActionState<void>;
}
export const STATE_KEY: string = 'assignments';