import {
    API,
    CourtAssignment,
    OtherAssignment,
    JailAssignment,
    EscortAssignment,
    RecurrenceInfo
} from '../Api';
import APIClient from '../Client';
import { courthouseCode } from '../index';
import './shape-matchers.ts';

const DutyRecurrenceShape: RecurrenceInfo = {
    id: 'some string',
    assignmentIdPath: 'some string',
    daysBitmap: 31,
    startTime: '11:00:00',
    endTime: '12:00:00',
    sheriffsRequired: 3
}

const CourtAssignmentShape: CourtAssignment = {
    courthouseId: 'to replace',
    workSectionId: 'COURTS',
    courtroomId: 'courtrooms/someid',
    id: 'someString',
    title: 'Some title string',
    dutyRecurrences: [
        DutyRecurrenceShape
    ]
};

const EscortAssignmentShape: EscortAssignment = {
    workSectionId: 'ESCORTS',
    id: 'some string',
    courthouseId: 'some string',
    title: 'Some escort title',
    runId: 'some string',
    dutyRecurrences: [
        DutyRecurrenceShape
    ]
};

const JailAssignmentShape: JailAssignment = {
    workSectionId: 'JAIL',
    id: 'some string',
    courthouseId: 'some string',
    title: 'Some escort title',
    jailRoleId: ' some string',
    dutyRecurrences: [
        DutyRecurrenceShape
    ]
};

const OtherAssignmentShape: OtherAssignment = {
    workSectionId: 'OTHER',
    id: 'some string',
    courthouseId: 'some string',
    title: 'Some escort title',
    otherAssignmentTypeId: 'some string',
    dutyRecurrences: [
        DutyRecurrenceShape
    ]
};

describe('Client Assignment API', () => {
    let client: API;
    let currentCourthousePath: string;
    beforeEach(async (done) => {
        client = new APIClient('http://api-test.192.168.99.100.nip.io/api', courthouseCode);
        currentCourthousePath = await (client as APIClient).getCurrentCourtHousePath();
        done();
    });

    // afterEach(() => {

    // });

    describe('Get Assignments', () => {
        it('Should return assignments', async () => {
            let list = await client.getAssignments();
            expect(list).toBeDefined();
            expect(Array.isArray(list)).toBeTruthy();
            let item = list[0];
            expect(item).toMatchOneOf([
                CourtAssignmentShape,
                EscortAssignmentShape,
                JailAssignmentShape,
                OtherAssignmentShape
            ]);
        });
    });

    describe('Create Recurrence', () => {
        it('Should create a duty recurrence', async () => {
            expect.assertions(1);
            let list = await client.getAssignments();
            let item = list[0];
            let createdRecurrences = await (client as APIClient).createRecurrences(item.id, [
                {
                    sheriffsRequired: 2,
                    startTime: "11:00",
                    endTime: "12:00",
                    daysBitmap: 12
                }
            ]) as RecurrenceInfo[];
            expect(createdRecurrences[0]).toMatchShapeOf(DutyRecurrenceShape);
        });
    });


    describe('Create Assignment', () => {

        const newDutyRecurrence: RecurrenceInfo = {
            startTime: "10:00:00",
            endTime: "12:00:00",
            daysBitmap: 31,
            sheriffsRequired: 2
        };

        let newCourtAssignment: Partial<CourtAssignment> = {
            courthouseId: 'to replace',
            courtroomId: 'to replace',
            title: 'Some Court Assignment',
            workSectionId: 'COURTS',
            dutyRecurrences: [
                { ...newDutyRecurrence }
            ]
        };

        beforeAll(async (done) => {
            const courtrooms = await client.getCourtrooms();
            newCourtAssignment.courtroomId = courtrooms[0].id;
            done();
        });

        it('Should return created assignment with ids', async () => {
            expect.assertions(3);
            let newAssignment = await client.createAssignment(newCourtAssignment);
            expect(newAssignment).toBeDefined();
            expect(newAssignment).toMatchShapeOf(CourtAssignmentShape);
            expect(newAssignment.id).not.toBe(newCourtAssignment.id);
        });
    });






});


