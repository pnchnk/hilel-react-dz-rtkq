import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from './api/posts'
import  postsReducer from './slice/posts'

export default configureStore({
  reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});
