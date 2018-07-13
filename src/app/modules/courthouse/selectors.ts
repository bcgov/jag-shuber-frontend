import { RootState } from '../../store';
import * as sheriffRankCodeRequests from './requests/sheriffRankCodes';
import { IdType } from '../../api/Api';
import { CodeSelector } from '../../infrastructure/CodeSelector';

// Sheriff Rank Codes
const sheriffRankCodeSelector = new CodeSelector(
    sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData
);

export const allSheriffRankCodes = sheriffRankCodeSelector.all;

export const allEffectiveSheriffRankCodes = sheriffRankCodeSelector.effective;

export const getSheriffRankByCode = (code: IdType) => (state: RootState) => {
    const map = sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData(state);
    return map ? map[code] : undefined;
};