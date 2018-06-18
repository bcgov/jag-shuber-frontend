import {
    ThunkAction,
    ThunkExtra
} from '../../store';
import { AnyAction } from 'redux';
import { Dispatch } from 'react-redux';
import { Reducer } from 'redux';
import { toast } from '../../components/ToastManager/ToastManager';

export function isSubmissionError(err: any): boolean {
    const { name = '' } = err;
    return name === 'SubmissionError';
}

export interface RequestActionState<T> {
    isBusy?: boolean;
    error?: string;
    data?: T;
}

export interface RequestActionConfig<TResponse> {
    namespace: string;
    actionName: string;
    toasts?: {
        success?: string | ((entity: TResponse) => string);
        error?: string | ((error: Error | string) => string);
    };
}

export default abstract class RequestAction<TRequest, TResponse, TModuleState extends {}>{
    protected config: RequestActionConfig<TResponse>;
    public actionNames: { begin: string, success: string, fail: string }
    private beginAction: { type: string };
    protected get namespace(): string {
        return this.config.namespace;
    }

    protected get actionName(): string {
        return this.config.actionName;
    }

    private getFailAction(error: string) {
        return { type: this.actionNames.fail, payload: error }
    }

    protected getSuccessAction(response: TResponse) {
        return { type: this.actionNames.success, payload: response };
    }

    constructor(config: RequestActionConfig<TResponse>) {
        this.config = config;
        const { namespace, actionName } = config;
        const upperNamespace = namespace.toUpperCase();
        const upperAction = actionName.toUpperCase();

        // Create our actions
        this.actionNames = {
            begin: `${upperNamespace}_${upperAction}_REQUEST`,
            success: `${upperNamespace}_${upperAction}_SUCCESS`,
            fail: `${upperNamespace}_${upperAction}_FAIL`
        };
        this.beginAction = { type: this.actionNames.begin };
    }

    public abstract doWork(request: TRequest, extra: ThunkExtra, getState: (() => any)): Promise<TResponse>;

    public actionCreator: ThunkAction<TRequest> = (request: TRequest) => (async (dispatch, getState, extra) => {
        return new Promise(async (resolve, reject) => {
            this.dispatchBegin(dispatch);
            try {
                const response = await this.doWork(request, extra, getState);
                this.dispatchSuccess(dispatch, response);
                resolve(response);
            } catch (error) {
                this.dispatchFailure(dispatch, error);
                resolve();
            }
        });
    })

    protected dispatchBegin(dispatch: Dispatch<any>) {
        dispatch(this.beginAction);
    }

    protected dispatchFailure(dispatch: Dispatch<any>, error: Error | string) {
        const errorMessage = typeof error === 'string' ? error : error.message;
        dispatch(this.getFailAction(errorMessage));
        const { toasts = {} } = this.config;
        if (toasts.error) {
            if (typeof toasts.error === 'string') {
                toast.error(toasts.error);
            } else {
                toast.error(toasts.error(error));
            }

        }
        // tslint:disable-next-line:no-console
        console.error(errorMessage);
    }

    protected dispatchSuccess(dispatch: Dispatch<any>, response: TResponse) {
        dispatch(this.getSuccessAction(response));
        const { toasts = {} } = this.config;
        if (toasts.success) {
            if (typeof toasts.success === 'string') {
                toast.success(toasts.success);
            } else {
                toast.success(toasts.success(response));
            }
        }
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
        const newState = this.mergeRequestActionState(moduleState, { error: undefined, isBusy: false });
        return this.setRequestData(newState, action.payload);
    }

    public getRequestData(moduleState: TModuleState): TResponse | undefined {
        const requestState = this.selectRequestActionState(moduleState);
        return requestState ? requestState.data : undefined;
    }

    public setRequestData(moduleState: TModuleState, data: TResponse): TModuleState {
        return this.mergeRequestActionState(moduleState, { data });
    }

    protected mergeRequestActionState(moduleState: TModuleState, newState: Partial<RequestActionState<TResponse>>): TModuleState {
        let newModuleState = { ...(moduleState || {}) as any };
        const currentActionState = newModuleState[this.actionName] || {};
        newModuleState[this.actionName] = { ...currentActionState, ...newState };
        return newModuleState as TModuleState;
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

    get getIsBusy(): (state: any) => boolean {
        return this._getIsBusy.bind(this);
    }

    private _getError(state: any): string | undefined {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return requestState ? requestState.error : undefined;
    }

    get getError(): (state: any) => string {
        return this._getError.bind(this);
    }

    private _getData(state: any): TResponse {
        let requestState = this.selectRequestActionStateFromRootState(state);
        return (requestState ? requestState.data : {}) as TResponse;
    }

    get getData(): (state: any) => TResponse {
        return this._getData.bind(this);
    }
}