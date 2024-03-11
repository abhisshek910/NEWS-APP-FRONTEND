import React from "react";
import Latestpost from "./Latestpost";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { isError, useQuery, useQueries } from "react-query";
import axios from "axios";
import ArticleDetailSkeleton from "./ArticleDetailsSkeleteon";
import ErrorMessage from "./ErrorMessage";
import SociaShare from "./SociaShare";
import parse from "html-react-parser";
import moment from "moment";
import VideoPlayer from "../../components/VideoPlyaer";
import userImage from "../../assets/user.png";
import toast, { Toast, Toaster } from "react-hot-toast";
import { ReactionBarSelector } from "@charkour/react-reactions";
const ArticleDetailsPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});

  const getAllPosts = async () => {
    try {
      const { data, headers } = await axios.get(
        "https://dhhamaknews.uc.r.appspot.com/api/all-postsss"
      );
      return { data, headers };
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  const getSinglePost = async ({ id }) => {
    try {
      const { data } = await axios.get(
        `https://dhhamaknews.uc.r.appspot.com/api/post/${id}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  const {
    data: singlePostData,
    isLoading: singlePostLoading,
    isError: singlePostError,
  } = useQuery({
    queryKey: ["singlePost", { id }],
    queryFn: () => getSinglePost({ id }),
    onSuccess: (data) => {
      setPost(data);
    },
  });

  const {
    data: allPostsData,
    isLoading: allPostsLoading,
    isError: allPostsError,
  } = useQuery({
    queryKey: "allPosts",
    queryFn: () => getAllPosts(),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const queries = [
    { queryKey: ["singlePost", { id }], queryFn: () => getSinglePost({ id }) },
    { queryKey: "allPosts", queryFn: () => getAllPosts() },
  ];

  const results = useQueries(queries);

  // Access individual query results
  const singlePostResult = results[0];
  const allPostsResult = results[1];

  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
  });

  const onInputChange = (e) => {
    const { target } = e;

    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleCommentSubmit = async () => {
    setError(false);
    const { name, email, comment } = formData;
    if (!name || !comment) {
      setError(true);
      return;
    }
    const postId = id;

    try {
      const response = await fetch(
        `https://dhhamaknews.uc.r.appspot.com/api/post/add-comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Comment Added Sucssfully");
        setFormData({
          name: null,
          email: null,
          comment: null,
        });
      } else {
        toast.error("Unable to add comment");
      }

      // Optionally, you can reset the form data
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <>
      {singlePostLoading ? (
        <ArticleDetailSkeleton />
      ) : singlePostError ? (
        <ErrorMessage />
      ) : (
        <>
          <Toaster />

          <section className="container mx-auto max-w-8xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
            <article className="flex-1">
              <img
                src={post?.imageUrl}
                className="rounded-xl w-full h-1/4"
              ></img>

              <h1 className="text-xl  font-medium font-roboto mt-8 text-dark-hard md:text-[26px]">
                {post?.title}
              </h1>

              <div className="mt-4 text-sky-800">
                <p className="text-lg">{post.subtitle}</p>
              </div>

              {post?.videoUrl && (
                <div className="mt-10">
                  <VideoPlayer videoUrl={post?.videoUrl}></VideoPlayer>
                </div>
              )}
              <div className="mt-4 text-dark-soft">
                <p className="leading-7 text-base ">
                  {parse(post?.description)}
                </p>
              </div>
            </article>
            <div>
              <Latestpost
                classname="mt-8 lg:mt-0 lg:max-w-xs"
                posts={allPostsData?.data}
              ></Latestpost>
              <div className="mt-7">
                <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                  Share on:
                </h2>
                <SociaShare
                  url={encodeURI(window.location.href)}
                  title={encodeURIComponent(post?.title)}
                />
              </div>
            </div>
          </section>
          <div className="flex justify-center flex-nowrap items-center  mt-6 mb-6">
            <div className="flex items-center gap-x-2 md:gap-x-2.5 ">
              <img
                src={userImage}
                alt="post profile"
                className=" w-24 h-24 rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                  संपादक-दीपक अग्रवाल <br></br>सहसंपादक-सत्यम बाजपाई
                </h4>
              </div>
            </div>
          </div>

          <div className="bg-white  rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-2xl mb-8 font-semibold border-b pb-4 pl-2">
              Leave a Reply
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <textarea
                value={formData.comment}
                onChange={onInputChange}
                className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                name="comment"
                placeholder="Comment"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={formData.name}
                onChange={onInputChange}
                className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder="Name"
                name="name"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">All fields are mandatory</p>
            )}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleCommentSubmit}
                className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer"
              >
                Post Comment
              </button>
            </div>
          </div>

          {post?.comments.length > 0 && (
            <div className="bg-white  rounded-lg p-8 pb-12 mb-8">
              <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {post?.comments.length} Comments
              </h3>
              {post?.comments.map((comment, index) => (
                <div key={index} className="border-b border-gray-100 mb-4 pb-4">
                  <p className="mb-4">
                    <span className="font-semibold">{comment.name}</span> on{" "}
                    {moment(comment.createdAt).format("MMM DD, YYYY")}
                  </p>
                  <p className="whitespace-pre-line text-gray-600 w-full">
                    {parse(comment.comment)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ArticleDetailsPage;
