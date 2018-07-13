
import * as runRequests from './requests/runs';
import * as sheriffRankRequests from './requests/sheriffRankCodes';
import NestedReducer from '../../infrastructure/NestedReducer';
import { ReducersMapObject } from 'redux';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
    CourthouseModuleState,
    STATE_KEY
} from './common';

const nestedReducer = new NestedReducer ([

    // Runs
    runRequests.runMapRequest.reducer,   

    // Sheriff Rank
    sheriffRankRequests.sheriffRankCodeMapRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}