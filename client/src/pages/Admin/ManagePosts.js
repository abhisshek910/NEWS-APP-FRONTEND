import React from "react";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import apiUrl from "../../constant/const";
const ManagePosts = () => {
  const [data, setData] = useState([]); // Array to store your entries
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const getAllPosts = async () => {
    try {
      const { data, headers } = await axios.get(apiUrl + "/api/all-post");
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  const getAllPostss = async (page) => {
    try {
      const { data, headers } = await axios.get(
        `${apiUrl}/api/all-postsese?page=${page}`
      );
      return { data, headers };
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  const { dataa, isLoading, isError, isFetching, refetch } = useQuery({
    queryFn: () => getAllPostss(page),
    onSuccess: (dataa) => {
      setData(dataa.data);
      console.log(data);
    },
  });
  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPage(pageNumber);
  };

  const deletePost = async ({ id }) => {
    try {
      const { data } = await axios.delete(`${apiUrl}/api/post/${id}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message)
        throw new Error(error.response.data.message);
      throw new Error(error.message);
    }
  };

  const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } =
    useMutation({
      mutationFn: ({ id }) => {
        return deletePost({
          id,
        });
      },
      onSuccess: () => {
        toast.success("Post Delated");
      },
    });

  const deletePostHandler = ({ id }) => {
    mutateDeletePost({ id });
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-2xl font-semibold text-center">Manage Posts</h1>

      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className=" px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Title
                    </th>

                    <th
                      scope="col"
                      className=" px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Created at
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        Loading...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No posts found
                      </td>
                    </tr>
                  ) : (
                    data?.map((post) => (
                      <tr>
                        <td className="px-3 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="mx-auto object-cover rounded-lg w-10 aspect-square"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap text-lg lg:text-2xl">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap lg:text-xl">
                            {new Date(post.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </td>

                        <td className=" py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                          <button
                            disabled={isLoadingDeletePost}
                            type="button"
                            className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed lg:text-2xl"
                            onClick={() => {
                              deletePostHandler({
                                id: post?._id,
                              });
                            }}
                          >
                            Delete
                          </button>
                          <Link
                            to={`/admin/main/posts/manage/edit/${post?._id}`}
                            className="text-green-600 hover:text-green-900 lg:text-2xl"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Pagination
                onPageChange={handlePageChange}
                currentPage={currentPage}
                siblingCount={1}
                totalPageCount={10000}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePosts;
