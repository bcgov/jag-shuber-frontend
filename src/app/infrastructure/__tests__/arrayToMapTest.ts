import arrayToMap from '../arrayToMap';

interface TestObject {
    id: number;
    name: string;
    otherProperties: string[];
}

describe('arrayToMap() ', () => {
    const array: TestObject[] = [
        { id: 1, name: "Number 1", otherProperties: ["Hello1"] },
        { id: 2, name: "Number 2", otherProperties: ["Hello2"] },
        { id: 3, name: "Number 3", otherProperties: ["Hello3"] }
    ]

    it('Should convert an array into a map object', () => {
        expect(arrayToMap(array, t => t.id)).toEqual({
            1: array[0],
            2: array[1],
            3: array[2]
        });
    });

})
