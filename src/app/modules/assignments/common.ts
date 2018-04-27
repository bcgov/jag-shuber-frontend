import { RequestActionState } from '../../infrastructure/RequestAction';
import {
    AssignmentDutyMap,
    Assignment,
    AssignmentMap,
    AssignmentDuty
} from '../../api/index';
import { AssignmentDutyDetailsMap } from '../../api/Api';

export interface AssignmentModuleState {
    // Assignments
    assignmentMap?: RequestActionState<AssignmentMap>;
    createAssignment?: RequestActionState<Assignment>;
    updateAssignment?: RequestActionState<Assignment>;

    // Duties
    assignmentDutyMap?: RequestActionState<AssignmentDutyMap>;
    createAssignmentDuty?: RequestActionState<AssignmentDuty>;
    updateAssignmentDuty?: RequestActionState<AssignmentDuty>;
    deleteAssignmentDuty?: RequestActionState<void>;
    createDefaultDuties?: RequestActionState<AssignmentDuty[]>;
    assignemtnDutyDetailsMap?: RequestActionState<AssignmentDutyDetailsMap>;
}
export const STATE_KEY: string = 'assignments';