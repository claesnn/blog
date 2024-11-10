import { Link, useLoaderData } from "react-router-dom";

export default function Blog() {
  const blogs = useLoaderData();

  if (!blogs) return;

  return (
    <div>
      <h1>Blog</h1>
      <Link to="/">Go back to the homepage</Link>

      <ul>
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            {blog.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
