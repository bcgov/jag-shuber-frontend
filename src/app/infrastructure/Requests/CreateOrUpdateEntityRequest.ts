import RequestAction, { RequestConfig } from './RequestActionBase';
import FormRequestAction from './FormRequestAction';
import { ThunkExtra, RootState } from '../../store';

export default abstract class CreateOrUpdateEntityRequest<TEntity extends { id?: any }, TModuleState>
    extends FormRequestAction<Partial<TEntity>, TEntity, TModuleState> {

    constructor(config: RequestConfig<TEntity>,
        protected mapRequest: RequestAction<any, { [key: string]: TEntity }, TModuleState>) {
        super(config);
    }

    abstract createEntity(entity: Partial<TEntity>, extra: ThunkExtra): Promise<TEntity>;
    abstract updateEntity(entity: Partial<TEntity>, extra: ThunkExtra): Promise<TEntity>;

    async doWork(entity: Partial<TEntity>, extra: ThunkExtra, getState: () => RootState) {
        if (entity.id) {
            return this.updateEntity(entity, extra);
        } else {
            return this.createEntity(entity, extra);
        }
    }

    setRequestData(moduleState: TModuleState, data: TEntity) {
        const newMap = { ...this.mapRequest.getRequestData(moduleState) };
        newMap[data.id] = data;
        return this.mapRequest.setRequestData(moduleState, newMap);
    }
}
