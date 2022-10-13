import { configureStore } from '@reduxjs/toolkit'
import { postsApi } from './api/posts'
import basketReducer from './slice/basketSlice'
import  postsReducer from './slice/posts'

export default configureStore({
  reducer: {
    basket: basketReducer,
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});
