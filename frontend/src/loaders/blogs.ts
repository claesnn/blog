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
  console.log(instance);
  return (await instance.post(`/comments/`, { blog: blogId, content: comment }))
    .data;
}

export async function checkLogin() {
  const data = await instance.get("/check-login/");
  console.log(data);
  return data;
}

export async function checkPost() {
  const data = await instance.post("/check-post/", { test: "test" });
  console.log(data);
  return data;
}

export async function getUser() {
  return (await instance.get("/user-detail/")).data;
}
