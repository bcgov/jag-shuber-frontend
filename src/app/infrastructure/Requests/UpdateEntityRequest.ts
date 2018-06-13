import CreateEntityRequest from './CreateEntityRequest';
import RequestAction from '../RequestAction';


export default abstract class UpdateEntityRequest<TEntity extends { id: string }, TModuleState>
    extends CreateEntityRequest<TEntity, TModuleState> {
    constructor(
        namespace: string,
        actionName: string,
        mapRequest: RequestAction<any, { [key: string]: TEntity }, TModuleState>) {
        super(namespace, actionName, mapRequest);
    }
}