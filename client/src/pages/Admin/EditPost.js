import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Editor from "./Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const queryClient = useQueryClient();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://dhhamaknews.uc.r.appspot.com/api/post/" + id).then(
      (response) => {
        response.json().then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.description);
          setSummary(postInfo.subtitle);
        });
      }
    );
  }, []);

  const updatePost = async ({ updatedData }) => {
    try {
      const { data } = await axios.put(
        "https://dhhamaknews.uc.r.appspot.com/api/update-post",
        updatedData
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };
  const { mutate: mutateUpdatePostDetail } = useMutation({
    mutationFn: ({ updatedData }) => {
      return updatePost({
        updatedData,
      });
    },
    onSuccess: () => {
      toast.success("Post Updated Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.set("title", title);
    updatedData.set("subtitle", summary);
    updatedData.set("description", content);
    updatedData.set("id", id);
    if (files?.[0]) {
      updatedData.set("file", files?.[0]);
    }
    mutateUpdatePostDetail({
      updatedData,
    });
  };

  return (
    <>
      <Toaster />
      <form>
        <input
          type="title"
          placeholder={"Title"}
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="button-add"
        />
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className="button-add"
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button
          style={{ marginTop: "5px" }}
          className="button2"
          onClick={(e) => handleUpdatePost(e)}
        >
          Update post
        </button>
      </form>
    </>
  );
}
