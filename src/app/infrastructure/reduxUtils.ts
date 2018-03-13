import { ReducersMapObject, Reducer } from "redux";

export function addReducerToMap(reducersMap: ReducersMapObject, key: string, reducer: Reducer<any>): ReducersMapObject {
    if (reducersMap[key]) {
        console.warn(`'${key}' already has a reducer registered`);
    }
    reducersMap[key] = reducer;
    return reducersMap;
}