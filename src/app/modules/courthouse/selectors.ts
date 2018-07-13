import { RootState } from '../../store';
import * as runRequests from './requests/runs';

import * as sheriffRankCodeRequests from './requests/sheriffRankCodes';
import { IdType } from '../../api/Api';
import { createSelector } from 'reselect';
import mapToArray from '../../infrastructure/mapToArray';
import { CodeSelector } from '../../infrastructure/CodeSelector';

// Runs
export const allRuns = createSelector(
    runRequests.runMapRequest.getData,
    (runs) => mapToArray(runs).sort((a, b) => a.title.localeCompare(b.title))
);

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