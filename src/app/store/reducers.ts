import {combineReducers} from 'redux'
import {reducer as todoReducer,State as TodoState} from '../modules/todos'
import {reducer as sheriffReducer,State as SheriffState} from '../modules/sheriffs'
import {reducer as taskReducer,State as TaskState} from '../modules/tasks'
import {reducer as formReducer} from 'redux-form';

export interface RootState{
    todos:TodoState
    sheriffs:SheriffState
    tasks: TaskState
}

const rootReducer = combineReducers({
    todos:todoReducer,
    sheriffs:sheriffReducer,
    tasks:taskReducer,
    form:formReducer
});





export default rootReducer;