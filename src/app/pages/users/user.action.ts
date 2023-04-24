import ACTION_TYPES from '@app/core/constants/types';
import { User } from '@app/core/models/User';

export const getListUser = () => ({
  type: ACTION_TYPES.GET_LIST_USER,
});

export const getListUserSuccess = (payload: User) => ({
  type: ACTION_TYPES.GET_LIST_USER_SUCCESS,
  payload
});

export const getListUserError = (error) => ({
  type: ACTION_TYPES.GET_LIST_USER_ERROR,
  payload: { error }
});

export const getUserInfor = (id: string) => ({
  type: ACTION_TYPES.GET_USER_INFOR,
  payload: { id }
});

export const getUserInforSuccess = (payload: User) => ({
  type: ACTION_TYPES.GET_USER_INFOR_SUCCESS,
  payload
});

export const getUserInforError = (error) => ({
  type: ACTION_TYPES.GET_USER_INFOR_ERROR,
  payload: { error }
});
