import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import {
  asyncGetData,
  asyncRemoveValue,
  asyncStoreData,
} from '../../utils/store/AsyncStorageHelper';

interface User {
  usr_id: number;
  usr_fname: string;
  usr_lname: string;
  usr_username: string;
  usr_email: string;
  usr_profile_img: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  emailUnverified: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  emailUnverified: false,
};

export const loginUser = createAsyncThunk<
  {user: User; token: string},
  {email: string; password: string},
  {rejectValue: {message: string; emailUnverified?: boolean}}
>('auth/loginUser', async ({email, password}, {rejectWithValue}) => {
  try {
    const response = await axios.post(
      'http://3.7.81.243/projects/plie-api/public/api/login',
      {email, password},
    );

    const resData = response.data;

    if (!resData.success) {
      const emailUnverified = resData.data?.user_email_unverified === 1;
      return rejectWithValue({
        message: resData.message || 'Login failed.',
        emailUnverified,
      });
    }

    const {user, token} = resData.data;

    await asyncStoreData('authToken', token);
    await asyncStoreData('authUser', user);

    return {user, token};
  } catch (err) {
    const error = err as AxiosError;

    if (error.response) {
      const msg =
        (error.response.data as any)?.message ||
        'Server error occurred during login.';
      return rejectWithValue({message: msg});
    } else if (error.request) {
      return rejectWithValue({
        message: 'Network error. Please check your connection.',
      });
    } else {
      return rejectWithValue({message: 'An unknown error occurred.'});
    }
  }
});

export const rehydrateAuth = createAsyncThunk('auth/rehydrate', async () => {
  const token = await asyncGetData('authToken');
  const user = await asyncGetData('authUser');

  if (token && user) {
    return {user, token};
  }

  return {user: null, token: null};
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      asyncRemoveValue('authToken');
      asyncRemoveValue('authUser');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.emailUnverified = false;
    },
    resetError: state => {
      state.error = null;
      state.emailUnverified = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.emailUnverified = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.emailUnverified = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Login failed.';
        state.emailUnverified = action.payload?.emailUnverified ?? false;
      })
      .addCase(rehydrateAuth.fulfilled, (state, action) => {
        const {user, token} = action.payload;
        if (user && token) {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        }
      });
  },
});

export const {logout, resetError} = authSlice.actions;
export default authSlice.reducer;
