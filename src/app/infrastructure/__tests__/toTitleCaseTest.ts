import toTitleCase from '../toTitleCase';

describe('toTitleCase() ', () => {
    const expected = "Hello World This Is Title Case";
    
    it('Should convert lowercase to titleCase', () => {
        expect(toTitleCase(expected.toLowerCase())).toEqual(expected);        
    });

    it('Should convert uppercase to titleCase', () => {
        expect(toTitleCase(expected.toUpperCase())).toEqual(expected);        
    });

    it('Should convert mixed to titleCase', () => {
        expect(toTitleCase("heLLo World tHis iS TITLE cAsE")).toEqual(expected);        
    });

    it('Should not fail if given no argument', () => {
        expect(toTitleCase()).toEqual('');        
    });
})
