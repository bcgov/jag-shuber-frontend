import RequestAction, { RequestConfig } from './RequestActionBase';
import FormRequestAction from './FormRequestAction';

export default abstract class DeleteEntityRequest<TEntity, TModuleState>
    extends FormRequestAction<string, string, TModuleState> {

    constructor(config: RequestConfig<string>,
        protected mapRequest: RequestAction<any, { [key: string]: TEntity }, TModuleState>) {
        super(config);
    }

    setRequestData(moduleState: TModuleState, id: string) {
        const newMap = { ...this.mapRequest.getRequestData(moduleState) };
        delete newMap[id];
        return this.mapRequest.setRequestData(moduleState, newMap);
    }
}
