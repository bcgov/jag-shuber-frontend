export function displayEnum(theEnum: any, enumValue: any): string[] {

    var enumNumberValues = Object.keys(theEnum)
        .map(key => Number(key));

    if (enumNumberValues.indexOf(enumValue) !== -1) {
        return [theEnum[enumValue]];
    } else {
        return enumNumberValues
            .filter(key => !isNaN(key))
            .filter(n => {
                let val = (n && enumValue) === n;
                return val;
            })
            .map(n => theEnum[n]);
    }
}

export function getEnumKeyLabels(theEnum: any): string[] {
    return Object.keys(theEnum).filter(key => !isNaN(Number(theEnum[key])));
}