import moment from 'moment';
import * as TimeUtils from './infrastructure/TimeRangeUtils';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { default as thunk, ThunkAction as _ThunkAction } from 'redux-thunk';
import { reducer as modalReducer } from 'redux-modal';
import { default as api, API } from './api';
import { registerReducer as registerSheriffReducer, SheriffModuleState } from './modules/sheriffs/reducer';
import { registerReducer as registerAssignmentReducer, AssignmentModuleState } from './modules/assignments/reducer';
import { registerReducer as registerShiftReducer, ShiftModuleState } from './modules/shifts/reducer';
import { registerReducer as registerCourthouseReducer, CourthouseModuleState } from './modules/courthouse/reducer';
import { default as dutyRosterReducer, DutyRosterState } from './modules/dutyRoster/reducer';
import { reducer as formReducer } from 'redux-form';
import {
    getJailRoles,
    getSheriffRankCodes
} from './modules/courthouse/action';
import { getShifts } from './modules/shifts/actions';
import { updateVisibleTime as updateTimelineVisibleTime } from './modules/dutyRoster/actions';
import { default as scheduleReducer, ScheduleState } from './modules/schedule/reducer';
import { updateVisibleTime as updateScheduleVisibleTime } from './modules/schedule/actions';
import { UserState, registerReducer as registerUserReducer } from './modules/user/reducer';
import { LeaveModuleState, registerReducer as registerLeavesReducer } from './modules/leaves/reducer';
import {
    getLeaveCancelCodes,
    getLeaveSubCodes,
    getLeaves
} from './modules/leaves/actions';
import {
    getGenderCodes,
    getCourthouses
} from './modules/system/action';
import { registerReducer as registerSystemReducer, SystemModuleState } from './modules/system/reducer';
import { 
    getAlternateAssignmentTypes,
    getCourtRoles 
} from './modules/assignments/actions';
export interface ThunkExtra {
    api: API;
}

export type Thunk<TResponse = void> = _ThunkAction<Promise<TResponse>, RootState, ThunkExtra>;
export type ThunkAction<TRequest, TResponse = void> = (args?: TRequest) => Thunk<TResponse>;

export interface RootState {
    sheriffs: SheriffModuleState;
    assignments: AssignmentModuleState;
    dutyRoster: DutyRosterState;
    shifts: ShiftModuleState;
    courthouse: CourthouseModuleState;
    schedule: ScheduleState;
    user: UserState;
    leaves: LeaveModuleState;
    system: SystemModuleState;
}

const initialActions: any[] = [
    getAlternateAssignmentTypes,
    getJailRoles,
    getCourthouses,
    () => updateTimelineVisibleTime(TimeUtils.getDefaultStartTime(), TimeUtils.getDefaultEndTime()),
    () => updateScheduleVisibleTime(moment().startOf('week').add(1, 'day'), moment().endOf('week').subtract(1, 'day')),
    getSheriffRankCodes,
    getShifts,
    getLeaveCancelCodes,
    getLeaveSubCodes,
    getLeaves,
    getCourtRoles,
    getGenderCodes
];

const reducers = {
    dutyRoster: dutyRosterReducer,
    schedule: scheduleReducer,
    modal: modalReducer,
    form: formReducer
};

registerSheriffReducer(reducers);
registerShiftReducer(reducers);
registerAssignmentReducer(reducers);
registerCourthouseReducer(reducers);
registerUserReducer(reducers);
registerLeavesReducer(reducers);
registerSystemReducer(reducers);

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