/**
 * @jest-environment node
 */
import * as moment from 'moment';
import {
    API,
    AssignmentDuty,
    RecurrenceInfo,
    DaysOfWeek,
    SheriffDuty,
} from '../Api';
import { default as APIClient, toWorkSectionCodePath, toServerDateTime } from '../Client';
import * as TestUtils from '../../infrastructure/TestUtils';
import { createClient, HalRestClient } from 'hal-rest-client';

const DutyShape: AssignmentDuty = {
    id: 'some/string',
    assignmentId: 'someString',
    startDateTime: 'some/string',
    endDateTime: 'some/string',
    sheriffsRequired: 2,
    sheriffDuties: [
        {
            id: 'some/id',
            dutyId: 'some/id',
            sheriffId: 'some string',
            endDateTime: 'some string',
            startDateTime: 'string date'
        },
        {
            id: 'some/id',
            dutyId: 'some/id',
            sheriffId: undefined,
            endDateTime: 'some string',
            startDateTime: 'string date'
        }
    ]
};

const testDuty: AssignmentDuty = {
    id: 'to replace',
    assignmentId: 'to replace',
    sheriffsRequired: 2,
    endDateTime: moment().endOf('day').subtract(3, 'hours').toISOString(),
    startDateTime: moment().startOf('day').add(5, 'hours').toISOString(),
    sheriffDuties: []
};

