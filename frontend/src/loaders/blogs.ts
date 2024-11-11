import instance from "./axios";

export async function loadBlogs() {
  return (await instance.get("/blogs")).data;
}

export async function loadBlog(id: string) {
  return (await instance.get(`/blogs/${id}`)).data;
}

export async function loadComments(blogId: string) {
  return (await instance.get(`/blogs/${blogId}/comments`)).data;
}

export async function postComment(blogId: string, comment: string) {
  return (
    await instance.post(`/comments/`, { blog_id: blogId, comment: comment })
  ).data;
}
