import { combineReducers } from 'redux';
import { reducer as sheriffReducer, State as SheriffState } from '../modules/sheriffs';
import { reducer as assignmentReducer, State as AssignmentState } from '../modules/assignments';
import { reducer as timelineReducer, State as TimelineState } from '../modules/timeline';
import { reducer as formReducer } from 'redux-form';

export interface RootState {    
    sheriffs: SheriffState;
    assignments: AssignmentState;
    timeline: TimelineState;
}

const rootReducer = combineReducers({    
    sheriffs: sheriffReducer,
    assignments: assignmentReducer,
    timeline:timelineReducer,
    form: formReducer    
});

export default rootReducer;