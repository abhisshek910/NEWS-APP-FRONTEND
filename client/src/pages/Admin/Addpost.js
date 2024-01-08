import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import parse from "html-react-parser";
import toast, { Toaster, Toast } from "react-hot-toast";
import Editor from "./Editor";
import "./somecss.css";

export default function Addpost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();

    data.set("title", title);
    data.set("subtitle", summary);
    data.set("description", content);
    data.set("file", files[0]);
    ev.preventDefault();
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
        <input
          type="file"
          onChange={(ev) => setFiles(ev.target.files)}
          className="button-add"
        />
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "5px" }} className="button2">
          Create post
        </button>
      </form>
    </>
  );
}
