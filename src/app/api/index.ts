export {
    Sheriff,
    Assignment,
    AssignmentMap,
    AssignmentDuty,
    AssignmentDutyDetails,
    AssignmentDutyMap,
    SheriffMap,
    StringMap,
    BLANK_SHERIFF,
    DateType,
    DaysOfWeek,
    DEFAULT_RECURRENCE,
    DutyRecurrence,
    Courthouse,
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
    Run,
    RunMap,
    JailRole,
    JailRoleMap,
    AlternateAssignment,
    AlternateAssignmentMap
} from './Api';

// Todo: We need to create reducers for the following
export {
    WORK_SECTIONS,
    TRAINING_TYPES,
    COURTHOUSES,
    COURTROOMS,
    JAIL_ROLES,
    RUNS,
    ALTERNATE_ASSIGNMENTS
} from './Mock/MockData';

import Client from './Client';
import MockClient from './Mock/MockApi';

const mock = false;

const client = mock ? new MockClient() : new Client(`/api/v1`);

export default client;
