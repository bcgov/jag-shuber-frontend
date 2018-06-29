import { SubmissionError } from 'redux-form';
import RequestAction, { isSubmissionError, RequestActionConfig } from './RequestActionBase';
import { Dispatch } from 'redux';

export default abstract class FormRequestAction<TRequest, TResponse, TModuleState extends {}>
    extends RequestAction<TRequest, TResponse, TModuleState> {
    protected dispatchFailure(dispatch: Dispatch<any>, error: Error | string, actionConfig: RequestActionConfig<TResponse> = {}) {
        super.dispatchFailure(dispatch, error, actionConfig);
        if (!isSubmissionError(error)) {
            if (typeof error === typeof 'string') {
                throw new SubmissionError({ _error: error as string });
            }
            
            throw new SubmissionError({ _error: (error as Error).message });
        } else {
            throw error;
        }
    }
}