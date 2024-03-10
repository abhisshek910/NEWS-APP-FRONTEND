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
  const [allPost, setAllPost] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(6);

  const loadMoreArticles = () => {
    // Increase the number of visible articles by 6
    setVisibleArticles((prevVisibleArticles) => prevVisibleArticles + 6);
  };

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

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    onSuccess: () => {},
  });

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
          data?.data
            .slice(0, visibleArticles)
            .map((post) => (
              <ArticleCard
                key={post._id}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                post={post}
              />
            ))
        )}
      </div>
      {visibleArticles < data?.data.length && (
        <button
          className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg"
          onClick={loadMoreArticles}
        >
          <span>More Articles</span>
          <FaArrowRight className="w-3 h-3"></FaArrowRight>
        </button>
      )}
    </section>
  );
};

export default Articles;
