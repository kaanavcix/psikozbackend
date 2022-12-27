import { Request, Response, RequestHandler, NextFunction } from "express";
import { Post, PostInput } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { User } from "../models/user.model";
import { Column } from 'sequelize-typescript';
import { raw } from "body-parser";
import { v4 as uuidv4 } from 'uuid';

export default class PostController {

  allPost: RequestHandler = async (req: Request, res: Response, next: NextFunction) =>
    Post.findAll({ include: [User, Comment], where: { status: "1" } }).then((val) => {

      var result = val.map((post) => {



        var data = {
          id: post.id,
          content: post.content,
          status: post.status,
          category: post.category,
          username: post.user?.username,
          age: post.user?.age,
          comment: post.comments,
          gender: post.user?.gender,
          name: post.user?.name,
          avatar: post.user?.avatar,




        }
        return data;
      });

      res.status(200).json({
        data: result,
        success: true,
      })
    });

  //status ile ilgili enum yapısı oluştur




  addPost: RequestHandler = async (req: Request, res: Response,) => {

    const { user_id, content }: PostInput = req.body;

    var result = await User.findAll({ where: { id: user_id } });
 
    if (result.length!==0) {
    await  Post.create({
        user_id: user_id,
        content:content,
      }).then((val) => res.status(200).json({
        "success": true,

      }));
    }

    if (result.length===0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });


    }
  }
  deletePost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let data = await Post.findOne({ where: { postid: req.params.id } });
    await (data)?.destroy().then((val) => res.status(200).json({
      "success": true,

    }));
    if (data == null) {
      return res.status(404).json({
        success: false,
      });
    }

  }
  updatePost: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body != null)
      await Post.findOne({ where: { postid: req.params.id } }).then((value) => {
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
          data: value,

        });

      }
    });

  }
}
