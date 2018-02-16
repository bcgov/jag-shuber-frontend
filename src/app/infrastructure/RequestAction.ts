import { ThunkAction, ThunkExtra } from "../store";
import { AnyAction } from "redux";
import { Dispatch } from "react-redux";

export interface RequestActionState<T> {
    isBusy: boolean;
    error?: string;
    data: T;
}

export default abstract class RequestAction<TRequest, TResponse, TState extends {}>{
    public actionNames: { begin: string, success: string, fail: string }
    private beginAction: { type: string };

    private getFailAction(error: string) {
        return { type: this.actionNames.fail, payload: error }
    }

    protected getSuccessAction(response: TResponse) {
        return { type: this.actionNames.success, payload: response };
    }

    constructor(private namespace: string, private actionName: string) {
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
            this.dispatchFailure(dispatch, error);
        }
    });

    protected dispatchBegin(dispatch: Dispatch<any>) {
        dispatch(this.beginAction);
    }

    protected dispatchFailure(dispatch: Dispatch<any>, error: string) {
        dispatch(this.getFailAction(error));
    }

    protected dispatchSuccess(dispatch: Dispatch<any>, response: TResponse) {
        dispatch(this.getSuccessAction(response));
    }

    public reducer(moduleState: TState | undefined, action: AnyAction): TState | undefined {
        let newState = (moduleState || undefined) as TState;

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
        return newState as TState;
    }

    protected reduceBegin(moduleState: any, action: AnyAction): TState {
        return this.mergeRequestActionState(moduleState, { error: undefined, isBusy: true })
    }

    protected reduceFailure(moduleState: TState, action: AnyAction): TState {
        return this.mergeRequestActionState(moduleState, { error: action.payload, isBusy: false })
    }

    protected reduceSuccess(moduleState: TState, action: AnyAction): TState {
        return this.mergeRequestActionState(moduleState, { data: action.payload, error: undefined, isBusy: false })
    }

    protected mergeRequestActionState(moduleState: TState, newState: Partial<RequestActionState<TResponse>>): TState {
        let newModuleState = { ...(moduleState || {}) as any }
        const currentActionState = newModuleState[this.actionName] || {};
        newModuleState[this.actionName] = { ...currentActionState, ...newState };
        return newModuleState as TState
    }

    protected selectRequestActionState(moduleState: TState): RequestActionState<TResponse> | undefined {
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

    public getIsBusy(state: any): boolean {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return requestState && requestState.isBusy === true ? true : false;
    }

    public getError(state: any): string | undefined {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return requestState ? requestState.error : undefined;
    }

    public getData(state: any): TResponse | undefined {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return requestState ? requestState.data : undefined;
    }
}

