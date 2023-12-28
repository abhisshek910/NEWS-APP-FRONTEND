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
const ArticleDetailsPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});

  const getAllPosts = async () => {
    try {
      const { data, headers } = await axios.get(
        "https://dhamakka-news.onrender.com/api/all-post"
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
        `https://dhamakka-news.onrender.com/api/post/${id}`
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  // const { data, isLoading, isError } = useQuery({
  //   queryFn: () => getSinglePost({ id }),
  //   onSuccess: (data) => {
  //     setPost(data);
  //   },
  // });

  // const { data: pd} = useQuery({
  //   queryFn: () => getAllPosts(),
  //   onSuccess: () => {
  //     console.log(pd);
  //   },
  // });

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

  return (
    <>
      {singlePostLoading ? (
        <ArticleDetailSkeleton />
      ) : singlePostError ? (
        <ErrorMessage />
      ) : (
        <section className="container mx-auto max-w-8xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <img
              src={`https://dhamakka-news.onrender.com${post?.imageUrl}`}
              className="rounded-xl w-full h-1/4"
            ></img>

            <h1 className="text-3xl lg:text-6xl font-medium font-roboto mt-8 text-dark-hard md:text-[26px]">
              {post?.title}
            </h1>
            <div className="mt-4 text-dark-soft">
              <p className="leading-7 text-xl lg:text-4xl">
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
      )}
    </>
  );
};

export default ArticleDetailsPage;
