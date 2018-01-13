import {createSelector} from 'reselect'
import { RootState } from '../../store/reducers';
import { Sheriff } from '../../api/index';

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