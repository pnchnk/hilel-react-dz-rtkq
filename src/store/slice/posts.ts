import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import postsApi from "../api/posts";
import { ITodosSlice } from "./type";

const initialState : ITodosSlice = {
    posts: [],
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPosts: (state, { payload }) => {
            state.posts.unshift({
                title: payload,
                id: Math.random(),
                btn: true,
                checked: false,
                completed: false,
                userId: 11,
            });
        },
        deletePost: (state, {payload}: PayloadAction<number>) => {
            const id = payload;
            state.posts = state.posts.filter((item) => item.id !== id);
        },
        markPost: (state, { payload }) => {
            const id = payload;
            state.posts.forEach((el) => {
                if (el.id === id) {
                    el.completed = !el.completed;
                    el.btn = false;
                    el.checked = true;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            postsApi.endpoints.getAllPosts.matchFulfilled,
            (state, { payload }) => {
                state.posts = payload;
            }
        );
    },
});

export const { addPosts, deletePost, markPost } = postsSlice.actions;

export default postsSlice.reducer;
