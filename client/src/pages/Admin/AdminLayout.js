import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useAuth } from "./AuthContext";
import { useContext } from "react";
const AdminLayout = () => {
  const { user, login } = useAuth();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  console.log(user);
  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-col h-screen lg:flex-row">
          <AdminHeader />
          <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      ) : (
        <div>Invalid Acess</div>
      )}
    </>
  );
};

export default AdminLayout;
