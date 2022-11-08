import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { postsApi } from './api/posts'
import  postsReducer from './slice/posts'


const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;