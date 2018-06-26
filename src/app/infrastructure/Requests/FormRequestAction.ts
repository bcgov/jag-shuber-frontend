import { SubmissionError } from 'redux-form';
import RequestAction, { isSubmissionError, RequestActionConfig } from './RequestActionBase';
import { Dispatch } from 'redux';

export default abstract class FormRequestAction<TRequest, TResponse, TModuleState extends {}>
    extends RequestAction<TRequest, TResponse, TModuleState> {

    // protected _actionCreator(request: TRequest = {} as TRequest, config: RequestActionConfig<TResponse> = {}): Thunk<TResponse> {
    //     return (async (dispatch, getState, extra) => {
    //         this.dispatchBegin(dispatch);
    //         try {
    //             const response = await this.doWork(request, extra, getState);
    //             this.dispatchSuccess(dispatch, response, config);
    //             return response;
    //         } catch (error) {
    //             this.dispatchFailure(dispatch, error, config);
    //             if (!isSubmissionError(error)) {
    //                 throw new SubmissionError({ _error: error.message });
    //             } else {
    //                 throw error;
    //             }
    //         }
    //     });
    // }

    protected dispatchFailure(dispatch: Dispatch<any>, error: Error | string, actionConfig: RequestActionConfig<TResponse> = {}) {
        try {
            super.dispatchFailure(dispatch, error, actionConfig);
        } catch (error) {
            if (!isSubmissionError(error)) {
                throw new SubmissionError({ _error: error.message });
            } else {
                throw error;
            }
        }
    }
}