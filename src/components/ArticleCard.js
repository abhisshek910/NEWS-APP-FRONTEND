import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
function ArticleCard({ className, post, latestProp }) {
  console.log(latestProp);

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0,1)_0px_9px_30px] ${className}`}
    >
      <Link to={`/news/${post._id}`}>
        <div className="aspect-[3/2]">
          <img
            src={`https://dhamakka-news.onrender.com${post.imageUrl}`}
            className=" object-cover object-center  w-full h-full"
          ></img>
        </div>
      </Link>
      <div className="pt-5 pb-5 pl-3 md:pl-2 lg:pl-2">
        <Link to={`/news/${post._id}`}>
          <h2 className="font-roboto font-bold text-4xl text-dark-soft md:text-2xl lg:text-[32px]">
            {post.title}
          </h2>
          <p className="text-dark-light mt-3 text-3xl  md:text-lg lg:max-h-20 md:max-h-20 sm:max-h-5  overflow-hidden">
            {parse(post.description)}
          </p>

          <p className="pt-3 text-xl text-blue-400">Read More</p>
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;