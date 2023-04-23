import ACTION_TYPES from '@app/core/constants/types';
import { AuthService } from '@app/core/services/auth.service';
import { AnyAction } from 'redux';
import { put, takeLatest } from 'redux-saga/effects';
import { getListUserError, getListUserSuccess, getUserInforError, getUserInforSuccess } from './user.action';

const auth = new AuthService();
export function* getListUser() {
  try {
    const res = yield auth.getListUser();
    // handle successful response
    yield put(getListUserSuccess(res));
  } catch (error) {
    // handle error response
    yield put(getListUserError((error.response?.data)));
  }
}

export function* getUserInfor({ payload }: AnyAction) {
  try {
    const res = yield auth.getUserInfor(payload.id);
    // handle successful response
    yield put(getUserInforSuccess(res));
  } catch (error) {
    // handle error response
    yield put(getUserInforError((error.response?.data)));
  }
}

export function* watchUser() {
  yield takeLatest(ACTION_TYPES.GET_LIST_USER, getListUser);
  yield takeLatest(ACTION_TYPES.GET_USER_INFOR, getUserInfor);
}
