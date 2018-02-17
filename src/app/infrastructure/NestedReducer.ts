import { Reducer } from "redux";

// type Reducer<TModuleState> = (moduleState: TModuleState | undefined, action: any) => TModuleState | undefined;

export default class NestedReducer<TModuleState>{
    constructor(private nestedReducers: Reducer<TModuleState>[] = []) {
    }

    reducer: Reducer<TModuleState> = (nestedState: TModuleState, action: any): TModuleState => {
        let newNestedState = this.nestedReducers.reduce((val, fn) => {
            let newVal = fn(val, action) as any;
            return { ...val, ...newVal }
        }, { ...(nestedState as any) });
        return { ...(nestedState as any), ...newNestedState };
    }
}