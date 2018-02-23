import {createSelector} from 'reselect'
import { RootState } from '../../store';
import { Sheriff } from '../../api/index';

export const getSheriff = (id?: number) => (state: RootState) => {
    if (state && id != null) {
        const map = state.sheriffs.map || {};
        return map[id];
    }
    return null;
}

export const sheriffs = (state: RootState) : Sheriff[] => {
    const sheriffMap = state.sheriffs.map;
    return sheriffMap ? Object.keys(sheriffMap).map(k => sheriffMap[k]) : [];
}

export const onDutySheriffs = createSelector(
    sheriffs,
    (sheriffList)=>sheriffList.filter(s=>s.onDuty)
)

export const offDutySheriffs = createSelector(
    sheriffs,
    (sheriffList)=>sheriffList.filter(s=>!s.onDuty)
)

export const isLoading = (state: RootState) => state.sheriffs.loading;
export const error = (state: RootState) => state.sheriffs.error;
export const isSaving = (state:RootState) => state.sheriffs.saving;