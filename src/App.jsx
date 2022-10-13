import { useSelector, useDispatch } from "react-redux";
import { useGetAllPostsQuery } from "./store/api/posts";
import { addPosts } from "./store/slice/posts";

function App() {
    const { posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const { data, error, loading } = useGetAllPostsQuery();

    const onClick = () => {
        // dispatch(addPosts(data))
    };
    return (
        <>
            <div className="container">
                <button onClick={onClick}>add post</button>
                <div>
                    {!posts?.length && <p>no posts</p>}
                    {!!posts?.length &&
                        posts?.map((post) => {
                            return (
                                <div key={post.id} className="post">
                                    <h2>
                                        {post.title} {post.id}
                                    </h2>
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
}

export default App;
