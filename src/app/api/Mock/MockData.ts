import {
    Assignment,
    AssignmentDuty,
    Sheriff,
    StringMap,
    DEFAULT_RECURRENCE,
    Courthouse,
    Courtroom,
    CourtAssignment,
    JailAssignment,
    EscortAssignment,
    OtherAssignment,
    Shift,
    Leave
} from '../Api';
import * as moment from 'moment';

export const TRAINING_TYPES: StringMap = {
    FRO: 'FRO - Forced Response Option',
    PISTOL: 'PISTOL',
    CID: 'CID - Critical Incident De-Escalation',
    CEW: 'CEW - Conductive Energy Weapon'
};

export const COURTHOUSES: StringMap = {
    ABBOTSFORD: 'Abbotsford',
    ALEXISCREEK: 'Alexis Creek',
    ANAHIMLAKE: 'Anahim Lake',
    ASHCROFT: 'Ashcroft',
    ATLIN: 'Atlin',
    BELLABELLA: 'Bella Bella',
    BELLACOOLA: 'Bella Coola',
    BURNSLAKE: 'Burns Lake',
    CAMPBELLRIVER: 'Campbell River',
    CASTLEGAR: 'Castlegar',
    CHASE: 'Chase',
    CHETWYND: 'Chetwynd',
    CHILLIWACK: 'Chilliwack',
    CLEARWATER: 'Clearwater',
    COURTENAY: 'Courtenay',
    CRANBROOK: 'Cranbrook',
    CRESTON: 'Creston',
    DEASELAKE: 'Dease Lake',
    DOWNTOWNCOMMUNITYCOURT: 'Downtown Community Court',
    DUNCAN: 'Duncan',
    FERNIE: 'Fernie',
    FORTSTJAMES: 'Fort St. James',
    FORTSTJOHN: 'Fort St. John',
    FORTWARE: 'Fort Ware (Kwadacha)',
    FRASERLAKE: 'Fraser Lake',
    GANGES: 'Ganges',
    GOLDEN: 'Golden',
    GOLDRIVER: 'Gold River',
    GOODHOPELAKE: 'Good Hope Lake',
    GRANDFORKS: 'Grand Forks',
    HAZELTON: 'Hazelton',
    HOUSTON: 'Houston',
    HUDSONSHOPE: 'Hudson\'s Hope',
    INVERMERE: 'Invermere',
    KAMLOOPS: 'Kamloops',
    KELOWNA: 'KELOWNA',
    KITIMAT: 'Kitimat',
    KLEMTU: 'Klemtu',
    LILLOOET: 'Lilloet',
    LOWERPOST: 'Lower Post',
    MACKENZIE: 'Mackenzie',
    MASSET: 'Masset',
    MCBRIDE: 'McBride',
    MERRITT: 'Merritt',
    NAKUSP: 'Nakusp',
    NANAIMO: 'Nanaimo',
    NELSON: 'Nelson',
    NEWAIYANSH: 'New Aiyansh',
    NEWWESTMINSTER: 'New Westminster',
    NORTHVANCOUVER: 'North Vancouver',
    HUNDREDMILEHOUSE: '100 Mile House',
    PEMBERTON: 'Pemberton',
    PENTICTON: 'Penticton',
    PORTALBERNI: 'Port Alberni',
    PORTCOQUITLAM: 'Port Coquitlam',
    PORTHARDY: 'Port Hardy',
    POWELLRIVER: 'Powell River',
    PRINCEGEORGE: 'Prince George',
    PRINCERUPERT: 'Prince Rupert',
    PRINCETON: 'Princeton',
    QUEENCHARLOTTE: 'Queen Charlotte',
    QUESNEL: 'Quesnel',
    REVELSTOKE: 'Revelstoke',
    RICHMOND: 'Richmond',
    ROSSLAND: 'Rossland',
    SALMONARM: 'Salmon Arm',
    SECHELT: 'Sechelt',
    SIDNEY: 'Sidney',
    SMITHERS: 'Smithers',
    SPARWOOD: 'Sparwood',
    STEWART: 'Stewart',
    SURREY: 'Surrey',
    TAHSIS: 'Tahsis',
    TERRACE: 'Terrace',
    TOFINO: 'Tofino',
    TSAYKEHDENE: 'Tsay Keh Dene (Ingenika)',
    TUBLERRIDGE: 'Tumbler Ridge',
    UCLULET: 'Ucluelet',
    VALEMOUNT: 'Valemont',
    VLC: 'Vancouver - VLC',
    VANCOUVER: 'Vancouver - 222 Main',
    ROBSONSQUARE: 'Vancouver - Robson Square',
    VANDERHOOF: 'Vanderhoof',
    VERNON: 'Vernon',
    VICTORIA: 'Victoria',
    WESTERNCOMMUNITIES: 'Western Communities',
    WILLIAMSLAKE: 'Williams Lake'
};

