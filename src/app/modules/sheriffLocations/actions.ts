import * as sheriffLocationRequests from './requests';

export const getSheriffLocations = sheriffLocationRequests.sheriffLocationMapRequest.actionCreator;
export const createOrUpdateSheriffLocations = sheriffLocationRequests.createOrUpdateSheriffLocationsRequest.actionCreator;
export const deleteSheriffLocations = sheriffLocationRequests.deleteSheriffLocationsRequest.actionCreator;
