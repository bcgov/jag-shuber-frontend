import { createSelector } from 'reselect'
import { RootState } from '../../store';
import { SheriffAssignment } from '../../api/index';

export const allAssignments = (state: RootState):SheriffAssignment[] => {
    const map = state.assignments.map || {};
    const list: SheriffAssignment[] = Object.keys(map).map((k, i) => map[k]);
    return list;
}
export const isLoading = (state: RootState) => state.assignments.loading;
export const error = (state: RootState) => state.assignments.error;

// Not Memoized since not sure which id is getting passed in
export const linkedAssignments = (id?:number)=> (state:RootState)=>{
    if(id==null){
        return [];
    }
    return allAssignments(state).filter(t=>t.sheriffIds.indexOf(id)>=0);
}

export const unlinkedAssignments = createSelector(allAssignments,
    assignments => {
        let ts = assignments ? assignments.filter(t => {
            return !t.sheriffIds || t.sheriffIds.length == 0
        }) : []
        return ts;
    }
)

export const allAssignmentTemplates = (state:RootState) => state.assignments.templates;

export const getAssignmentTemplate = (id?:number) => (state:RootState) => {
    if(state && id){
        const assignmentTemplates = allAssignmentTemplates(state);
        if(assignmentTemplates){
            return assignmentTemplates.find((value) => value.id==id);
        }
    }
    return null;
}