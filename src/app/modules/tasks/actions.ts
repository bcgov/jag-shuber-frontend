import { Action } from 'redux'
import { ThunkAction } from '../../store'
import { SheriffTaskMap, SheriffTask } from "../../api/index";


// The following gives us type-safe redux actions
// see https://medium.com/@dhruvrajvanshi/some-tips-on-type-safety-with-redux-98588a85604c
// Todo: Would be great to make this more generic and factor it out into infrastructure, leaving as is for now

type IActionMap = {
  "REQUEST_TASKS_BEGIN": null;
  "REQUEST_TASKS_FAIL": string;
  "REQUEST_TASKS_SUCCESS": SheriffTaskMap;
  "ASSIGN_TASK": { taskId: number, badgeNumber: number };
  "TASK_BEGIN_CREATE": null;
  "TASK_CREATE_SUCCESS": SheriffTask; 
  "TASK_CREATE_FAIL": string;
}

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

// Action creator for getting Task List
export const getTasks: ThunkAction<void> = () => (async (dispatch, getState, { api }) => {
  dispatch(beginGetTasks());
  try {
    let tasks = await api.getSheriffTasks();
    dispatch(getTasksSuccess(tasks));
  } catch (error) {
    dispatch(getTasksFailed(`Error getting tasks: '${error}'`));
  }
});

export const assignTask = (taskId: number, badgeNumber: number) => actionCreator("ASSIGN_TASK")({ taskId, badgeNumber });
export const beginGetTasks = () => actionCreator("REQUEST_TASKS_BEGIN")(null);
export const getTasksFailed = actionCreator("REQUEST_TASKS_FAIL");
export const getTasksSuccess = actionCreator("REQUEST_TASKS_SUCCESS");

//Action creator for creating a new task
export const createTask: ThunkAction<SheriffTask> = (newTask: SheriffTask) => (async (dispatch, getState, { api }) =>{
  dispatch(beginCreateTask());
  try {
    let task = await api.createTask(newTask);
    dispatch(createTaskSuccess(task));
  } catch (error) {
    dispatch(createTaskFailed(`Error creating task: '${error}'`));
  }
});

export const beginCreateTask = () => actionCreator("TASK_BEGIN_CREATE")(null);
export const createTaskSuccess = actionCreator("TASK_CREATE_SUCCESS");
export const createTaskFailed = actionCreator("TASK_CREATE_FAIL");

