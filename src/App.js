import Footer from "./components/Footer";
import Header from "./components/Header";
import "./App.css";
import Homepage from "./pages/home/Homepage";
import ArticleDetailsPage from "./pages/ArticleDetails/ArticleDetailsPage";
import AdminLayout from "./pages/Admin/AdminLayout";
import ManagePosts from "./pages/Admin/ManagePosts";
import EditPost from "./pages/Admin/EditPost";
import Addpost from "./pages/Admin/Addpost";
import AdminLogin from "./pages/Admin/AdminLogin";
import { AuthProvider } from "./pages/Admin/AuthContext";
import AdminGuard from "./pages/Admin/AdminGuard";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
function App() {
  const shouldRenderFooter = () => {
    // Check the current route to determine whether to render the footer
    const currentPath = window.location.pathname;
    return !currentPath.startsWith("/admin/main/posts/manage");
  };
  return (
    <>
      <HelmetProvider>
        <AuthProvider>
          <Header />
          <Analytics />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/news/:id" element={<ArticleDetailsPage />}></Route>
            <Route path="/admin" element={<AdminLogin />}></Route>
            <Route path="/admin/main" element={<AdminLayout />}>
              <Route path="posts/manage" element={<ManagePosts />} />
              <Route
                path="posts/manage/edit/:id"
                element={<EditPost />}
              ></Route>
              <Route path="posts/add" element={<Addpost />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
        {shouldRenderFooter() && <Footer />}
      </HelmetProvider>
    </>
  );
}

export default App;
