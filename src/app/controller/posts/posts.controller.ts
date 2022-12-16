import { Request, Response,RequestHandler,NextFunction } from "express";
import Post from "../../models/post.model";

export class PostController {

  private posts: Post[];
  constructor() {

    this.posts = [
      new Post(
        "1",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem"
        , "sdmlasklfmnsdfsdanflsdkafnsdafnsdka"

      ), new Post(
        "2",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem"
        , "sdmlasklfmnsdfsdanflsdkafnsdafnsdka"
      ),
    ];
  }
  allPost:RequestHandler =  async (req: Request, res: Response,next:NextFunction) => {
  
      return res.status(200).json({
        data: this.posts,
        sucess:true,
      })

   

  }
  addPost:RequestHandler = async(req: Request, res: Response, next:NextFunction) => {

  }
  deletePost:RequestHandler = async(req: Request, res: Response, next:NextFunction)=>{

  }
  updatePost:RequestHandler = async(req: Request, res: Response, next:NextFunction)=>{

  }
  postbyId:RequestHandler = async(req:Request,res:Response,next:NextFunction)=>{

  }
}


