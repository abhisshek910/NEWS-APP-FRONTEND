import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
function ArticleCard({ className, post, latestProp }) {
  console.log(latestProp);

  return (
    <div
      className={`rounded-xl  overflow-hidden shadow-[rgba(7,_65,_210,_0,1)_0px_9px_30px]  ${className}`}
    >
      <Link to={`/news/${post._id}`}>
        <div className="aspect-[3/2]">
          <img
            src={post?.imageUrl}
            className=" object-cover object-center  w-full h-full"
          ></img>
        </div>
      </Link>
      <div className="pt-5 pb-5 pl-3 md:pl-2 lg:pl-2 ">
        <Link to={`/news/${post._id}`}>
          <h2 className="sm:h-12 md:h-12 lg:h-24 font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]  ">
            {post.title}
          </h2>
          <p className=" h-12  text-dark-soft mt-5 text-sm  md:text-lg   overflow-hidden">
            {parse(post.subtitle)}
          </p>
          <p className="h-14   text-dark-light mt-4 text-sm  md:text-lg   overflow-hidden ">
            {parse(post.description)}
          </p>

          <p className="pt-3 text-xl text-blue-400">Read More</p>
        </Link>
      </div>
    </div>
  );
}

export default ArticleCard;
