export function renameKeysInObject(object: any, searchValue: string | RegExp, replacment: string) {
    const newObject = { ...object };
    renameKeysInObjectImpl(newObject, searchValue, replacment);
    return newObject;
}

function renameKeysInObjectImpl(object: any, searchValue: string | RegExp, replacment: string) {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            // If key is actually an object (if an array)
            if (typeof object[key] === typeof {}) {
                renameKeysInObjectImpl(object[key], searchValue, replacment);
            }

            // if key is a string
            if (typeof key === typeof '') {
                const newKey = key.replace(searchValue, replacment);
                if (newKey !== key) {
                    object[newKey] = object[key];
                    delete object[key];
                }
            }
        }
    }
    return object;
}