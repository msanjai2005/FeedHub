import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/comment.css";

const CommentSection = ({ postId, comments }) => {
  const { user } = useAuth();

  const [commentList, setCommentList] = useState(comments || []);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    if (!text.trim() || !user || loading) return;

    const newComment = {
      username: user.username,
      text,
    };

    try {
      setLoading(true);

      // Optimistic update
      setCommentList((prev) => [...prev, newComment]);
      setText("");

      await api.post(`/posts/${postId}/comment`, { text });
    } catch (error) {
      console.error("Comment failed");
      // rollback
      setCommentList(comments);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-section">
      {commentList.map((comment, index) => (
        <div key={index} className="comment">
          <span className="comment-user">
            {comment.username}
          </span>
          <span className="comment-text">
            {comment.text}
          </span>
        </div>
      ))}

      {user && (
        <div className="comment-input">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleComment} disabled={loading}>
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
