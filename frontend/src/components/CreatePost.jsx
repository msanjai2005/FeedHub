import { useState } from "react";
import api from "../services/api";
import "../styles/createPost.css";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const { clicked, setClicked } = useAuth();

  const uploadToCloudinary = async () => {
    if (!image) return "";

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text && !image) {
      setError("Post must contain text or image");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const imageUrl = await uploadToCloudinary();

      await api.post("/posts", {
        text,
        image: imageUrl,
      });

      setText("");
      setImage(null);
      setPreview(null);
      setClicked(false);

      if (onPostCreated) onPostCreated();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outlayer">
      <form className="create-post" onSubmit={handleSubmit}>
        
        {error && <p className="error-text">{error}</p>}
        <div style={{
          width:"100%",
          display:"flex",
          justifyContent:"space-between"
        }}>
          <h2>Create Post</h2>
          <div
            onClick={() => setClicked(false)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "20%",
              backgroundColor: "#dc2626", // red
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <FaTimes size={14} color="#ffffff" />
          </div>
        </div>

        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="preview" />
            <div
              className="remove-image"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
            >
              <FaTimes size={12} color="#fff" />
            </div>
          </div>
        )}
        <div className="post-actions">
          <label className="file-upload">
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
              hidden
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
