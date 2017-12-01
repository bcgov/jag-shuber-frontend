import {combineReducers} from 'redux'
import {reducer as todoReducer,State as TodoState} from '../modules/todos'
import {reducer as sheriffReducer,State as SheriffState} from '../modules/sheriffs'
import {reducer as taskReducer,State as TaskState} from '../modules/tasks'

export interface RootState{
    todos:TodoState
    sheriffs:SheriffState
    tasks: TaskState
}

const rootReducer = combineReducers({
    todos:todoReducer,
    sheriffs:sheriffReducer,
    tasks:taskReducer
});



export default rootReducer;