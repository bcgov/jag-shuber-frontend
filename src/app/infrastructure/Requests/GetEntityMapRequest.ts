import RequestAction from '../RequestAction';

export default abstract class GetEntityMapRequest<TRequest, TEntity, TModuleState>
    extends RequestAction<TRequest, { [key: string]: TEntity }, TModuleState> {
    constructor(namespace: string, actionName: string) {
        super(namespace, actionName);
    }
}