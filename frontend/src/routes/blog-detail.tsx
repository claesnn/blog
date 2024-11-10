import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

export default function BlogDetail() {
  const { blog, comments } = useLoaderData();

  if (!blog) return;
  if (!comments) return;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <ul>
        <Suspense>
          <Await resolve={comments}>
            {(comments) =>
              comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))
            }
          </Await>
        </Suspense>
      </ul>
    </div>
  );
}
