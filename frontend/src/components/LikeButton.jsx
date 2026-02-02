import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const LikeButton = ({ postId, likes }) => {
  const { user } = useAuth();

  const [likeList, setLikeList] = useState(likes || []);
  const [loading, setLoading] = useState(false);

  const hasLiked = user && likeList.includes(user.username);

  const handleLike = async () => {
    if (!user || loading) return;

    try {
      setLoading(true);

      setLikeList((prev) =>
        hasLiked
          ? prev.filter((name) => name !== user.username)
          : [...prev, user.username]
      );

      await api.put(`/posts/${postId}/like`);
    } catch (error) {
      setLikeList(likes); // rollback
      console.error("Like failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <span
    style={{background:"white"}}
      className={`like-btn ${hasLiked ? "liked" : "dislike"}`}
      onClick={handleLike}
      disabled={loading}
    >
      {hasLiked ? (
        <FaHeart className="like-icon" />
      ) : (
        <FiHeart className="like-icon" />
      )}
      <span className="like-count">{likeList.length}</span>
    </span>
  );
};

export default LikeButton;
