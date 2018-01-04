import { randomDelay } from './PromiseExtensions';
import { fetchRandomPeople, ApiPerson } from './_randomPeople';

export enum SheriffAbility {
    None = 0,
    CanTransfer = 1 << 0,
    CourtAppearance = 1 << 1,
    SignDocuments = 1 << 2,
    All = CanTransfer | CourtAppearance | SignDocuments
}


export interface Sheriff {
    name: string
    badgeNumber: number
    imageUrl?: string
    abilities: SheriffAbility
}

export interface SheriffTask {
    id: number;
    title: string;
    description: string;
    requiredAbilities: SheriffAbility;
    sheriffIds: number[];
}

export interface API {
    getSheriffs(): Promise<SheriffMap>;
    getSheriffTasks(): Promise<SheriffTaskMap>;
    createSheriff(newSheriff:Sheriff): Promise<Sheriff>;
    createTask(newTask:SheriffTask): Promise<SheriffTask>;
}

// type SheriffKey = Sheriff["badgeNumber"];

export type SheriffMap = {[key:number]:Sheriff}

// type SheriffTaskKey = SheriffTask['id'];
export type SheriffTaskMap = {[key:number]:SheriffTask}

function arrayToMap<T,TKey>(array: T[], keySelector: (t: T) => TKey) {
    const mappedArray  = array.reduce<any>((map,i)=>{
        map[keySelector(i)] = i;
        return map;
    },{});
    return mappedArray;
}


class Client implements API {
   
    async getSheriffs(): Promise<SheriffMap> {
        if(sheriffList.length==0){
            let people = await fetchRandomPeople(5);
            let badgeNumber = 0;

            sheriffList = people.results.map(p => {
                let s: Sheriff = {
                    name: `${p.name.first} ${p.name.last}`,
                    badgeNumber: badgeNumber++,
                    imageUrl: p.picture.large,
                    abilities: SheriffAbility.All
                };
                return s;
            });
        }
        return arrayToMap(sheriffList,(s)=>s.badgeNumber) as SheriffMap;
    }

    async getSheriffTasks() : Promise<SheriffTaskMap> {
        // await randomDelay(200, 1000);
        const taskMap : SheriffTaskMap = arrayToMap(tasks,(t)=>t.id);
        return Promise.resolve(taskMap);
    }

    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        await randomDelay();
        
        if(!newSheriff.imageUrl){
            let randomNumber = Math.floor(Math.random() * 86) + 11; 
            let randomSheriff = await fetchRandomPeople(randomNumber);
            let person: ApiPerson = randomSheriff.results[randomNumber-1];
            newSheriff.imageUrl=person.picture.large;
        }

        sheriffList.push(newSheriff);
        return newSheriff;
    }

    async createTask(newTask: SheriffTask) : Promise<SheriffTask> {
        await randomDelay();
        
        tasks.push(newTask);

        return newTask;
    }
}

let sheriffList: Sheriff[] = [];

const tasks: SheriffTask[] = [
    {
        id: 0,
        title: 'Court Security',
        description: 'Courtroom 101 (10:00am)',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: []
    },
    {
        id: 1,
        title: 'Escort Service',
        description: 'Transfer from Location Y to Courthouse B',
        requiredAbilities: SheriffAbility.CanTransfer,
        sheriffIds: [3]
    },
    {
        id: 2,
        title: 'Document Service',
        description: 'Serve documents A, B, and C',
        requiredAbilities: SheriffAbility.CourtAppearance,
        sheriffIds: [1]
    },
    {
        id: 3,
        title: 'Court Security',
        description: 'Courtroom 101 (2:00pm)',
        requiredAbilities: SheriffAbility.All,
        sheriffIds: [0, 5]
    },
    {
        id: 4,
        title: 'Court Security',
        description: 'Courtroom 102 (2:00pm)',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: []
    },
    {
        id: 5,
        title: 'Escort Service',
        description: 'Transfer from Courthouse B to Location X',
        requiredAbilities: SheriffAbility.CanTransfer | SheriffAbility.CourtAppearance,
        sheriffIds: []
    },
];

export default new Client();