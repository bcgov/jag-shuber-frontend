import RequestAction from './RequestActionBase';
import FormRequestAction from './FormRequestAction';

export default abstract class DeleteEntityRequest<TEntity, TModuleState>
    extends FormRequestAction<string, string, TModuleState> {

    constructor(
        namespace: string,
        actionName: string,
        protected mapRequest: RequestAction<any, { [key: string]: TEntity }, TModuleState>) {
        super(namespace, actionName);
    }

    setRequestData(moduleState: TModuleState, id: string) {
        const newMap = { ...this.mapRequest.getRequestData(moduleState) };
        delete newMap[id];
        return this.mapRequest.setRequestData(moduleState, newMap);
    }
}