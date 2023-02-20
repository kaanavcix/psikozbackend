import { CommentController } from "../controller/comment.controller";
import { verifyDoctor } from "../middleware/auth.middleware";
import PostController from "../controller/posts.controller";
import Router from "express";

export const postRoute = Router();

const postcontroller = new PostController();
const commentcontroller = new CommentController();

// TODO:GET
postRoute.get("/api/posts", postcontroller.allPost);
postRoute.get("/api/post/:id", postcontroller.postbyId);

// TODO:POST
postRoute.post("/api/post", postcontroller.addPost);
postRoute.post("/api/post/:id/comment", verifyDoctor, commentcontroller.addComment)
postRoute.post("/api/myposts",postcontroller.postByToken);

// TODO:DELETE
postRoute.delete("/api/post/:id", postcontroller.deletePost);
postRoute.delete("/api/post/:post_id/comment/:id")

// TODO:PUT
postRoute.put("/api/post/:id", postcontroller.updatePost);

postRoute.post("/api/post/:id/comment", verifyDoctor, commentcontroller.addComment)
postRoute.delete("/api/post/:post_id/comment/:id")