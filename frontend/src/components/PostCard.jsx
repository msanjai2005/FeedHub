import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import "../styles/post.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">
          {post.username.slice(0, 2).toUpperCase()}
        </div>
        <span className="post-username">{post.username}</span>
      </div>

      {post.text && <p className="post-text">{post.text}</p>}

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="post-image"
        />
      )}

      <div className="post-actions">
        <LikeButton postId={post._id} likes={post.likes} />
        <span className="comment-count">
          {post.comments.length} comments
        </span>
      </div>

      <CommentSection
        postId={post._id}
        comments={post.comments}
      />
    </div>
  );
};

export default PostCard;
