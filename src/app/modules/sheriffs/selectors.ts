// import {createSelector} from 'reselect'
import { RootState } from '../../store/reducers';

export const sheriffs = (state: RootState) => {
    const sheriffMap = state.sheriffs.map;
    return sheriffMap ? Object.keys(sheriffMap).map(k => sheriffMap[k]) : {};
}
export const isLoading = (state: RootState) => state.sheriffs.loading;
export const error = (state: RootState) => state.sheriffs.error;
export const isSaving = (state:RootState) => state.sheriffs.saving;