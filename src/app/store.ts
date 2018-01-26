import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { default as thunk, ThunkAction as _ThunkAction } from 'redux-thunk'
import { default as api, API } from './api'
import { reducer as sheriffReducer, State as SheriffState } from './modules/sheriffs';
import { reducer as assignmentReducer, State as AssignmentState } from './modules/assignments';
import { reducer as timelineReducer, State as TimelineState } from './modules/timeline';
import { reducer as formReducer } from 'redux-form';

export type ThunkAction<T> = (args?: T) => _ThunkAction<any, RootState, { api: API }>;

export interface RootState {
    sheriffs: SheriffState;
    assignments: AssignmentState;
    timeline: TimelineState;
}

const rootReducer = combineReducers({
    sheriffs: sheriffReducer,
    assignments: assignmentReducer,
    timeline: timelineReducer,
    form: formReducer
});

let thisWindow: any = window;

const composeEnhancers = thisWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(
        thunk.withExtraArgument({ api })
    )
)

export default createStore(rootReducer, enhancers);
