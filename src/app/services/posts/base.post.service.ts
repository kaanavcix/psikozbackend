import Post from "../../models/post.model";
import { Request,Response } from "express";
 interface IPostService {

  getAllPosts(req:Request,res:Response): Promise<Post[]>;
  addPost(post: Post): void;
  deletePost(post: Post): void;
  editPost(post: Post): void;
  getPostById(id: number): Post;


}


export default IPostService;