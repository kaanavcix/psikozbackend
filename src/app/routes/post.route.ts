import PostController from '../controller/posts/posts.controller';
import { Post } from '../models/post.model';
import Router from 'express';



export const postRoute = Router();

const  postcontroller = new PostController();

postRoute.get("/posts",postcontroller.allPost);

postRoute.post("/post",postcontroller.addPost);

postRoute.get("/post/:id",postcontroller.postbyId);

postRoute.delete("/post/:id",postcontroller.deletePost);
postRoute.put("/post/:id",postcontroller.updatePost);