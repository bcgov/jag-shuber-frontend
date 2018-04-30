import * as moment from 'moment';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { default as thunk, ThunkAction as _ThunkAction } from 'redux-thunk';
import { reducer as modalReducer } from 'redux-modal';
import { default as api, API } from './api';
import { registerReducer as registerSheriffReducer, SheriffModuleState } from './modules/sheriffs/reducer';
import { registerReducer as registerAssignmentReducer, AssignmentModuleState } from './modules/assignments/reducer';
import { registerReducer as registerShiftReducer, ShiftModuleState } from './modules/shifts/reducer';
import { registerReducer as registerCourthouseReducer, CourthouseModuleState } from './modules/courthouse/reducer';
import { default as timelineReducer, TimelineState } from './modules/timeline/reducer';
import { reducer as formReducer } from 'redux-form';
import {
    getAlternateAssignmentTypes,
    getJailRoles,
    getCourthouses
} from './modules/courthouse/action';
import { updateVisibleTime as updateTimelineVisibleTime } from './modules/timeline/actions';
import { default as scheduleReducer, ScheduleState } from './modules/schedule/reducer';
import { updateVisibleTime as updateScheduleVisibleTime } from './modules/schedule/actions';


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
    schedule: ScheduleState;
}

const initialActions: any[] = [
    getAlternateAssignmentTypes,
    getJailRoles,
    getCourthouses,
    () => updateTimelineVisibleTime(
            moment().startOf('day').add(7, 'hours'), moment().endOf('day').subtract(6, 'hours')),
    () => updateScheduleVisibleTime(moment().startOf('week'), moment().endOf('week'))
];

const reducers = {
    timeline: timelineReducer,
    schedule: scheduleReducer,
    modal: modalReducer,
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