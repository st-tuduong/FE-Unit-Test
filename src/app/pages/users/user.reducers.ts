import { createReducer } from '@app/core/helpers/reducer-factory';
import ACTION_TYPES from '@app/core/constants/types';

const initialState = {
  isLoading: false,
  isProcessing: false,
  hasError: false,
  userList: null,
  userInfor: null
};

const getListUser = (state) => ({
  ...state,
  isLoading: true
});

const getListUserSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  userList: payload
});

const getListUserError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload.error
});

const getUserInfor = (state) => ({
  ...state,
  isLoading: true
});

const getUserInforSuccess = (state, payload) => ({
  ...state,
  isLoading: false,
  userInfor: payload
});

const getUserInforError = (state, payload) => ({
  ...state,
  isLoading: false,
  hasError: true,
  error: payload.error
});

const strategies = {
  [ACTION_TYPES.GET_LIST_USER] : getListUser,
  [ACTION_TYPES.GET_LIST_USER_SUCCESS] : getListUserSuccess,
  [ACTION_TYPES.GET_LIST_USER_ERROR] : getListUserError,
  [ACTION_TYPES.GET_USER_INFOR]: getUserInfor,
  [ACTION_TYPES.GET_USER_INFOR_SUCCESS]: getUserInforSuccess,
  [ACTION_TYPES.GET_USER_INFOR_ERROR]: getUserInforError,
  __default__: (state) => state
};

const userReducer = createReducer(strategies, initialState);

export default userReducer;
