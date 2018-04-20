import { renameKeysInObject } from '../objectUtils';

describe('renameKeysInObject()', () => {
    const testJson = {
        idPath: 'hello',
        nested: {
            idPath: 'another',
            array: [
                {
                    nestedIdPath: 'nested/array/1'
                },
                {
                    nestedIdPath: 'nested/array/2'
                }
            ]
        }
    };

    it('should not mutate original object', () => {
        const objToTest = { ...testJson };
        const newObj = renameKeysInObject(objToTest, 'idPath', 'id');
        expect(newObj).not.toBe(objToTest);
    });

    it('should do string replacments for keys in object', () => {
        const objToTest = { ...testJson };
        const expectedJson = {
            id: 'hello',
            nested: {
                id: 'another',
                array: [
                    {
                        nestedIdPath: 'nested/array/1'
                    },
                    {
                        nestedIdPath: 'nested/array/2'
                    }
                ]
            }
        };
        expect(renameKeysInObject(objToTest, 'idPath', 'id')).toMatchObject(expectedJson);
    });

    it('should do regex replacments for keys in object', () => {
        const objToTest = { ...testJson };
        const expectedJson = {
            id: 'hello',
            nested: {
                id: 'another',
                array: [
                    {
                        nestedIdPath: 'nested/array/1'
                    },
                    {
                        nestedIdPath: 'nested/array/2'
                    }
                ]
            }
        };
        expect(renameKeysInObject(objToTest, /idPath/, 'id')).toMatchObject(expectedJson);
    });

    it('should do regex substitution replacments for keys in object', () => {
        const objToTest = { ...testJson };
        const expectedJson = {
            id: 'hello',
            nested: {
                id: 'another',
                array: [
                    {
                        nestedId: 'nested/array/1'
                    },
                    {
                        nestedId: 'nested/array/2'
                    }
                ]
            }
        };
        expect(renameKeysInObject(objToTest, /([iI]d)Path/, '$1')).toMatchObject(expectedJson);
    });
});