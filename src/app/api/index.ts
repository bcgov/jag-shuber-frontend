import { randomDelay } from './PromiseExtensions';
import { fetchRandomPeople } from './_randomPeople';
import * as moment from 'moment';

export enum SheriffAbility {
    None = 0,
    CanTransfer = 1 << 0,
    CourtAppearance = 1 << 1,
    SignDocuments = 1 << 2,
    All = CanTransfer | CourtAppearance | SignDocuments
}

type DateType = Date | number | moment.Moment;

export interface Sheriff {
    firstName: string;
    lastName: string;
    badgeNumber: number;
    imageUrl?: string;
    abilities: SheriffAbility;
    training: [{
        trainingType: string;
        certificationDate: string;
        expiryDate: string;
    }];
    permanentWorksite?: string;
    permanentLocation?: string;
    currentWorksite?: string;
    currentLocation?: string;

}

export interface SheriffAssignment {
    id: number;
    title: string;
    description: string;
    requiredAbilities: SheriffAbility;
    sheriffIds: number[];
    startTime: DateType,
    endTime: DateType
}

export interface API {
    getSheriffs(): Promise<SheriffMap>;
    getSheriffAssignments(): Promise<SheriffAssignmentMap>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    createAssignment(newAssignment: SheriffAssignment): Promise<SheriffAssignment>;
}

export type SheriffMap = { [key: number]: Sheriff }

export type SheriffAssignmentMap = { [key: number]: SheriffAssignment }

function arrayToMap<T, TKey>(array: T[], keySelector: (t: T) => TKey) {
    const mappedArray = array.reduce<any>((map, i) => {
        map[keySelector(i)] = i;
        return map;
    }, {});
    return mappedArray;
}


class Client implements API {

    async getSheriffs(): Promise<SheriffMap> {
        if (sheriffList.length == 0) {
            let people = await fetchRandomPeople(5);
            let badgeNumber = 0;

            sheriffList = people.results.map(p => {
                let s: Sheriff = {
                    firstName: p.name.first, 
                    lastName: p.name.last,
                    badgeNumber: badgeNumber++,
                    imageUrl: p.picture.large,
                    permanentLocation: "Permanent Location", 
                    permanentWorksite: "Permanent Worksite", 
                    currentLocation: "Current Location", 
                    currentWorksite: "Current Worksite",
                    training: [
                        {certificationDate:"Certification Type", expiryDate:"Expiry Date", trainingType: "Trainging Type"}
                    ],
                    abilities: SheriffAbility.All
                };
                return s;
            });
        }
        return arrayToMap(sheriffList, (s) => s.badgeNumber) as SheriffMap;
    }

    async getSheriffAssignments(): Promise<SheriffAssignmentMap> {
        // await randomDelay(200, 1000);
        const assignmentMap: SheriffAssignmentMap = arrayToMap(assignments, (t) => t.id);
        return Promise.resolve(assignmentMap);
    }

    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        await randomDelay();

        //This is a hack to throw in random picture
        if(!newSheriff.imageUrl){
            //let randomNumber = Math.floor(Math.random() * 86) + 11; 
            // newSheriff.imageUrl=`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
            newSheriff.imageUrl="/img/avatar.png"
        }

        sheriffList.push(newSheriff);
        return newSheriff;
    }

    async createAssignment(newAssignment: SheriffAssignment): Promise<SheriffAssignment> {
        await randomDelay();

        assignments.push(newAssignment);

        return newAssignment;
    }
}

let sheriffList: Sheriff[] = [];

const assignments: SheriffAssignment[] = [
    {
        id: 0,
        title: 'Court Security',
        description: 'Courtroom 101 (10:00am)',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour')
    },
    {
        id: 1,
        title: 'Escort Service',
        description: 'Transfer from Location Y to Courthouse B',
        requiredAbilities: SheriffAbility.CanTransfer,
        sheriffIds: [3],
        startTime: moment().add(3, 'hour'),
        endTime: moment().add(4, 'hour')
    },
    {
        id: 2,
        title: 'Document Service',
        description: 'Serve documents A, B, and C',
        requiredAbilities: SheriffAbility.CourtAppearance,
        sheriffIds: [1],
        startTime: moment().add(4, 'hour'),
        endTime: moment().add(5, 'hour')
    },
    {
        id: 3,
        title: 'Court Security',
        description: 'Courtroom 101 (2:00pm)',
        requiredAbilities: SheriffAbility.All,
        sheriffIds: [0, 4],
        startTime: moment().add(2, 'hour'),
        endTime: moment().add(3, 'hour')
    },
    {
        id: 4,
        title: 'Court Security',
        description: 'Courtroom 102 (2:00pm)',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(1, 'hour'),
        endTime: moment().add(2, 'hour')
    },
    {
        id: 5,
        title: 'Escort Service',
        description: 'Transfer from Courthouse B to Location X',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: [],
        startTime: moment().add(6, 'hour'),
        endTime: moment().add(7, 'hour')
    },
];

export default new Client();