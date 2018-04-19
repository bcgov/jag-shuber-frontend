import * as moment from 'moment';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { default as thunk, ThunkAction as _ThunkAction } from 'redux-thunk';
import { default as api, API } from './api';
import { registerReducer as registerSheriffReducer, SheriffModuleState } from './modules/sheriffs/reducer';
import { registerReducer as registerAssignmentReducer, AssignmentModuleState } from './modules/assignments/reducer';
import { registerReducer as registerShiftReducer, ShiftModuleState } from './modules/shifts/reducer';
import { registerReducer as registerCourthouseReducer, CourthouseModuleState } from './modules/courthouse/reducer';
import { default as timelineReducer, TimelineState } from './modules/timeline/reducer';
import { reducer as formReducer } from 'redux-form';
import { 
    getCourtrooms, 
    getAlternateAssignmentTypes,
    getJailRoles,
    getRuns 
} from './modules/courthouse/action';
import {
    getSheriffList
} from './modules/sheriffs/actions';
import { updateVisibleTime } from './modules/timeline/actions';


export interface ThunkExtra {
    api: API;
}

export type ThunkAction<T> = (args?: T) => _ThunkAction<any, RootState, ThunkExtra>;

export interface RootState {
    sheriffs: SheriffModuleState;
    assignments: AssignmentModuleState;
    timeline: TimelineState;
    shifts: ShiftModuleState;
    courthouse: CourthouseModuleState;
}

const initialActions: any[] = [
    getSheriffList,
    getCourtrooms, 
    getAlternateAssignmentTypes,
    getJailRoles,
    getRuns,
    () => updateVisibleTime(moment().startOf('day').add(7, 'hours'), moment().endOf('day').subtract(6, 'hours'))
];

const reducers = {
    timeline: timelineReducer,
    form: formReducer
};

registerSheriffReducer(reducers);
registerShiftReducer(reducers);
registerAssignmentReducer(reducers);
registerCourthouseReducer(reducers);

const rootReducer = combineReducers(reducers);

let thisWindow: any = window;

const composeEnhancers = thisWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
    applyMiddleware(
        thunk.withExtraArgument({ api })
    )
);

const store = createStore(rootReducer, enhancers);
initialActions.forEach(actionCreator => store.dispatch(actionCreator()));
export default store;