describe('Client Duty API', () => {
    let api: API;
    let halClient: HalRestClient;

    const testRegion = {
        id: '',
        regionCd: 'testRegion',
        regionName: 'Test Region'
    };

    const testCourthouse = {
        id: '',
        courthouseCd: 'test',
        courthouseName: 'Test Courthouse',
        region: 'toReplace'
    };

    const testSheriff = {
        firstName: 'Bill',
        lastName: 'Nye',
        badgeNo: '1337',
        imageUrl: '',
        id: '',
        courthouse: '',
        userid: 'test-user-id',
        sheriffRankCode: '/sheriffRankCodes/DEPUTYSHERIFF'

    };

    const testCourtroom = {
        id: '',
        courtroomCd: 'testCourtroom',
        courtroomName: 'Test Courtroom',
        courthouse: 'to replace'
    };

    const testAssignment = {
        id: '',
        workSectionCode: toWorkSectionCodePath('COURTS'),
        courthouse: '',
        courtroom: '',
        title: 'Test Assignment',
        effectiveDate: moment().subtract(1, 'day').toISOString(),
    };
    const testResources: (string | undefined)[] = [];

    async function deleteTestResources() {
        const reverseResources = testResources.reverse().filter(id => id !== '');
        try {
            for (let i = 0; i < reverseResources.length; ++i) {
                const id = reverseResources[i] as string;
                await halClient.delete(id);
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function getOrCreateTestResources() {
        try {
            const { props: { idPath: regionIdPath } } = await halClient.create('/regions', testRegion);
            testRegion.id = testCourthouse.region = regionIdPath;
            testResources.push(testRegion.id);
            const { props: { idPath: courthouseIdPath } } = await halClient.create('/courthouses', testCourthouse);
            testCourthouse.id
                = testCourtroom.courthouse
                = testAssignment.courthouse
                = testSheriff.courthouse
                = courthouseIdPath;
            testResources.push(testCourthouse.id);
            const { props: { idPath: sheriffIdPath } } = await halClient.create('/sheriffs', testSheriff);
            testSheriff.id = sheriffIdPath;
            testResources.push(testSheriff.id);
            const { props: { idPath: courtroomIdPath } } = await halClient.create('/courtrooms', testCourtroom);
            testCourtroom.id = testAssignment.courtroom = courtroomIdPath;
            testResources.push(testCourtroom.id);
            const { props: { idPath: assignmentIdPath } } = await halClient.create('/assignments', testAssignment);
            testAssignment.id = assignmentIdPath;
            testResources.push(testAssignment.id);
        } catch (e) {
            console.error(e);
            await deleteTestResources();
            throw e;
        }
    }

    beforeAll(async (done) => {
        const apiBaseUrl = 'http://api-test.192.168.99.100.nip.io/api';
        halClient = createClient(apiBaseUrl);
        await getOrCreateTestResources();
        api = new APIClient(apiBaseUrl, testCourthouse.courthouseCd);
        done();
    });

    afterAll(async (done) => {
        await deleteTestResources();
        done();
    });

    describe('CRUD Operations', () => {
        let dutyToDelete: AssignmentDuty;
        let sheriffDutyToDelete: SheriffDuty;

        async function createTestSheriffDuty() {
            const sdToCreate: Partial<SheriffDuty> = {
                dutyId: dutyToDelete.id,
                startDateTime: testDuty.startDateTime,
                endDateTime: testDuty.endDateTime
            };
            const sheriffDuty = await api.createSheriffDuty(sdToCreate);
            return sheriffDuty;
        }
        describe('Create', () => {
            it('Should create and return new duty', async () => {
                const dutyToCreate = {
                    ...testDuty,
                    assignmentId: testAssignment.id
                };

                dutyToDelete = await api.createAssignmentDuty(dutyToCreate);
                expect(dutyToDelete).toBeDefined();
                expect(dutyToDelete.id).not.toEqual(testDuty.id);
                expect(dutyToDelete).toMatchShapeOf(DutyShape);
            });

            it('Should create and return new SheriffDuty', async () => {
                sheriffDutyToDelete = await createTestSheriffDuty();
                expect(sheriffDutyToDelete).toMatchOneOf(DutyShape.sheriffDuties);
            });

            it('Should created duties embedded in new duty', async () => {

                const dutyToCreate: Partial<AssignmentDuty> = {
                    ...testDuty,
                    assignmentId: testAssignment.id,
                    sheriffDuties: [
                        {
                            startDateTime: toServerDateTime(moment(testDuty.startDateTime).add(1, 'hour')),
                            endDateTime: toServerDateTime(moment(testDuty.endDateTime).add(1, 'hour'))
                        }
                    ] as SheriffDuty[]
                };
                const createdDuty = await api.createAssignmentDuty(dutyToCreate);
                try {
                    expect(createdDuty).toMatchShapeOf(DutyShape);
                    expect(Array.isArray(createdDuty.sheriffDuties)).toBeTruthy();
                    const createdSheriffDuty = createdDuty.sheriffDuties[0];
                    expect(createdSheriffDuty).toBeDefined();
                    expect(createdSheriffDuty.id).toBeDefined();
                    expect(createdSheriffDuty.dutyId).toEqual(createdDuty.id);
                    expect(createdSheriffDuty.startDateTime).toEqual(dutyToCreate.sheriffDuties![0].startDateTime);
                    expect(createdSheriffDuty.endDateTime).toEqual(dutyToCreate.sheriffDuties![0].endDateTime);
                } finally {
                    // cleanup
                    await (api as APIClient).deleteResource(createdDuty.id);
                }
            });
        });

        describe('Update', () => {

            it('Update sheriffDuty should update and return the updated record', async () => {
                const newSheriffDutyProps: Partial<SheriffDuty> = {
                    ...sheriffDutyToDelete,
                    sheriffId: testSheriff.id,
                    endDateTime: moment().add(1, 'day').add(2, 'hours').toISOString(),
                    startDateTime: moment().add(1, 'day').toISOString(),
                };

                const updatedSheriffDuty = await api.updateSheriffDuty(newSheriffDutyProps);
                expect(updatedSheriffDuty).toEqual({
                    ...newSheriffDutyProps,
                    endDateTime: toServerDateTime(newSheriffDutyProps.endDateTime),
                    startDateTime: toServerDateTime(newSheriffDutyProps.startDateTime)
                });
            });

            it('Update duty properties should update duty and return the updated record back', async () => {
                const newDutyProps: Partial<AssignmentDuty> = {
                    ...dutyToDelete,
                    sheriffsRequired: 12,
                    endDateTime: moment().add(1, 'day').add(2, 'hours'),
                    startDateTime: moment().add(1, 'day')
                };

                dutyToDelete = await api.updateAssignmentDuty(newDutyProps);
                expect(dutyToDelete).toEqual({
                    ...newDutyProps,
                    startDateTime: toServerDateTime(newDutyProps.startDateTime),
                    endDateTime: toServerDateTime(newDutyProps.endDateTime)
                });
            });

            it('Updating duty with additional sheriffDuties should create them', async () => {
                const newDutyProps: Partial<AssignmentDuty> = {
                    ...dutyToDelete,
                    sheriffDuties: [
                        {
                            startDateTime: dutyToDelete.startDateTime,
                            endDateTime: dutyToDelete.endDateTime
                        }
                    ] as SheriffDuty[]
                };

                dutyToDelete = await api.updateAssignmentDuty(newDutyProps);

                expect(dutyToDelete.sheriffDuties).toBeDefined();
                expect(Array.isArray(dutyToDelete.sheriffDuties)).toBeTruthy();
                expect(dutyToDelete.sheriffDuties.length).toEqual(1);
                const createdSheriffDuty = dutyToDelete.sheriffDuties[0];
                expect(createdSheriffDuty).toMatchOneOf(DutyShape.sheriffDuties);
                expect(createdSheriffDuty.dutyId).toEqual(dutyToDelete.id);
                expect(createdSheriffDuty.startDateTime).toContain(newDutyProps.sheriffDuties![0].startDateTime);
                expect(createdSheriffDuty.endDateTime).toContain(newDutyProps.sheriffDuties![0].endDateTime);
            });

            it('Updating SheriffDuties in Duty should update all the records', async () => {

                const newDutyProps: Partial<AssignmentDuty> = {
                    ...dutyToDelete,
                };

                // Update existing sheriff Duty
                const sheriffDutyToUpdate = newDutyProps.sheriffDuties![0];
                const updatedSheriffDutyProps: Partial<SheriffDuty> = {
                    ...sheriffDutyToUpdate,
                    startDateTime: toServerDateTime(moment(dutyToDelete.startDateTime).add(30, 'm')),
                    sheriffId: testSheriff.id
                };

                // Updating a sheriffDuty and adding a new one
                newDutyProps.sheriffDuties = [
                    updatedSheriffDutyProps,
                    {
                        startDateTime: toServerDateTime(dutyToDelete.startDateTime),
                        endDateTime: toServerDateTime(dutyToDelete.endDateTime)
                    }
                ] as SheriffDuty[];

                dutyToDelete = await api.updateAssignmentDuty(newDutyProps);

                expect(dutyToDelete.sheriffDuties).toBeDefined();
                expect(Array.isArray(dutyToDelete.sheriffDuties)).toBeTruthy();
                expect(dutyToDelete.sheriffDuties.length).toEqual(2);
                expect(dutyToDelete).toMatchShapeOf(DutyShape);

                // SheriffId's should all be associated with this duty
                dutyToDelete.sheriffDuties.forEach(sd => {
                    expect(sd.dutyId).toEqual(dutyToDelete.id);
                });

                // Check the updated sheriffDuty
                const returnedUpdatedSD = dutyToDelete.sheriffDuties.find(sd => sd.id === updatedSheriffDutyProps.id);
                expect(returnedUpdatedSD).toBeDefined();
                expect(returnedUpdatedSD!.id).toEqual(updatedSheriffDutyProps.id);
                expect(returnedUpdatedSD!.startDateTime).toContain(updatedSheriffDutyProps.startDateTime);
                expect(returnedUpdatedSD!.endDateTime).toContain(updatedSheriffDutyProps.endDateTime);

                // Check the created SheriffDuty
                const returnedCreatedSD = dutyToDelete.sheriffDuties.find(sd => sd.id !== updatedSheriffDutyProps.id);
                expect(returnedCreatedSD!.id).toBeDefined();
                expect(returnedCreatedSD!.startDateTime).toContain(newDutyProps.sheriffDuties[1].startDateTime);
                expect(returnedCreatedSD!.endDateTime).toContain(newDutyProps.sheriffDuties[1].endDateTime);
            });

        });

        describe('Delete', () => {
            it('Delete sheriff duty', async () => {
                expect.assertions(1);
                await api.deleteSheriffDuty(sheriffDutyToDelete.id);
                await TestUtils.expectNoResource(api, sheriffDutyToDelete.id);
            });

            it('Deleting Duty should delete duty and sheriffDuties', async () => {
                expect.assertions(2);
                const sheriffDuty = await createTestSheriffDuty();
                await api.deleteAssignmentDuty(dutyToDelete.id);
                await TestUtils.expectNoResource(api, dutyToDelete.id);
                await TestUtils.expectNoResource(api, sheriffDuty.id);
            });
        });
    });

    describe('Create default duties & Get Duties by date range', () => {
        let createdRecurrences: RecurrenceInfo[];
        const expectedDateTimes = [
            {
                startDateTime: moment().startOf('day').add(9, 'hours'),
                endDateTime: moment().startOf('day').add(11, 'hours')
            },
            {
                startDateTime: moment().startOf('day').add(14, 'hours'),
                endDateTime: moment().startOf('day').add(17, 'hours')
            }
        ];

        beforeAll(async (done) => {
            // create two recurrences for everyday
            const recurrencesToCreate = expectedDateTimes.map<RecurrenceInfo>(dt => (
                {
                    startTime: dt.startDateTime.format('HH:mm:ss'),
                    endTime: dt.endDateTime.format('HH:mm:ss'),
                    sheriffsRequired: 2,
                    daysBitmap: DaysOfWeek.Everyday
                }
            ));
            createdRecurrences = await (api as APIClient).createRecurrences(testAssignment.id, recurrencesToCreate);
            done();
        });

        describe('Create Default duties & Get Duties for today', () => {
            let createdDefaultDuties: AssignmentDuty[];
            it('getAssignmentDuties() should return an empty list if no duties are on a given day', async () => {
                const list = await api.getAssignmentDuties();
                expect(list).toBeDefined();
                expect(Array.isArray(list)).toBeTruthy();
                expect(list.length).toEqual(0);
            });

            it('createDefaultDuties() should create & return duties for today given no argument', async () => {
                createdDefaultDuties = await api.createDefaultDuties();
                expect(createdDefaultDuties).toBeDefined();
                expect(Array.isArray(createdDefaultDuties)).toBeTruthy();
                expect(createdDefaultDuties.length).toEqual(createdRecurrences.length);

                // Check id's of each duty
                createdDefaultDuties.forEach(dd => {
                    expect(dd.assignmentId).toEqual(testAssignment.id);
                    expect(dd.dutyRecurrenceId).toMatchOneOf(createdRecurrences.map(r => r.id));
                    // todo: check the start/end datetimes?
                });
                expect(createdDefaultDuties[0]).toMatchShapeOf(DutyShape);
            });

            it('getAssignmentDuties() should return the duties for today given no argument', async () => {
                const list = await api.getAssignmentDuties();
                expect(list).toBeDefined();
                expect(Array.isArray(list)).toBeTruthy();
                expect(list.length).toEqual(createdDefaultDuties.length);
                expect(list[0]).toMatchShapeOf(DutyShape);
                expect(list).toEqual(expect.arrayContaining(createdDefaultDuties));
            });

            afterAll(async (done) => {
                await Promise.all(createdDefaultDuties.map(d => (api as APIClient).deleteResource(d.id)));
            });
        });

        describe('Create Default duties & Get Duties for a given date', () => {
            const testDate = moment().add(4, 'days');
            let createdDefaultDuties: AssignmentDuty[];
            it('getAssignmentDuties() should return an empty list if no duties are on a given date', async () => {
                const list = await api.getAssignmentDuties(testDate);
                expect(list).toBeDefined();
                expect(Array.isArray(list)).toBeTruthy();
                expect(list.length).toEqual(0);
            });

            it('createDefaultDuties() should create & return duties for a given date', async () => {
                createdDefaultDuties = await api.createDefaultDuties(testDate);
                expect(createdDefaultDuties).toBeDefined();
                expect(Array.isArray(createdDefaultDuties)).toBeTruthy();
                expect(createdDefaultDuties.length).toEqual(createdRecurrences.length);
                expect(createdDefaultDuties[0]).toMatchShapeOf(DutyShape);
            });

            it('getAssignmentDuties() should return the duties for given date', async () => {
                const list = await api.getAssignmentDuties(testDate);
                expect(list).toBeDefined();
                expect(Array.isArray(list)).toBeTruthy();
                expect(list.length).toEqual(createdDefaultDuties.length);
                expect(list).toEqual(expect.arrayContaining(createdDefaultDuties));
            });

            afterAll(async (done) => {
                await Promise.all(createdDefaultDuties.map(d => (api as APIClient).deleteResource(d.id)));
            });
        });
    });
});