export const WORK_SECTIONS: StringMap = {
    COURTS: 'Courts',
    JAIL: 'Jail',
    ESCORTS: 'Escorts',
    OTHER: 'Other'
};

export const COURTROOMS: StringMap = {
    '101': 'Courtroom 101',
    '102': 'Courtroom 102',
    '103': 'Courtroom 103',
    '104': 'Courtroom 104',
    '201': 'Courtroom 201',
    '202': 'Courtroom 202',
    '203': 'Courtroom 203',
    '204': 'Courtroom 204'
};

export const JAIL_ROLES: StringMap = {
    '1': 'Sergeant',
    '2': 'Deputy Sergeant',
    '3': 'Control',
    '4': 'Pre-Trial'
};

export const RUNS: StringMap = {
    '1': 'Local Run',
    '2': 'Run 1',
    '3': 'Run 2',
    '4': 'Run 3',
    '5': 'Run 4',
    '6': 'Run 5',
    '7': 'Run 6',
    '8': 'Run 7',
    '9': 'Run 8',
    '10': 'Run 9',
    '11': 'Run 10',
    '12': 'Run 11',
    '13': 'Run 12'
};

export const ALTERNATE_ASSIGNMENTS: StringMap = {
    '1': 'Gate 1',
    '2': 'Gate 2',
    '3': 'Jury Selection',
    '4': 'Jury Deliberation',
    '5': 'Documents'
};

export const sheriffList: Sheriff[] = [
    {
        id: '1',
        firstName: 'Garfield',
        lastName: 'Shirley',
        badgeNo: '969',
        imageUrl: '/img/garfield_shirley.jpg'
    },
    {
        id: '2',
        firstName: 'Jaqueline',
        lastName: 'Jackson',
        badgeNo: '204',
        imageUrl: '/img/jaqueline_jackson.jpg'
    },
    {
        id: '3',
        firstName: 'Landon',
        lastName: 'Bludnell',
        badgeNo: '790',
        imageUrl: '/img/landon_bludnell.jpg'
    },
    {
        id: '4',
        firstName: 'Rob',
        lastName: 'Lucas',
        badgeNo: '987',
        imageUrl: '/img/rob_lucas.jpg'
    },
    {
        id: '5',
        firstName: 'Steve',
        lastName: 'Gill',
        badgeNo: '932',
        imageUrl: '/img/steve_gill.jpg'
    },
    {
        id: '6',
        firstName: 'Steve',
        lastName: 'Jervis',
        badgeNo: '579',
        imageUrl: '/img/steve_jervis.jpg'
    }
];

