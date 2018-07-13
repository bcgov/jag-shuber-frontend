import * as genderCodeRequests from './requests/genders';
import * as courthouseRequests from './requests/courthouses';
import { CodeSelector } from '../../infrastructure/CodeSelector';
import { createSelector } from 'reselect';
import mapToArray from '../../infrastructure/mapToArray';
import { IdType } from '../../api/Api';
import { RootState } from '../../store';

// Gender Codes
export const genderCodesMap = genderCodeRequests.genderCodeMapRequest.getData;

const genderCodeSelector = new CodeSelector(
    genderCodeRequests.genderCodeMapRequest.getData
);

export const allGenderCodes = genderCodeSelector.all;

export const allEffectiveGenderCodes = genderCodeSelector.effective;

// Courthouses
export const allCourthouses = createSelector(
    courthouseRequests.courthouseMapRequest.getData,
    (courthouses) => mapToArray(courthouses)
        .sort((a, b) => a.name.localeCompare(b.name))
);

export const courthouseById = (id: IdType) => (state: RootState) => {
    const map = courthouseRequests.courthouseMapRequest.getData(state);
    return id && map ? map[id] : undefined;
};

export const selectedCourthouse = (id: IdType) => (state: RootState) => {
    const { courthouseMap } = state.system;
    return courthouseMap ? courthouseMap[id] : '';
};