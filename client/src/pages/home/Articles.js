import React from "react";
import ArticleCard from "../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import ArticleCardSkeleton from "../ArticleDetails/ArticleCardSkeleton";
import ErrorMessage from "../ArticleDetails/ErrorMessage";
const Articles = () => {
  const [lastPostId, setLastPostId] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const loadMoreArticles = () => {
    setShowLoading(true);
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 6);
  };

  const getAllPosts = async () => {
    try {
      const { data, headers } = await axios.get(
        `https://dhhamaknews.uc.r.appspot.com/api/all-postse?limit=${visiblePosts}&lastPostId=${
          lastPostId || ""
        }`
      );
      return { data, headers };
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPosts(),
    onSuccess: (newData) => {
      if (newData.data && newData.data.length > 0) {
        setLastPostId(newData.data[newData.data.length - 1]._id);
      }
      setShowLoading(false);
    },
  });
  useEffect(() => {
    refetch();
  }, [visiblePosts, refetch]);

  useEffect(() => {
    if (!isLoading && showLoading) {
      setLoadingMore(false);
    }
  }, [isLoading, showLoading]);

  return (
    <section className="flex flex-col container mx-auto  px-5 py-10">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
            />
          ))
        ) : isError ? (
          <ErrorMessage />
        ) : (
          data?.data.map((post) => (
            <ArticleCard
              key={post._id}
              className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              post={post}
            />
          ))
        )}
      </div>

      {data && data.data.length >= visiblePosts && !isLoading && !isError && (
        <button
          className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
          onClick={loadMoreArticles}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "More Articles"}
          <FaArrowRight className="w-3 h-3"></FaArrowRight>
        </button>
      )}
      {showLoading && (
        <div className="text-center my-4">Loading more posts...</div>
      )}
      {showLoading &&
        [...Array(3)].map((item, index) => (
          <ArticleCardSkeleton
            key={index}
            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
          />
        ))}
    </section>
  );
};

export default Articles;
