import * as genderCodeRequests from './requests/genders';
import * as locationRequests from './requests/locations';
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

// Locations
export const allLocations = createSelector(
    locationRequests.locationMapRequest.getData,
    (locations) => mapToArray(locations)
        .sort((a, b) => a.name.localeCompare(b.name))
);

export const getLocationById = (id?: IdType) => (state: RootState) => {
    if (id == undefined) {
        return undefined;
    }
    const map = locationRequests.locationMapRequest.getData(state);
    return id && map ? map[id] : undefined;
};

export const selectedLocation = (id: IdType) => (state: RootState) => {
    const { locationMap } = state.system;
    return locationMap ? locationMap[id] : '';
};