const courtroomAssignments: CourtAssignment[] = [
    {
        id: '0',
        title: COURTROOMS[101],
        workSectionId: 'COURTS',
        courthouseId: '1',
        courtroomId: '101',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '1',
        title: COURTROOMS[102],
        workSectionId: 'COURTS',
        courthouseId: '1',
        courtroomId: '102',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '2',
        title: COURTROOMS[103],
        workSectionId: 'COURTS',
        courthouseId: '1',
        courtroomId: '103',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '3',
        title: COURTROOMS[104],
        workSectionId: 'COURTS',
        courthouseId: '1',
        courtroomId: '104',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '4',
        title: COURTROOMS[201],
        workSectionId: 'COURTS',
        courthouseId: '1',
        courtroomId: '201',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
];

const jailAssingments: JailAssignment[] = [
    {
        id: '5',
        title: JAIL_ROLES[1],
        workSectionId: 'JAIL',
        courthouseId: '1',
        jailRoleId: '1',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '6',
        title: JAIL_ROLES[2],
        workSectionId: 'JAIL',
        courthouseId: '1',
        jailRoleId: '1',
        dutyRecurrences: DEFAULT_RECURRENCE
    }
];

const escortAssignments: EscortAssignment[] = [
    {
        id: '7',
        title: RUNS[1],
        workSectionId: 'ESCORTS',
        courthouseId: '1',
        runId: '1',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '8',
        title: RUNS[2],
        workSectionId: 'ESCORTS',
        courthouseId: '1',
        runId: '2',
        dutyRecurrences: DEFAULT_RECURRENCE
    }
];

const otherAssignments: OtherAssignment[] = [
    {
        id: '9',
        title: ALTERNATE_ASSIGNMENTS[1],
        workSectionId: 'OTHER',
        courthouseId: '1',
        otherAssignmentTypeId: '1',
        dutyRecurrences: DEFAULT_RECURRENCE
    },
    {
        id: '10',
        title: ALTERNATE_ASSIGNMENTS['3'],
        workSectionId: 'OTHER',
        courthouseId: '1',
        otherAssignmentTypeId: '3',
        dutyRecurrences: DEFAULT_RECURRENCE
    }
];

function createAssignmentList(): Assignment[] {
    let assignmentList: Assignment[] = [];
    return assignmentList.concat(jailAssingments, courtroomAssignments, escortAssignments, otherAssignments);
}

export const assignments: Assignment[] = createAssignmentList();

function createAssignmentDuties(): AssignmentDuty[] {
    let duties: AssignmentDuty[] = [];
    // let incrementingId = 0;

    // assignments.forEach(assignment => {
    //     if (assignment.dutyRecurrences) {
    //         assignment.dutyRecurrences.forEach(item => {

    //             let duty: AssignmentDuty = {
    //                 id: `${incrementingId}`,
    //                 assignmentId: assignment.id,
    //                 sheriffDuties: [],
    //                 startDateTime: moment(item.startTime),
    //                 endDateTime: moment(item.endTime),
    //                 sheriffsRequired: item.sheriffsRequired
    //             };
    //             duties.push(duty);
    //             incrementingId++;
    //         });
    //     }

    // });


    return duties;
}

export const assignmentDuties: AssignmentDuty[] = createAssignmentDuties();

export const courthouses: Courthouse[] = [
    {
        id: '0',
        name: 'Abbotsford',
        
    },
    {
        id: '1',
        name: 'Alexis Creek',
        
    },
    {
        id: '2',
        name: 'Anahim Lake',
        
    },
    {
        id: '3',
        name: 'Ashcroft',
        
    },
    {
        id: '4',
        name: 'Atlin',
        
    },
    {
        id: '5',
        name: 'Bella Bella',
        
    },
    {
        id: '6',
        name: 'Bella Coola',
        
    },
    {
        id: '7',
        name: 'Burns Lake',
        
    },
    {
        id: '8',
        name: 'Campbell River',
        
    },
    {
        id: '9',
        name: 'Castlegar',
        
    },
    {
        id: '10',
        name: 'Chase',
        
    },
    {
        id: '11',
        name: 'Chetwynd',
        
    },
    {
        id: '12',
        name: 'Chilliwack',
        
    },
    {
        id: '13',
        name: 'Clearwater',
        
    },
    {
        id: '14',
        name: 'Courtenay',
        
    },
    {
        id: '15',
        name: 'Cranbrook',
        
    },
    {
        id: '16',
        name: 'Creston',
        
    },
    {
        id: '17',
        name: 'Dease Lake',
        
    },
    {
        id: '18',
        name: 'Downtown Community Court',
        
    },
    {
        id: '19',
        name: 'Duncan',
        
    },
    {
        id: '20',
        name: 'Fernie',
        
    },
    {
        id: '21',
        name: 'Fort St. James',
        
    },
    {
        id: '22',
        name: 'Fort St. John',
        
    },
    {
        id: '23',
        name: 'Fort Ware (Kwadacha)',
        
    },
    {
        id: '24',
        name: 'Fraser Lake',
        
    },
    {
        id: '25',
        name: 'Ganges',
        
    },
    {
        id: '26',
        name: 'Golden',
        
    },
    {
        id: '27',
        name: 'Gold River',
        
    },
    {
        id: '28',
        name: 'Good Hope Lake',
        
    },
    {
        id: '29',
        name: 'Grand Forks',
        
    },
    {
        id: '30',
        name: 'Hazelton',
        
    },
    {
        id: '31',
        name: 'Houston',
        
    },
    {
        id: '32',
        name: 'Hudson\'s Hope',
        
    },
    {
        id: '33',
        name: 'Invermere',
        
    },
    {
        id: '34',
        name: 'Kamloops',
        
    },
    {
        id: '35',
        name: 'Kelowna',
        
    },
    {
        id: '36',
        name: 'Kitimat',
        
    },
    {
        id: '37',
        name: 'Klemtu',
        
    },
    {
        id: '38',
        name: 'Lilloet',
        
    },
    {
        id: '39',
        name: 'Lower Post',
        
    },
    {
        id: '40',
        name: 'Mackenzie',
        
    },
    {
        id: '41',
        name: 'Masset',
        
    },
    {
        id: '42',
        name: 'McBride',
        
    },
    {
        id: '43',
        name: 'Merritt',
        
    },
    {
        id: '44',
        name: 'Nakusp',
        
    },
    {
        id: '45',
        name: 'Nanaimo',
        
    },
    {
        id: '46',
        name: 'Nelson',
        
    },
    {
        id: '47',
        name: 'New Aiyansh',
        
    },
    {
        id: '48',
        name: 'New Westminster',
        
    },
    {
        id: '49',
        name: 'North Vancouver',
        
    },
    {
        id: '50',
        name: '100 Mile House',
        
    },
    {
        id: '51',
        name: 'Pemberton',
        
    },
    {
        id: '52',
        name: 'Penticton',
        
    },
    {
        id: '53',
        name: 'Port Alberni',
        
    },
    {
        id: '54',
        name: 'Port Coquitlam',
        
    },
    {
        id: '54',
        name: 'Port Hardy',
        
    },
    {
        id: '55',
        name: 'Powell River',
        
    },
    {
        id: '56',
        name: 'Prince George',
        
    },
    {
        id: '57',
        name: 'Prince Rupert',
        
    },
    {
        id: '58',
        name: 'Princeton',
        
    },
    {
        id: '59',
        name: 'Queen Charlotte',
        
    },
    {
        id: '60',
        name: 'Quesnel',
        
    },
    {
        id: '61',
        name: 'Revelstoke',
        
    },
    {
        id: '62',
        name: 'Richmond',
        
    },
    {
        id: '63',
        name: 'Rossland',
        
    },
    {
        id: '64',
        name: 'Salmon Arm',
        
    },
    {
        id: '65',
        name: 'Sechelt',
        
    },
    {
        id: '66',
        name: 'Sidney',
        
    },
    {
        id: '67',
        name: 'Smithers',
        
    },
    {
        id: '68',
        name: 'Sparwood',
        
    },
    {
        id: '69',
        name: 'Stewart',
        
    },
    {
        id: '70',
        name: 'Surrey',
        
    },
    {
        id: '71',
        name: 'Tahsis',
        
    },
    {
        id: '72',
        name: 'Terrace',
        
    },
    {
        id: '73',
        name: 'Tofino',
        
    },
    {
        id: '74',
        name: 'Tsay Keh Dene (Ingenika)',
        
    },
    {
        id: '75',
        name: 'Tumbler Ridge',
        
    },
    {
        id: '76',
        name: 'Ucluelet',
        
    },
    {
        id: '77',
        name: 'Valemont',
        
    },
    {
        id: '78',
        name: 'Vancouver - VLC',
        
    },
    {
        id: '79',
        name: 'Vancouver - 222 Main',
        
    },
    {
        id: '80',
        name: 'Vancouver - Robson Square',
        
    },
    {
        id: '81',
        name: 'Vanderhoof',
        
    },
    {
        id: '82',
        name: 'Vernon',
        
    },
    {
        id: '83',
        name: 'Victoria',
        
    },
    {
        id: '84',
        name: 'Western Communities',
        
    },
    {
        id: '85',
        name: 'Williams Lake',
        
    }
];

export const courtrooms: Courtroom[] = [
    {
        id: '0',
        courthouseId: '79',
        code: '101',
        name: 'Courtroom 101'
    },
    {
        id: '1',
        courthouseId: '79',
        code: '102',
        name: 'Courtroom 102'
    },
    {
        id: '2',
        courthouseId: '79',
        code: '103',
        name: 'Courtroom 103'
    },
    {
        id: '3',
        courthouseId: '79',
        code: '104',
        name: 'Courtroom 104'
    },
    {
        id: '4',
        courthouseId: '79',
        code: '201',
        name: 'Courtroom 201'
    },
    {
        id: '5',
        courthouseId: '79',
        code: '202',
        name: 'Courtroom 202'
    },
    {
        id: '6',
        courthouseId: '79',
        code: '203',
        name: 'Courtroom 203'
    },
    {
        id: '7',
        courthouseId: '79',
        code: '204',
        name: 'Courtroom 204'
    }
];

export const sheriffShifts: Shift[] = [
    {
        id: '501',
        courthouseId: '1',
        workSectionId: 'COURTS',
        sheriffId: '3',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(13.5, 'hours')
    },
    {
        id: '502',
        courthouseId: '1',
        workSectionId: 'JAIL',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(13.5, 'hours')
    },
    {
        id: '503',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(13.5, 'hours')
    },
    {
        id: '504',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(15.5, 'hours')
    },
    {
        id: '505',
        courthouseId: '1',
        workSectionId: 'ESCORTS',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(15.5, 'hours')
    },
    {
        id: '506',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(15.5, 'hours')
    },
    {
        id: '507',
        courthouseId: '1',
        workSectionId: 'OTHER',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(1, 'day').add(15.5, 'hours')
    },
    {
        id: '508',
        courthouseId: '1',
        workSectionId: 'COURTS',
        sheriffId: '3',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(13.5, 'hours')
    },
    {
        id: '509',
        courthouseId: '1',
        workSectionId: 'JAIL',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(13.5, 'hours')
    },
    {
        id: '5010',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(13.5, 'hours')
    },
    {
        id: '5011',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(15.5, 'hours')
    },
    {
        id: '5012',
        courthouseId: '1',
        workSectionId: 'ESCORTS',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(15.5, 'hours')
    },
    {
        id: '5013',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(15.5, 'hours')
    },
    {
        id: '5014',
        courthouseId: '1',
        workSectionId: 'OTHER',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(2, 'day').add(15.5, 'hours')
    },
    {
        id: '5015',
        courthouseId: '1',
        workSectionId: 'COURTS',
        sheriffId: '3',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(13.5, 'hours')
    },
    {
        id: '5016',
        courthouseId: '1',
        workSectionId: 'JAIL',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(13.5, 'hours')
    },
    {
        id: '5017',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(13.5, 'hours')
    },
    {
        id: '5018',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(15.5, 'hours')
    },
    {
        id: '5019',
        courthouseId: '1',
        workSectionId: 'ESCORTS',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(15.5, 'hours')
    },
    {
        id: '5020',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(15.5, 'hours')
    },
    {
        id: '5021',
        courthouseId: '1',
        workSectionId: 'OTHER',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(3, 'day').add(15.5, 'hours')
    },
    {
        id: '5022',
        courthouseId: '1',
        workSectionId: 'COURTS',
        sheriffId: '3',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(13.5, 'hours')
    },
    {
        id: '5023',
        courthouseId: '1',
        workSectionId: 'JAIL',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(13.5, 'hours')
    },
    {
        id: '5024',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(13.5, 'hours')
    },
    {
        id: '5025',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(15.5, 'hours')
    },
    {
        id: '5026',
        courthouseId: '1',
        workSectionId: 'ESCORTS',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(15.5, 'hours')
    },
    {
        id: '5027',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(15.5, 'hours')
    },
    {
        id: '5028',
        courthouseId: '1',
        workSectionId: 'OTHER',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(4, 'day').add(15.5, 'hours')
    },
    {
        id: '5029',
        courthouseId: '1',
        workSectionId: 'COURTS',
        sheriffId: '3',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(13.5, 'hours')
    },
    {
        id: '5030',
        courthouseId: '1',
        workSectionId: 'JAIL',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(13.5, 'hours')
    },
    {
        id: '5031',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(6, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(13.5, 'hours')
    },
    {
        id: '5032',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(15.5, 'hours')
    },
    {
        id: '5033',
        courthouseId: '1',
        workSectionId: 'ESCORTS',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(15.5, 'hours')
    },
    {
        id: '5034',
        courthouseId: '1',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(15.5, 'hours')
    },
    {
        id: '5035',
        courthouseId: '1',
        workSectionId: 'OTHER',
        startDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(8, 'hours'),
        endDateTime: moment().startOf('week').subtract(1, 'week').add(5, 'day').add(15.5, 'hours')
    }

];

export const sheriffLeaves: Leave[] = [
    {
        id: '1',
        sheriffId: '1',
        date: moment().startOf('week').add(1, 'day')
    },
    {
        id: '2',
        sheriffId: '2',
        date: moment()
    }
];