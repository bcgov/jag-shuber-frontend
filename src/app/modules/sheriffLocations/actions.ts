import * as sheriffLocationRequests from './requests';

export const getSheriffLocations = sheriffLocationRequests.sheriffLocationMapRequest.actionCreator;
export const createOrUpdateSheriffLocations = sheriffLocationRequests.createOrUpdateSheriffLocationRequest.actionCreator;
