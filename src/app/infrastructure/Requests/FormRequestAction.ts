import { ThunkAction } from '../../store';
import { SubmissionError } from 'redux-form';
import RequestAction, { isSubmissionError } from './RequestActionBase';
export default abstract class FormRequestAction<TRequest, TResponse, TModuleState extends {}>
    extends RequestAction<TRequest, TResponse, TModuleState> {
    public actionCreator: ThunkAction<TRequest> = (request: TRequest) => (async (dispatch, getState, extra) => {
        this.dispatchBegin(dispatch);
        try {
            const response = await this.doWork(request, extra, getState);
            this.dispatchSuccess(dispatch, response);
            return response;
        } catch (error) {
            this.dispatchFailure(dispatch, error);
            if (!isSubmissionError(error)) {
                throw new SubmissionError({ _error: error.message });
            } else {
                throw error;
            }
        }
    })
}