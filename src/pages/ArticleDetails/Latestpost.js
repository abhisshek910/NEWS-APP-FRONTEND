import React from "react";
import { Link } from "react-router-dom";

function Latestpost({ classname, posts = [] }) {
  return (
    <div
      className={`w-full shadow-[rgba(7,_65,_210,_0,1)_0px_9px_30px] rounded-lg p-2 ${classname}`}
    >
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
        Latest Articles
      </h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {posts?.slice(0, 6).map((item) => (
          <div className="flex space-x-3 flex-nowrap items-center">
            <img
              className="aspect-square object-cover rounded-lg w-1/5"
              src={item?.imageUrl}
            ></img>
            <div className="text-sm font-roboto text-dark-hard font-medium">
              <h3 className=" text-sm font-roboto text-dark-hard font-medium md:text-base lg:text-lg">
                <Link to={`/news/${item?._id}`}> {item?.title}</Link>
              </h3>
              <span className="text-xs opacity-60">
                {new Date(item?.createdAt).toLocaleDateString("en-Us", {
                  day: "numeric",
                  month: "short",

                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Latestpost;
