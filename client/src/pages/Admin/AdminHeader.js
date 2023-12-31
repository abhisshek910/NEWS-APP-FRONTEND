import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { toast, Toaster } from "react-hot-toast";
import NavItem from "./NavItem";

import { useWindowSize } from "@uidotdev/usehooks";
const AdminHeader = () => {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [activeNavName, setActiveNavName] = useState("Add Post");
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  const handleLogOut = (e) => {
    e.preventDefault();
    const check = logout();
    if (check) {
      toast.success("Logout Successful");
      navigate("/admin");
    } else {
      toast.error("Logout Fail");
    }
  };

  return (
    <>
      <Toaster />
      <header className="flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
        {/* menu burger icon */}
        <div className="cursor-pointer lg:hidden">
          {isMenuActive ? (
            <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
          )}
        </div>
        {/* sidebar container */}
        {isMenuActive && (
          <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
            {/* underlay */}
            <div
              className="fixed inset-0 bg-black opacity-50 lg:hidden"
              onClick={toggleMenuHandler}
            />
            {/* sidebar */}
            <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
              <h4 className="mt-10 font-bold text-[#C7C7C7]">MAIN MENU</h4>
              {/* menu items */}
              <div className="mt-6 flex flex-col gap-y-[0.563rem]">
                <NavItem
                  title="Add Post"
                  link="/admin/main/posts/add"
                  name="Add Post"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
                <NavItem
                  title="Manage Post"
                  link="/admin/main/posts/manage"
                  name="Manage Post"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
                <button
                  className="font-semibold text-[#A5A5A5] flex items-center gap-x-2 py-2 text-lg"
                  onClick={(e) => handleLogOut(e)}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default AdminHeader;
