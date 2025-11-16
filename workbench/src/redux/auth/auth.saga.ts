/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getUserStatusApi, postLoginDetailsApi } from './auth.api';
import {
  GET_USER_STATUS,
  POST_LOGIN_DETAILS,
  POST_USER_LOGOUT,
} from './auth.action';
import LS from '@services/localstorage.service';
import { setUserDetails } from './auth.slice';

function* getUserStatusSaga() {
  console.log('getUserStatus: from saga');
  try {
    const { data: response }: { data: any } = yield call(getUserStatusApi);
    console.log('GetUserStatus: resp: ', response);
    yield put(setUserDetails(response));
  } catch (e) {
    console.log('Err @getUserStatusSaga: ', e);
    yield put(setUserDetails(null));
  }
}

const samplePayload = {
  username: 'emmaj',
  password: 'emmajpass',
  expiresInMins: 1,
};

interface LoginAction {
  type: string;
  payload?: Record<string, any>;
}

function* postLoginDetailsSaga(action: LoginAction) {
  try {
    console.log('postLoginDetailsSaga: ', action.payload);
    const payload = { ...samplePayload, ...action.payload };
    const { data: response }: { data: any } = yield call(
      postLoginDetailsApi,
      payload
    );
    yield put(setUserDetails(response));
    const { accessToken } = response;
    LS.set('USER_ACCESS_TOKEN', accessToken);
    yield call(getUserStatusSaga);
  } catch (e) {
    console.log('Err @postLoginDetailsSaga: ', e);
    yield put(setUserDetails(null));
  }
}

function* postLogoutSaga() {
  try {
    console.log('postLogoutSaga: ');
    LS.delete('USER_ACCESS_TOKEN');
    yield put(setUserDetails(null));
  } catch (e) {
    console.log('Err @postLogoutSaga: ', e);
    yield put(setUserDetails(null));
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(GET_USER_STATUS, getUserStatusSaga),
    takeEvery(POST_LOGIN_DETAILS, postLoginDetailsSaga),
    takeEvery(POST_USER_LOGOUT, postLogoutSaga),
  ]);
}
