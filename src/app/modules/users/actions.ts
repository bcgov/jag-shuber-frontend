import * as userRequests from './requests';

export const getUsers = userRequests.userMapRequest.actionCreator;
export const updateUser = userRequests.updateUserRequest.actionCreator;
export const createUser = userRequests.createUserRequest.actionCreator;
