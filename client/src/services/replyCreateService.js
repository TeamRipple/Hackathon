import http from "./httpService";
import { repliesEndPoint } from "../config.json";
//function call to backend for Create Reply
export function createreply(commentbody, id) {
  return http.post(repliesEndPoint + "/create/" + id, {
    comment: commentbody.comment,
  });
}
