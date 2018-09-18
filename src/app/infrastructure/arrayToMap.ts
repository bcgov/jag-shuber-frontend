/**
 * converts an Array into a Map or Dictionary type object using the given key selector to organize it
 *
 * @export
 * @template T
 * @template TKey
 * @param {T[]} array
 * @param {(t: T) => TKey} keySelector
 * @param {boolean} [twoDimensional=false] creates an array for each key that is selected, pushing matching items onto array
 * @returns
 */
export default function arrayToMap<T, TKey>(array: T[] = [], keySelector: (t: T) => TKey, twoDimensional: boolean = false) {
    const mappedArray = array.reduce<any>(
        (map, i) => {
            const key = keySelector(i);
            if (twoDimensional) {
                (map[key] = map[key] || []).push(i);
            } else {
                map[key] = i;
            }
            return map;
        },
        {});
    return mappedArray;
}