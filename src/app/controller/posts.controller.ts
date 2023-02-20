import { Request, Response, RequestHandler, NextFunction } from "express";
import { Post, PostInput, PostLike } from '../models/post.model';
import { Comment } from "../models/comment.model";
import { User, TokenModel } from "../models/user.model";
import { Column } from "sequelize-typescript";
import { raw } from "body-parser";
import { v4 as uuidv4 } from "uuid";
import { Status } from "../models/status.model";
import moment from "moment";
import { rejects } from "assert";
import { ErrorMessage, MessageReturn, SucessMessage } from "../helpers/res.variable";

export default class PostController {
  allPost: RequestHandler = async (req: Request, res: Response) =>
    Post.findAll({ include: [User, Comment] }).then(async (value) => {
      var result = value.map(async (post) => {
        var statusName = await Status.findOne({
          where: {
            id: post.status,
          },
        });

        var timeFromNow = moment.unix(post.timestamp).fromNow();

        return {
          id: post.id,
          content: post.content,
          status: statusName?.name,
          category: post.category,
          username: post.user?.username,
          age: post.user?.age,
          comment: post.comments,
          gender: post.user?.gender,
          name: post.user?.name,
          avatar: post.user?.avatar,
          time: timeFromNow,
        };
      });

      var model = await Promise.all(result);
      res.status(200).json({
        data: model,
        success: true,
      });
    });

  addPostWithPhoto: RequestHandler = async (req: Request, res: Response) => {
    const { user_id, content }: PostInput = req.body;

    var result = await User.findAll({ where: { id: user_id } });

    if (result.length !== 0) {
      Post.create({
        user_id: user_id,
        content: content,
        photoUrl: req.file?.path,
      });

      return res.status(200).send({ success: true });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  };

  addPost: RequestHandler = async (req: Request, res: Response) => {
    const { user_id, content }: PostInput = req.body;

    var result = await User.findAll({ where: { id: user_id } });

    if (result.length !== 0) {
      await Post.create({
        user_id: user_id,
        content: content,
      }).then((val) =>
        res.status(200).json({
          success: true,
        })
      );
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  };
  deletePost: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let data = await Post.findOne({ where: { postid: req.params.id } });
    await data?.destroy().then((val) =>
      res.status(200).json({
        success: true,
      })
    );
    if (data == null) {
      return res.status(404).json({
        success: false,
      });
    }
  };
  updatePost: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.body != null)
      await Post.findOne({ where: { postid: req.params.id } }).then((value) => {
        value!.content = req.body;
        value!.save();
        return res.status(200).json({
          success: true,
        });
      });
  };
  postbyId: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    Post.findOne({ where: { id: req.params.id } }).then((value) => {
      if (value != null) {
        res.json({
          success: true,
          data: value,
        });
      }
    });
  };

  postByToken: RequestHandler = async (req: Request, res: Response) => {
    const { token }: TokenModel = req.body;

    let user_id_finding = await User.findOne({ where: { token: token } });

    if (user_id_finding === null) {
      return ErrorMessage(res, "Kullanıcı bulunamadı");
    }

    let model_data = await Post.findAll({
      where: { user_id: user_id_finding.id },
      include: [User,Comment]
    });

    let data = model_data.map(async (post) => {
      var statusName = await Status.findOne({
        where: {
          id: Number(post.status),
        },
      });

      var likePost = await PostLike.findAll({where:{post_id: Number(post.id)}});

      console.log(likePost);

      var timeFromNow = moment.unix(post.timestamp).fromNow();

      return {
        id: post.id,
        content: post.content,
        status: statusName?.name,
        category: post.category,
        username: post.user?.username,
        age: post.user?.age,
        comment: post.comments,
        gender: post.user?.gender,
        name: post.user?.name,
        avatar: post.user?.avatar,
        time: timeFromNow,
        likes:likePost
      };
    });

    var end_data = await Promise.all(data);


    if (end_data.length===0) {
      MessageReturn(res,"Hiç gönderiniz bulunmamaktadır");

      
    }
    SucessMessage(res,end_data);
  };
  postDoctorControl: RequestHandler = async (req: Request, res: Response) => {
    var model = await Post.findAll({
      where: {
        status: "1",
      },
      include: [User, Comment],
    });

    let result = await model.map(async (post) => {
      var statusName = await Status.findOne({
        where: {
          id: post.id,
        },
      });

      let timeForNow = moment.unix(post.timestamp).fromNow();

      return {
        id: post.id,
        content: post.content,
        status: statusName?.name,
        category: post.category,
        username: post.user?.username,
        age: post.user?.age,
        comment: post.comments,
        gender: post.user?.gender,
        name: post.user?.name,
        avatar: post.user?.avatar,
        time: timeForNow,
      };
    });

    var postReturn = await Promise.all(result);

    return res.status(200).send({
      status: postReturn,
      success: true,
    });
  };
  postUserControl: RequestHandler = async (req: Request, res: Response) => {
    var model = await Post.findAll({
      where: {
        status: "5",
      },
      include: [User, Comment],
    });

    let result = await model.map(async (post) => {
      var statusName = await Status.findOne({
        where: {
          id: post.id,
        },
      });

      let timeForNow = moment.unix(post.timestamp).fromNow();

      return {
        id: post.id,
        content: post.content,
        status: statusName?.name,
        category: post.category,
        username: post.user?.username,
        age: post.user?.age,
        comment: post.comments,
        gender: post.user?.gender,
        name: post.user?.name,
        avatar: post.user?.avatar,
        time: timeForNow,
      };
    });

    var postReturn = await Promise.all(result);

    return res.status(200).send({
      status: postReturn,
      success: true,
    });
  };
}
