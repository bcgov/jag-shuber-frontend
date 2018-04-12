import {
    API,
    Sheriff
} from '../Api';
import APIClient from '../Client';
import { courthouseCode } from '../index';
import './shape-matchers.ts';

const SheriffShape: Sheriff = {
    badgeNo: '2345',
    firstName: 'george',
    lastName: 'curious',
    id: '123-132-234',
    imageUrl: 'http://someurl.to/an/image'
}


describe('API Client', () => {
    let client: API;

    beforeEach(() => {
        client = new APIClient('http://api-test.192.168.99.100.nip.io/api', courthouseCode);
    });

    // afterEach(() => {

    // });

    it('Should return sheriffs', async () => {
        let list = await client.getSheriffs();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list[0]).toMatchShapeOf(SheriffShape);
    });
});


