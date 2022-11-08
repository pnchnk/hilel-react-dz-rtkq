import React from "react";
import { useState, useMemo } from "react";

//components
import TodosSort from "./components/Todos/TodosSort";
import TodosPagination from "./components/Todos/TodosPagination";

//api
import { useGetAllPostsQuery } from "./store/api/posts";

//slice
import { deletePost, addPosts, markPost } from "./store/slice/posts";

//types
import { ITodo } from "./types";

//hooks
import { useAppSelector, useAppDispatch } from "./store/hooks";
import useGetSortedList from './hooks/useGetSortedList'
import useFilterTodos from "./hooks/useFilterTodos";

function App() {
    useGetAllPostsQuery();
    const [value, setValue] = useState("");
    const { posts } = useAppSelector(state => state.posts);
    const dispatch =  useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const [userSort, setUserSort] = useState('all');
    const [showCompleted, setShowCompleted] = useState<boolean>(false)

    const onSelect = (e : React.ChangeEvent<HTMLSelectElement>): void => {
        setUserSort(e.target.value)
        setPage(1)
    }

    const sortedList = useGetSortedList(showCompleted, posts, userSort)

    const filteredTodos = useFilterTodos(page, sortedList)

    const userIdArr: Set<number> = useMemo(() => new Set(posts?.map(t => t.userId)), [posts])
   
    //todos methods
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(addPosts(value));
        setValue("");
    };

    const handleMark = (id: number) => {
        dispatch(markPost(id));
    };

    const onClick = (post: number) => {
        dispatch(deletePost(post));
    };

    return (
        <>
            <div className="container">
                <div className="new-post">
                    <form onSubmit={handleSubmit}>
                        <label>add todo </label>
                        <input
                            type="text"
                            className="input"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Add new todo..."
                        />
                    </form>
                </div>
                <div className="todos__sort">
                    <TodosSort userIdArr={userIdArr} onSelect={onSelect} userSort={userSort}/>
                    <label>
                        <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)}/>
                        <span>Completed</span>
                    </label>
                </div>
                <div>
                    {!posts?.length && <p>no posts</p>}
                    {!!posts?.length &&
                        filteredTodos?.map((post : ITodo) => {
                            return (
                                <div
                                    key={post.id}
                                    id={post.id}
                                    className="post"
                                >   
                                    <span>{post.id}</span>
                                    <h2
                                        style={{
                                            textDecoration: post.completed
                                                ? "line-through"
                                                : "",
                                        }}
                                    >
                                        {post.title}
                                    </h2>
                                    <input
                                        checked={post.completed}
                                        type={"checkbox"}
                                        onClick={() => handleMark(post.id)}
                                    />
                                    {"   "}
                                    <button
                                        className="btn"
                                        onClick={() => onClick(post.id)}
                                        disabled={!post.completed}
                                    >
                                        Delete post
                                    </button>
                                </div>
                            );
                        })}
                        <TodosPagination page={page} setPage={setPage} sortedList={sortedList}/>
                </div>
            </div>
        </>
    );
}

export default App;

