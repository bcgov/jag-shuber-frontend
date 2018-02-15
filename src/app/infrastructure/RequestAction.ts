import { ThunkAction, RootState, ThunkExtra } from "../store";
import { AnyAction } from "redux";

export interface RequestActionState<T> {
    isBusy: boolean;
    error?: string;
    data: T;
}

export default abstract class RequestAction<TRequest, TResponse, TState=any>{
    public actionNames: { begin: string, success: string, fail: string }
    private beginAction: { type: string };

    private getFailAction(error: string) {
        return { type: this.actionNames.fail, payload: error }
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

    public abstract doWork(request: TRequest, extra: ThunkExtra, getState: () => any): Promise<TResponse>;

    public actionCreator: ThunkAction<TRequest> = (request: TRequest) => (async (dispatch, getState, extra) => {
        dispatch(this.beginAction);
        try {
            const response = await this.doWork(request, extra, getState);
            dispatch({ type: this.actionNames.success, payload: response });
        } catch (error) {
            dispatch(this.getFailAction(error));
        }
    });

    public reducer(state: RequestActionState<TResponse> | undefined, action: AnyAction): RequestActionState<TResponse> | undefined {
        let newState: RequestActionState<TResponse> | undefined = state;
        switch (action.type) {
            case this.actionNames.begin:
                newState = Object.assign({}, state, { isBusy: true });
                break;
            case this.actionNames.fail:
                newState = Object.assign({}, state, { isBusy: false, error: action.payload })
                break;
            case this.actionNames.success:
                newState = { data: action.payload, error: undefined, isBusy: false }
                break;
            default:
                break;
        }
        return newState || undefined;
    }

    private selectRequestActionState(state: TState): RequestActionState<TResponse> | undefined {
        const { namespace, actionName } = this;
        if (state && state[namespace] && state[namespace][actionName]) {
            return state[namespace][actionName] as RequestActionState<TResponse>;
        } else {
            return undefined;
        }
    }

    public getIsBusy(state: TState): boolean {
        let requestState = this.selectRequestActionState(state);
        return requestState && requestState.isBusy === true ? true : false;
    }

    public getError(state: TState): string | undefined {
        let requestState = this.selectRequestActionState(state);
        return requestState ? requestState.error : undefined;
    }

    public getData(state: TState): TResponse | undefined {
        let requestState = this.selectRequestActionState(state);
        return requestState ? requestState.data : undefined;
    }
}

