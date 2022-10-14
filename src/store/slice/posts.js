import { createSlice } from "@reduxjs/toolkit";
import postsApi from "../api/posts";

const initialState = {
    posts: []
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        addPosts:(state, {payload}) => {
            state.posts.unshift({ title : payload, id: Math.random() });
        },
        deletePost: (state, { payload }) => {
            const id = payload;
            state.posts = state.posts.filter(item => item.id !== id);
          },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            postsApi.endpoints.getAllPosts.matchFulfilled,
            (state, {payload}) => {
                state.posts = payload
            }
        );
    }
})

export const {addPosts, deletePost} = postsSlice.actions;

export default postsSlice.reducer;