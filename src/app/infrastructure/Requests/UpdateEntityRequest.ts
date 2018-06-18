import CreateEntityRequest from './CreateEntityRequest';
import RequestActionBase, { RequestActionConfig } from './RequestActionBase';

export default abstract class UpdateEntityRequest<TEntity extends { id: string }, TModuleState>
    extends CreateEntityRequest<TEntity, TModuleState> {
    constructor(config: RequestActionConfig<TEntity>,
                mapRequest: RequestActionBase<any, { [key: string]: TEntity }, TModuleState>) {
        super(config, mapRequest);
    }
}