import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllPostsQuery } from "./store/api/posts";
import { deletePost, addPosts, markPost } from "./store/slice/posts";

function App() {

    const [value, setValue] = useState("")

    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const { data, error, loading } = useGetAllPostsQuery();


      const handleSubmit = e => {
        e.preventDefault() 
        dispatch(addPosts(value));
        setValue("");
      };

      const handleMark = (id) => {
        dispatch(markPost(id))
        console.log(id)
      }

    const onClick = (post) => {
        dispatch(deletePost(post))
    };
    return (
        <>
            <div className="container">
                <div className="new-post">
                <form onSubmit={handleSubmit}>
                    <label>add todo{' '}</label>
                    <input type="text" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add new todo..." />
                </form>
                </div>
                <div>
                    {!posts?.length && <p>no posts</p>}
                    {!!posts?.length &&
                        posts?.map((post) => {
                            return (
                                <div key={post.id} id={post.id} className="post">
                                    <h2 style={{ textDecoration: post.completed ? "line-through" : "" }}>
                                        {post.title} 
                                    </h2>
                                    <input checked={post.completed} type={"checkbox"} variant="outline-success" onClick={() => handleMark(post.id)}/>{'   '}
                                    <button className="btn" onClick={()=> onClick(post.id)}  disabled={!post.completed}>
                                        Delete post
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default App;
