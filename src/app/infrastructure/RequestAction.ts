import {
    ThunkAction,
    ThunkExtra
} from "../store";
import { AnyAction } from "redux";
import { Dispatch } from "react-redux";
import { Reducer } from "redux";

export interface RequestActionState<T> {
    isBusy?: boolean;
    error?: string;
    data?: T;
}

export default abstract class RequestAction<TRequest, TResponse, TModuleState extends {}>{
    public actionNames: { begin: string, success: string, fail: string }
    private beginAction: { type: string };

    private getFailAction(error: string) {
        return { type: this.actionNames.fail, payload: error }
    }

    protected getSuccessAction(response: TResponse) {
        return { type: this.actionNames.success, payload: response };
    }

    constructor(private namespace: string, private actionName: string, private throwOnError: boolean = false) {
        const upperNamespace = namespace.toUpperCase();
        const upperAction = actionName.toUpperCase();
        // Create our actions
        this.actionNames = {
            begin: `${upperNamespace}_${upperAction}_REQUEST`,
            success: `${upperNamespace}_${upperAction}_SUCCESS`,
            fail: `${upperNamespace}_${upperAction}_FAIL`
        }
        this.beginAction = { type: this.actionNames.begin }
    }

    public abstract doWork(request: TRequest, extra: ThunkExtra, getState: (() => any)): Promise<TResponse>;

    public actionCreator: ThunkAction<TRequest> = (request: TRequest) => (async (dispatch, getState, extra) => {
        this.dispatchBegin(dispatch);
        try {
            const response = await this.doWork(request, extra, getState);
            this.dispatchSuccess(dispatch, response);
        } catch (error) {
            if (this.throwOnError) {
                throw error;
            } else {
                this.dispatchFailure(dispatch, error);
            }
        }
    })

    protected dispatchBegin(dispatch: Dispatch<any>) {
        dispatch(this.beginAction);
    }

    protected dispatchFailure(dispatch: Dispatch<any>, error: Error | string) {
        const errorMessage = typeof error === 'string' ? error : error.message;
        dispatch(this.getFailAction(errorMessage));
        // tslint:disable-next-line:no-console
        console.error(errorMessage);
    }

    protected dispatchSuccess(dispatch: Dispatch<any>, response: TResponse) {
        dispatch(this.getSuccessAction(response));
    }

    private _reducer(moduleState: TModuleState | undefined, action: AnyAction): TModuleState | undefined {
        let newState = (moduleState || undefined) as TModuleState;

        switch (action.type) {
            case this.actionNames.begin:
                newState = this.reduceBegin(newState, action);
                break;
            case this.actionNames.fail:
                newState = this.reduceFailure(newState, action);
                break;
            case this.actionNames.success:
                newState = this.reduceSuccess(newState, action);
                break;
            default:
                break;
        }
        return newState as TModuleState;
    }

    get reducer(): Reducer<TModuleState> {
        return this._reducer.bind(this);
    }

    protected reduceBegin(moduleState: any, action: AnyAction): TModuleState {
        return this.mergeRequestActionState(moduleState, { error: undefined, isBusy: true })
    }

    protected reduceFailure(moduleState: TModuleState, action: AnyAction): TModuleState {
        return this.mergeRequestActionState(moduleState, { error: action.payload, isBusy: false })
    }

    protected reduceSuccess(moduleState: TModuleState, action: AnyAction): TModuleState {
        return this.mergeRequestActionState(moduleState, { data: action.payload, error: undefined, isBusy: false })
    }

    protected mergeRequestActionState(moduleState: TModuleState, newState: Partial<RequestActionState<TResponse>>): TModuleState {
        let newModuleState = { ...(moduleState || {}) as any }
        const currentActionState = newModuleState[this.actionName] || {};
        newModuleState[this.actionName] = { ...currentActionState, ...newState };
        return newModuleState as TModuleState
    }

    protected selectRequestActionState(moduleState: TModuleState): RequestActionState<TResponse> | undefined {
        const { actionName } = this;
        if (moduleState && moduleState[actionName]) {
            return moduleState[actionName] as RequestActionState<TResponse>;
        } else {
            return undefined;
        }
    }
    private selectRequestActionStateFromRootState(rootState: any): RequestActionState<TResponse> | undefined {
        const { namespace } = this;
        if (rootState && rootState[namespace]) {
            return this.selectRequestActionState(rootState[namespace]);
        } else {
            return undefined;
        }
    }

    private _getIsBusy(state: any): boolean {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return requestState && requestState.isBusy === true ? true : false;
    }

    get getIsBusy() {
        return this._getIsBusy.bind(this);
    }

    private _getError(state: any): string | undefined {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return requestState ? requestState.error : undefined;
    }

    get getError() {
        return this._getError.bind(this);
    }

    private _getData(state: any): TResponse {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return (requestState ? requestState.data : {}) as TResponse;
    }

    get getData() {
        return this._getData.bind(this);
    }
}

