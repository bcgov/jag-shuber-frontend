import * as genderCodeRequests from './requests/genders';
import { CodeSelector } from '../../infrastructure/CodeSelector';

// Gender Codes
export const genderCodesMap = genderCodeRequests.genderCodeMapRequest.getData;

const genderCodeSelector = new CodeSelector(
    genderCodeRequests.genderCodeMapRequest.getData
);

export const allGenderCodes = genderCodeSelector.all;

export const allEffectiveGenderCodes = genderCodeSelector.effective;
