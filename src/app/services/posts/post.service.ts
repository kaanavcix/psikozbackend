import  Post  from "../../models/post.model";
import con from "..";
import IPostService from "./base.post.service";
import { PostController } from '../../controller/posts/posts.controller';
import { Request,Response } from "express";


class PostService implements IPostService {
  
   getAllPosts(req:Request,res:Response):Promise<Post[]>{
throw new Error("Not implemented");
   }
  addPost(post: Post): void {
    throw new Error("Method not implemented.");
  }
  deletePost(post: Post): void {
    throw new Error("Method not implemented.");
  }
  editPost(post: Post): void {
    throw new Error("Method not implemented.");
  }
  getPostById(id: number): Post {
    throw new Error("Method not implemented.");
  }
  
}