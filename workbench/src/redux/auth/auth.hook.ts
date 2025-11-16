import { useDispatch, useSelector } from 'react-redux';
import { getUserStatus, postLoginUser, postLogoutUser } from './auth.action';
import type { RootState } from '@redux/store';

export const useAuthDetails = () => {
  const dispatch = useDispatch();
  // OPTION 1
  const authState = useSelector((state: RootState) => state.auth);
  // OPTION 2
  // const isUserLoggedIn = useSelector(state => state.auth?.isUserLoggedIn);
  // const user = useSelector(state => state.auth?.user);
  return {
    getUserStatus: () => {
      console.log('getUserStatus: dispatching from hook');
      return dispatch(getUserStatus());
    },
    postLoginUser: (payload: unknown) => dispatch(postLoginUser(payload)),
    postLogoutUser: () => dispatch(postLogoutUser()),

    isUserLoggedIn: authState?.isUserLoggedIn,
    user: authState?.user,
    // FOR OPTION 2
    // user,
    // isUserLoggedIn,
  };
};
