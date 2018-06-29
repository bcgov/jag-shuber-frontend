import {
    ThunkExtra,
    Thunk
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

export interface RequestToastConfig<TResponse> {
    success?: string | ((entity: TResponse) => string);
    error?: string | ((error: Error | string) => string);
}

export interface RequestActionConfig<TResponse> {
    toasts?: RequestToastConfig<TResponse>;
}

export interface RequestConfig<TResponse> extends RequestActionConfig<TResponse> {
    namespace?: string;
    actionName?: string;
}

export default abstract class RequestAction<TRequest, TResponse, TModuleState extends {}>{
    protected config: RequestConfig<TResponse>;
    public actionNames: { begin: string, success: string, fail: string }
    private beginAction: { type: string };
    protected get namespace(): string {
        return this.config.namespace as string;
    }

    protected get actionName(): string {
        return this.config.actionName as string;
    }

    private getFailAction(error: string) {
        return { type: this.actionNames.fail, payload: error }
    }

    protected getSuccessAction(response: TResponse) {
        return { type: this.actionNames.success, payload: response };
    }

    constructor(config: RequestConfig<TResponse>) {
        this.config = {
            toasts: {
                error: 'Error completing action'
            },
            ...config
        };
        const { namespace, actionName } = config;
        if (namespace == undefined || namespace === '') {
            throw new Error('namespace must be provided in request config');
        }
        if (actionName == undefined || actionName === '') {
            throw new Error('actionName must be provided in request config');
        }
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

    protected _actionCreator(request: TRequest = {} as TRequest, config: RequestActionConfig<TResponse> = {}): Thunk<TResponse> {
        return (async (dispatch, getState, extra) => {
            this.dispatchBegin(dispatch);
            let response: TResponse | undefined = undefined;
            try {
                response = await this.doWork(request, extra, getState);
                this.dispatchSuccess(dispatch, response, config);
            } catch (error) {
                this.dispatchFailure(dispatch, error, config);
            }
            return response as TResponse;
        });
    }

    public get actionCreator(): (request?: TRequest, config?: RequestActionConfig<TResponse>) => Thunk<TResponse> {
        return this._actionCreator.bind(this);
    }

    protected dispatchBegin(dispatch: Dispatch<any>) {
        dispatch(this.beginAction);
    }

    protected dispatchFailure(dispatch: Dispatch<any>, error: Error | string, actionConfig: RequestActionConfig<TResponse> = {}) {
        const errorMessage = typeof error === 'string' ? error : error.message;
        dispatch(this.getFailAction(errorMessage));
        const { toasts = {} } = { ...this.config, ...actionConfig };
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

    protected dispatchSuccess(dispatch: Dispatch<any>, response: TResponse, actionConfig: RequestActionConfig<TResponse> = {}) {
        dispatch(this.getSuccessAction(response));
        const { toasts = {} } = { ...this.config, ...actionConfig };
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