import { RequestActionState } from "../../infrastructure/RequestAction";
import {
    AssignmentDutyMap,
    AssignmentTemplate,
    AssignmentTemplateMap,
    Assignment,
    AssignmentMap,
    AssignmentDuty
} from "../../api/index";

export interface AssignmentModuleState {
    // Assignments
    assignmentMap?: RequestActionState<AssignmentMap>;
    createAssignment?: RequestActionState<Assignment>;
    updateAssignment?: RequestActionState<Assignment>;

    // templates
    templateMap?: RequestActionState<AssignmentTemplateMap>;
    createTemplate?: RequestActionState<AssignmentTemplate>;
    updateTemplate?: RequestActionState<AssignmentTemplate>;
    deleteTemplate?: RequestActionState<void>;

    // Duties
    assignmentDutyMap?: RequestActionState<AssignmentDutyMap>;
    createAssignmentDuty?: RequestActionState<AssignmentDuty>;
    updateAssignmentDuty?: RequestActionState<AssignmentDuty>;
    deleteAssignmentDuty?: RequestActionState<void>;
}
export const STATE_KEY: string = "assignments";