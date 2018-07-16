import * as genderCodeRequests from './requests/genders';
import * as courthouseRequests from './requests/courthouses';

// Gender Codes
export const getGenderCodes = genderCodeRequests.genderCodeMapRequest.actionCreator;

// Courthouses
export const getCourthouses = courthouseRequests.courthouseMapRequest.actionCreator;
