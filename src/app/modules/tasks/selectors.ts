import { createSelector } from 'reselect'
import { RootState } from '../../store/reducers';
import { SheriffTask } from '../../api/index';

export const allTasks = (state: RootState) => {
    const map = state.tasks.map || {};
    const list: SheriffTask[] = Object.keys(map).map((k, i) => map[k]);
    return list;
}
export const isLoading = (state: RootState) => state.tasks.loading;
export const error = (state: RootState) => state.tasks.error;

// Not Memoized since not sure which id is getting passed in
export const assignedTasks = (id?:number)=> (state:RootState)=>{
    if(id==null){
        return [];
    }
    return allTasks(state).filter(t=>t.sheriffIds.indexOf(id)>=0);
}

export const unassignedTasks = createSelector(allTasks,
    tasks => {
        let ts = tasks ? tasks.filter(t => {
            return !t.sheriffIds || t.sheriffIds.length == 0
        }) : []
        return ts;
    }
)
