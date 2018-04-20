import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';
import { API, IdType } from '../api/Api';
import APIClient from '../api/Client';

expect.extend({
    toMatchShapeOf,
    toMatchOneOf
});

export async function expectNoResource(client: API, id?: IdType): Promise<void> {
    if (client instanceof APIClient) {
        if (id) {
            try {
                await (client as APIClient).getResource(id);
            } catch (err) {
                
                expect(err.status).toEqual(404);   
                // expect(err.message).toEqual("Request failed with status code 404");
            }
        }
    }
}