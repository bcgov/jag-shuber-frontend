export function displayEnum(theEunm: any, enumValue: any): string[] {

    var enumNumberValues = Object.keys(theEunm)
        .map(key => Number(key));

    if (enumNumberValues.indexOf(enumValue) != -1) {
        return [theEunm[enumValue]]
    } else {
        return enumNumberValues
            .filter(key => !isNaN(key))
            .filter(n => {
                let val = (n & enumValue) === n;
                return val;
            })
            .map(n => theEunm[n]);
    }
}