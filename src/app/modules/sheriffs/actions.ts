import { Action } from 'redux';
import { ThunkAction } from '../../store';
import { Sheriff } from "../../api/index";


type IActionMap = {
  "REQUEST_SHERIFF_LIST_BEGIN": null;
  "REQUEST_SHERIFF_LIST_FAIL": string;
  "REQUEST_SHERIFF_LIST_SUCCESS": Sheriff[];

  "SHERIFF_UPDATE": Sheriff;
  "SHERIFF_UPDATE_SUCCESS": Sheriff;
  "SHERIFF_UPDATE_FAIL": string;

  "SHERIFF_BEGIN_CREATE": null;
  "SHERIFF_CREATE_SUCCESS": Sheriff;
  "SHERIFF_CREATE_FAIL": string;
}

// Action creator for getting Sheriff List
export const getSheriffList = () => (async (dispatch: any, getState: any, { api }: any) => {
  dispatch(beginGetSheriffList());
  try {
    let sheriffs = await api.getSheriffs();
    dispatch(sheriffListSuccess(sheriffs));
  } catch (error) {
    dispatch(sheriffListFailed(`Error getting sheriffs: '${error}'`));
  }
});
const beginGetSheriffList = () => actionCreator("REQUEST_SHERIFF_LIST_BEGIN")(null);
const sheriffListFailed = actionCreator("REQUEST_SHERIFF_LIST_FAIL");
const sheriffListSuccess = actionCreator("REQUEST_SHERIFF_LIST_SUCCESS");

export const updateSheriff: ThunkAction<Partial<Sheriff>> = (sheriffToUpdate: Partial<Sheriff>) => (async (dispatch, getState, { api }) => {
  try {
    let updatedSheriff = await api.updateSheriff(sheriffToUpdate);
    dispatch(sheriffUpdateSuccess(updatedSheriff));
  }catch(error){
    // todo: handle that
    dispatch(sheriffUpdateFailed(error));
  }
});
const sheriffUpdateSuccess = actionCreator("SHERIFF_UPDATE_SUCCESS");
const sheriffUpdateFailed = actionCreator("SHERIFF_UPDATE_SUCCESS");

export const createSheriff: ThunkAction<Sheriff> = (newSheriff: Sheriff) => (async (dispatch, getState, { api }) => {
  dispatch(beginCreateSheriff());
  try {
    let sheriff = await api.createSheriff(newSheriff);
    dispatch(createSheriffSuccess(sheriff));
  } catch (error) {
    dispatch(createSheriffFailed(`Error creating sheriffs: '${error}'`));
  }
});
// Action creator for creating a Sheriff
const beginCreateSheriff = () => actionCreator("SHERIFF_BEGIN_CREATE")(null);
const createSheriffSuccess = actionCreator("SHERIFF_CREATE_SUCCESS");
const createSheriffFailed = actionCreator("SHERIFF_CREATE_FAIL");



//////////////////////////////////
// The following gives us type-safe redux actions
// it has been placed down here to improve readability
// of the scripts above.
// see https://medium.com/@dhruvrajvanshi/some-tips-on-type-safety-with-redux-98588a85604c
// Todo: Would be great to make this more generic and factor it out into infrastructure, leaving as is for now

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
  type: K,
  payload: IActionPayload<K>
}

export type IAction = {
  [P in IActionType]: IActionObject<P>
}[IActionType]

function actionCreator<Type extends IActionType>(type: Type) {
  return (payload: IActionPayload<Type>): IActionObject<Type> =>
    ({ type: type, payload: payload });
}



