import * as sheriffRequests from './requests';

export const getSheriffList = sheriffRequests.sheriffMapRequest.actionCreator;
export const updateSheriff = sheriffRequests.updateSheriffRequest.actionCreator;
export const createSheriff = sheriffRequests.createSheriffRequest.actionCreator;
