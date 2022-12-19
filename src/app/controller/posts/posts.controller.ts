import { Request, Response, RequestHandler, NextFunction } from "express";
import { Post} from "../../models/post.model";
import{Comment} from "../../models/comment.model";
import { UserModel } from "../../models/patient.model";
import { Column } from 'sequelize-typescript';
import { raw } from "body-parser";

export default class PostController {

  allPost: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>
    Post.findAll({ include: [UserModel,Comment] }).then((val) => res.status(200).json({
      data: val,
      success: true,
    }));




  addPost: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>
    Post.create(req.body).then((val) => res.status(200).json());
  deletePost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
   let data = await Post.findOne({where:{postid:req.params.id}});
   await (data)?.destroy().then((val) => res.status(200));
   if(data==null){
    return res.status(404).json({
      success: false,});
   }

  }
   updatePost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
if(req.body!=null)
    await Post.findOne({where:{postid:req.params.id}}).then((value)=>{
      value!.content = req.body;
      value!.save();
      return res.status(200).json({
        success: true,
      });
      })
    
    

  }
  postbyId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

    Post.findOne({ where: { id: req.params.id } }).then((value) => {

      if (value != null) {
        res.json({
          success: true,
          data:value,

        });

      }
    });

  }
}
