import {combineReducers} from 'redux';
import {reducer as todoReducer,State as TodoState} from '../modules/todos';
import {reducer as sheriffReducer,State as SheriffState} from '../modules/sheriffs';
import {reducer as assignmentReducer,State as AssignmentState} from '../modules/assignments';
import {reducer as formReducer} from 'redux-form';

export interface RootState{
    todos:TodoState
    sheriffs:SheriffState
    assignments: AssignmentState
}

const rootReducer = combineReducers({
    todos:todoReducer,
    sheriffs:sheriffReducer,
    assignments:assignmentReducer,
    form:formReducer
});





export default rootReducer;