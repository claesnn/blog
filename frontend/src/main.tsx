import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./routes/about.tsx";
import Blog from "./routes/blog.tsx";
import {
  checkLogin,
  checkPost,
  getUser,
  loadBlog,
  loadBlogs,
  loadComments,
  postComment,
} from "./loaders/blogs.ts";
import BlogDetail from "./routes/blog-detail.tsx";
import Login from "./routes/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: getUser,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/blog",
    element: <Blog />,
    loader: loadBlogs,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetail />,
    loader: async ({ params }) => {
      const blog = await loadBlog(params.id!);
      const comments = loadComments(params.id!);
      return { blog, comments };
    },
    action: async ({ params, request }) => {
      const formData = await request.formData();
      await checkLogin();
      await checkPost();
      return await postComment(params.id!, formData.get("comment") as string);
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
