// Description of RandomUser API Contracts
// Generated using https://randomuser.me/documentation#results -> http://json2ts.com/

export interface Name {
    title: string;
    first: string;
    last: string;
}

export interface Location {
    street: string;
    city: string;
    state: string;
    postcode: any;
}

export interface Login {
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

export interface Id {
    name: string;
    value: string;
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface ApiPerson {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: string;
    registered: string;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
}

export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

export interface APIPeopleResponse {
    results: ApiPerson[];
    info: Info;
}


const peopleUrl = "https://randomuser.me/api/?seed=shuber&nat=us";

export async function fetchRandomPeople(numPeople: number = 10) {
    let response = await fetch(`${peopleUrl}&results=${numPeople}`, { method: 'GET' });
    let body: APIPeopleResponse = await response.json();
    return body;
}



