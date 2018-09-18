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
    ];
    const arrayWithDuplicate: TestObject[] = [
        ...array,
        { id: 1, name: "Number 1 also", otherProperties: ["Hello1 Also"] }
    ];


    describe('arrayToMap one dimensional', () => {
        it('Should convert an array into a map object', () => {
            expect(arrayToMap(array, t => t.id)).toEqual({
                1: array[0],
                2: array[1],
                3: array[2]
            });
        });

        it('Should overwrite object within key if another exists', () => {
            expect(arrayToMap(arrayWithDuplicate, t => t.id)).toEqual({
                1: arrayWithDuplicate[3],
                2: arrayWithDuplicate[1],
                3: arrayWithDuplicate[2]
            });
        });
    });

    describe('arrayToMap two dimensional', () => {
        it('Should convert an array into a map two dimensional map object (i.e. with arrays)', () => {
            expect(arrayToMap(array, t => t.id, true)).toEqual({
                1: [array[0]],
                2: [array[1]],
                3: [array[2]]
            });
        });

        it('Should overwrite object within key if another exists', () => {
            expect(arrayToMap(arrayWithDuplicate, t => t.id, true)).toEqual({
                1: [arrayWithDuplicate[0], arrayWithDuplicate[3]],
                2: [arrayWithDuplicate[1]],
                3: [arrayWithDuplicate[2]]
            });
        });
    });
});

