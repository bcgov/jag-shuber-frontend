import CreateEntityRequest from './CreateEntityRequest';
import RequestActionBase from './RequestActionBase';

export default abstract class UpdateEntityRequest<TEntity extends { id: string }, TModuleState>
    extends CreateEntityRequest<TEntity, TModuleState> {
    constructor(
        namespace: string,
        actionName: string,
        mapRequest: RequestActionBase<any, { [key: string]: TEntity }, TModuleState>) {
        super(namespace, actionName, mapRequest);
    }
}