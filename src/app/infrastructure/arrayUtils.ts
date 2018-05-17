export function allSame<T>(array: T[] = [], compare: (object1: T, object2: T) => boolean) {
    if (array.length <= 1) {
        return true;
    } 
    return array.every((currentElement, currentIndex, currentArray) => (
        currentArray.slice(currentIndex + 1)
            .every(compareElement => compare(currentElement, compareElement))
    ));
}

export function anySame<T>(array: T[] = [], compare: (object1: T, object2: T) => boolean) {
    if (array.length <= 1) {
        return true;
    } 
    return array.some((currentElement, currentIndex, currentArray) => (
        currentArray.slice(currentIndex + 1)
            .some(compareElement => compare(currentElement, compareElement))
    ));
}