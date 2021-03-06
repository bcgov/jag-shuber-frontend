import * as userRequests from './requests';

export const getUsers = userRequests.userMapRequest.actionCreator;
export const createUser = userRequests.createUserRequest.actionCreator;
export const uploadUserImage = userRequests.uploadUserImageRequest.actionCreator;
export const updateUser = userRequests.updateUserRequest.actionCreator;
export const createOrUpdateUsers = userRequests.createOrUpdateUsersRequest.actionCreator;
export const deleteUsers = userRequests.deleteUsersRequest.actionCreator;
export const expireUsers = userRequests.expireUsersRequest.actionCreator;
export const unexpireUsers = userRequests.unexpireUsersRequest.actionCreator;
