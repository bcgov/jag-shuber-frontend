import RequestAction from './RequestActionBase';
import FormRequestAction from './FormRequestAction';

export default abstract class CreateEntityRequest<TEntity extends { id: string }, TModuleState>
    extends FormRequestAction<Partial<TEntity>, TEntity, TModuleState> {

    constructor(
        namespace: string,
        actionName: string,
        protected mapRequest: RequestAction<any, { [key: string]: TEntity }, TModuleState>) {
        super(namespace, actionName);
    }

    setRequestData(moduleState: TModuleState, data: TEntity) {
        const newMap = { ...this.mapRequest.getRequestData(moduleState) };
        newMap[data.id] = data;
        return this.mapRequest.setRequestData(moduleState, newMap);
    }
}