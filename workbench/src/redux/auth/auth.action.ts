const prefix = 'AUTH/';

export const GET_USER_STATUS = `${prefix}GET_USER_STATUS`;
export const POST_LOGIN_DETAILS = `${prefix}POST_LOGIN_DETAILS`;
export const SET_USER_DETAILS = `${prefix}SET_USER_DETAILS`;
export const POST_USER_LOGOUT = `${prefix}POST_USER_LOGOUT`;

export const getUserStatus = () => {
  console.log('getUserStatus: from action');
  return { type: GET_USER_STATUS };
};

export const postLoginUser = (payload: unknown) => ({
  type: POST_LOGIN_DETAILS,
  payload,
});
export const postLogoutUser = () => ({ type: POST_USER_LOGOUT });
