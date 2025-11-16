import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  accessToken?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  isUserLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isUserLoggedIn: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User | null>) => {
      console.log('setUserDetails: slice: ', action.payload);
      state.isUserLoggedIn = !!action.payload;
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = AuthSlice.actions;

export default AuthSlice.reducer;
