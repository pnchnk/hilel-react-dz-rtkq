import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllPostsQuery } from "./store/api/posts";
import { deletePost, addPosts } from "./store/slice/posts";

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

    const onClick = (post) => {
        dispatch(deletePost(post))
    };
    return (
        <>
            <div className="container">
                <div className="new-post">
                <form onSubmit={handleSubmit}>
                    <label>add post{' '}</label>
                    <input type="text" className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add new post..." />
                </form>
                </div>
                <div>
                    {!posts?.length && <p>no posts</p>}
                    {!!posts?.length &&
                        posts?.map((post) => {
                            return (
                                <div key={post.id} className="post">
                                    <h2>
                                        {post.title} 
                                    </h2>
                                    <button className="btn" onClick={()=> onClick(post.id)}>
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
