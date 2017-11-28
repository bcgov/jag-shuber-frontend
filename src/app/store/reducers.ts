import {combineReducers} from 'redux'
import {reducer as todoReducer,State as TodoState} from '../modules/todos'
import {reducer as sheriffReducer,State as SheriffState} from '../modules/sheriffs'

export interface RootState{
    todos:TodoState,
    sheriffs:SheriffState
}


const rootReducer = combineReducers({
    todos:todoReducer,
    sheriffs:sheriffReducer
});



export default rootReducer;