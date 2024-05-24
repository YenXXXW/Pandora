// authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string; refreshToken: string }, { username: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted({ username, password }, { dispatch, getState }) {
        try {
          const result = await dispatch(authApi.endpoints.login.initiate({ username, password }));
          const accessToken = result.data.accessToken;
          const refreshToken = result.data.refreshToken;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          dispatch(authSlice.actions.updateAccessToken(accessToken));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: 'auth/refresh-token',
        method: 'POST',
        body: {
          refreshToken: localStorage.getItem('refreshToken'),
        },
      }),
      async onQueryStarted(_, { dispatch, getState }) {
        try {
          const result = await dispatch(authApi.endpoints.refreshToken.initiate());
          const newAccessToken = result.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);
          dispatch(authSlice.actions.updateAccessToken(newAccessToken));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, getState }) {
        try {
          await dispatch(authApi.endpoints.logout.initiate());
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(authSlice.actions.updateAccessToken(null));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export default authApi;