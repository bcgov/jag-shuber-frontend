import * as runRequests from './requests/runs';
import * as sherriffRankRequests from './requests/sheriffRankCodes';

// Runs
export const getRuns = runRequests.runMapRequest.actionCreator;

// Sheriff Rank Codes
export const getSheriffRankCodes = sherriffRankRequests.sheriffRankCodeMapRequest.actionCreator;