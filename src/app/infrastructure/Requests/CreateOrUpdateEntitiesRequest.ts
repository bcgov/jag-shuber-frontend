import RequestAction, { RequestConfig } from './RequestActionBase';
import FormRequestAction from './FormRequestAction';
import { RootState, ThunkExtra } from '../../store';

export default abstract class CreateOrUpdateEntitiesRequest<TEntity extends { id: string }, TModuleState>
    extends FormRequestAction<Partial<TEntity>[], TEntity[], TModuleState> {

    constructor(config: RequestConfig<TEntity[]>,
        protected mapRequest: RequestAction<any, { [key: string]: TEntity }, TModuleState>) {
        super(config);
    }

    abstract createEntity(entity: Partial<TEntity>, extra: ThunkExtra): Promise<TEntity>;
    abstract updateEntity(entity: TEntity, extra: ThunkExtra): Promise<TEntity>;

    async doWork(entities: Partial<TEntity>[] = [], extra: ThunkExtra, getState: () => RootState) {
        const entitiesToUpdate = entities.filter(e => e.id != undefined);
        const entitiesToCreate = entities.filter(e => e.id == undefined);
        return await Promise.all(
            entitiesToCreate.map(e => this.createEntity(e, extra))
                .concat(entitiesToUpdate.map(e => this.updateEntity(e as TEntity, extra)))
        );
    }

    setRequestData(moduleState: TModuleState, data: TEntity[]) {
        const newMap = { ...this.mapRequest.getRequestData(moduleState) };
        data.forEach(d => {
            newMap[d.id] = d;
        });
        return this.mapRequest.setRequestData(moduleState, newMap);
    }
}