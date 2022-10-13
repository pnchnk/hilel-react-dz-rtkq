import { createSlice } from "@reduxjs/toolkit";
import postsApi from "../api/posts";

const initialState = {
    posts: []
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        addPost:(state, {payload}) => {
            state.posts.push(payload)
        },
        addPosts:(state, {payload}) => {
            state.posts = payload
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

export const {addPosts} = postsSlice.actions;

export default postsSlice.reducer;