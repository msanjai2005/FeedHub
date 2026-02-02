import { useContext, useEffect, useState } from "react";
import api from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import "../styles/feed.css";
import BlueCirclePlus from "../components/BlueCirclePlus";
import { useAuth } from "../context/AuthContext";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { clicked, setClicked } = useAuth();
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const style = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
  };

  return (
    <div>
      {clicked && (
          <CreatePost onPostCreated={fetchPosts} setclicked={setClicked} />
        )}
      <div className="feed-container">
        
        {loading ? (
          <p className="loading-text">Loading feed...</p>
        ) : posts.length === 0 ? (
          <p className="empty-text">No posts yet</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
        <div style={style} onClick={() => setClicked(true)}>
          <BlueCirclePlus />
        </div>
      </div>
    </div>
  );
};

export default Feed;
