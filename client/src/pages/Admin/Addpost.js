import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import parse from "html-react-parser";
import toast, { Toaster, Toast } from "react-hot-toast";
import Editor from "./Editor";
import "./somecss.css";
import { ClipLoader } from "react-spinners";

export default function Addpost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [videos, setvideos] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    setLoading(true);
    const data = new FormData();

    data.set("title", title);
    data.set("subtitle", summary);
    data.set("description", content);
    data.set("image", files[0]);
    data.set("Video", videos[0]);

    try {
      const response = await fetch(
        "https://news-app-backend-theta.vercel.app/api/add-post",
        {
          method: "POST",
          body: data,
        }
      );
      if (response.ok) {
        toast.success("Post Added Successfully");
      } else {
        toast.error("Post Not Added");
        console.log(response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred while creating the post", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  }

  return (
    <>
      <Toaster />
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="button-add"
        />
        <input
          type="subtitle"
          placeholder={"subtitle"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className="button-add"
        />
        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(ev) => setFiles(ev.target.files)}
          className="button-add"
        />
        <label>Upload Video</label>
        <input
          type="file"
          accept="video/*"
          onChange={(ev) => setvideos(ev.target.files)}
          className="button-add"
        />
        <Editor value={content} onChange={setContent} />
        <button
          style={{ marginTop: "5px" }}
          className="button2"
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color={"#ffffff"} loading={true} size={15} />
          ) : (
            "Create post"
          )}
        </button>
      </form>
    </>
  );
}
