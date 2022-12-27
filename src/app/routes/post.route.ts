import { CommentController } from '../controller/comment.controller';
import PostController from '../controller/posts.controller';
import Router from 'express';
import { verifyDoctor, verifyToken } from '../middleware/auth.middleware';


export const postRoute = Router();

const postcontroller = new PostController();
const commentcontroller = new CommentController();

postRoute.get("/api/posts", postcontroller.allPost);

postRoute.post("/api/post", postcontroller.addPost);

postRoute.get("/api/post/:id", postcontroller.postbyId);

postRoute.delete("/api/post/:id", postcontroller.deletePost);
postRoute.put("/api/post/:id", postcontroller.updatePost);

postRoute.post("/api/post/:id/comment", verifyDoctor, commentcontroller.addComment)
postRoute.delete("/api/post/:post_id/comment/:id")
postRoute.get("/api/post/:id/comments",commentcontroller.getComments)

