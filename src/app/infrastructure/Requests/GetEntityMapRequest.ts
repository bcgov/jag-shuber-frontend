import RequestAction, { RequestActionConfig } from './RequestActionBase';

export default abstract class GetEntityMapRequest<TRequest, TEntity, TModuleState>
    extends RequestAction<TRequest, { [key: string]: TEntity }, TModuleState> {
    constructor(config: RequestActionConfig<{ [key: string]: TEntity }>) {
        super(config);
    }
}