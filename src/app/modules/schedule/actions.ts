import { Action } from 'redux';
import { IdType } from '../../api/Api';

// The following gives us type-safe redux actions
// see https://medium.com/@dhruvrajvanshi/some-tips-on-type-safety-with-redux-98588a85604c
// Todo: Would be great to make this more generic and factor it out into infrastructure, leaving as is for now

type IActionMap = {
  'SCHEDULE_UPDATE_VISIBLETIME': { visibleTimeStart: any, visibleTimeEnd: any };
  'SCHEDULE_SHIFT_SELECT': IdType;
  'SCHEDULE_SHIFT_UNSELECT': IdType;
  'SCHEDULE_SHIFT_CLEAR_SELECTED': void;
};

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
  type: K;
  payload: IActionPayload<K>;
}

export type IAction = {
  [P in IActionType]: IActionObject<P>
}[IActionType];

function actionCreator<Type extends IActionType>(type: Type) {
  return (payload: IActionPayload<Type>): IActionObject<Type> =>
    ({ type: type, payload: payload });
}

export const updateVisibleTime = (visibleTimeStart: any, visibleTimeEnd: any) => (
  actionCreator('SCHEDULE_UPDATE_VISIBLETIME')({ visibleTimeStart, visibleTimeEnd })
);

export const selectShift = (shiftId: IdType) => (
  actionCreator('SCHEDULE_SHIFT_SELECT')(shiftId)
);

export const unselectShift = (shiftId: IdType) => (
  actionCreator('SCHEDULE_SHIFT_UNSELECT')(shiftId)
);

export const clearSelectedShifts = actionCreator('SCHEDULE_SHIFT_CLEAR_SELECTED');