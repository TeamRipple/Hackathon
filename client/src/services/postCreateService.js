import http from "./httpService";

//function call to backend for create Post
export function createpost(postbody, user) {
  return http.post('http://localhost:4000/posts/create', {
    title: postbody.title,
    description: postbody.description,
    tags: postbody.tags
  });
}
