import CreateEntityRequest from './CreateEntityRequest';
import RequestActionBase, { RequestConfig } from './RequestActionBase';

export default abstract class UpdateEntityRequest<TEntity extends { id?: any }, TModuleState>
    extends CreateEntityRequest<TEntity, TModuleState> {
    constructor(config: RequestConfig<TEntity>,
                mapRequest: RequestActionBase<any, { [key: string]: TEntity }, TModuleState>) {
        super(config, mapRequest);
    }
}
