import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllPostsQuery } from "./store/api/posts";
import { deletePost, addPosts, markPost } from "./store/slice/posts";

function App() {
    useGetAllPostsQuery();
    const [value, setValue] = useState("");
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [userSort, setUserSort] = useState('all');
    const [showCompleted, setShowCompleted] = useState(false)

    const onSelect = (e) => {
        setUserSort(e.target.value)
        setPage(1)
    }

    const sortedList = useMemo(() => {
        const sortList = showCompleted ? posts.filter(item=> item.completed) : posts;
        if(userSort === 'all'){
            return sortList;
        }
        return sortList.filter(item => item.userId === +userSort).sort((a,b)=> a.id - b.id)
    }, [posts, userSort, showCompleted])

    const paginationNumbers = useMemo(() => sortedList?.length > 20 ? Math.round(sortedList.length / 20) : 1, [sortedList]);

    const filteredTodos = useMemo(() => {
        const start = (page - 1) * 20;
        const end = start + 20;
        return sortedList.slice(start, end).sort((a,b)=> a.id - b.id);
    }, [page, sortedList ])

    const userIdArr = useMemo(() => new Set(posts?.map(t => t.userId)), [posts])
   
    //todos methods
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addPosts(value));
        setValue("");
    };

    const handleMark = (id) => {
        dispatch(markPost(id));
        console.log(id);
    };

    const onClick = (post) => {
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
                    <select value={userSort} onChange={onSelect}>
                        <option selected value={'all'}>All</option>
                        {
                            [...userIdArr]?.map(id => <option key={id} value={id}>UserId:{id}</option>)
                        }
                    </select>
                    <label>
                        <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)}/>
                        <span>Completed</span>
                    </label>
                </div>
                <div>
                    {!posts?.length && <p>no posts</p>}
                    {!!posts?.length &&
                        filteredTodos?.map((post) => {
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
                                        variant="outline-success"
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
                    <div className="todos__pagination">
                        {
                        [...Array(paginationNumbers)]?.map((_, idx) => {
                            return (
                                <button key={idx} className={`todos-pagination ${(page === idx+ 1) && 'todos-pagination--active'}`}
                                 onClick={() => setPage(idx + 1)}> 
                                    <span className="todos-pagination__num">{idx + 1}</span>
                                </button>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
