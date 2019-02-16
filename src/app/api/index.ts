export {
    Sheriff,
    Assignment,
    AssignmentMap,
    BaseAssignment,
    AssignmentDuty,
    AssignmentDutyMap,
    SheriffMap,
    StringMap,
    BLANK_SHERIFF,
    DateType,
    DaysOfWeek,
    DEFAULT_RECURRENCE,
    DutyRecurrence,
    Location,
    Region,
    Courtroom,
    API,
    IdType,
    Shift,
    Leave,
    SheriffDuty,
    TimeType,
    WorkSectionCode,
    CourtroomMap,
    EscortRun,
    RunMap,
    JailRole,
    JailRoleMap,
    AlternateAssignment,
    AlternateAssignmentMap,
    SheriffUnassignedRange,
    WORK_SECTIONS,
    DateRange
} from './Api';

import Client from './Client';
import resolveAppUrl from '../infrastructure/resolveAppUrl';

const client = new Client(resolveAppUrl('/api/v1'));
export default client;
