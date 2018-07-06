import RequestAction, { RequestConfig } from './RequestActionBase';

export default abstract class GetEntityMapRequest<TRequest, TEntity, TModuleState>
    extends RequestAction<TRequest, { [key: string]: TEntity }, TModuleState> {
    constructor(config: RequestConfig<{ [key: string]: TEntity }>) {
        super(config);
    }
}