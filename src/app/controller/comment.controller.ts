import { RequestHandler, Request, Response } from "express";
import { CommentModel } from "../models/comment.model";
import { Comment } from "./../models/comment.model";
import moment from "moment";
import { User } from "../models/user.model";

export class CommentController {
  addComment: RequestHandler = async (req: Request, res: Response) => {
    var { user_id, comment }: CommentModel = req.body;

    var time = moment().unix();

    Comment.create({
      user_id: user_id,

      comment: comment,
      joined_at: time,
      post_id: req.params.id,
    });
    var reso = await Comment.findAll();
    res.status(200).send({
      result: true,
    });
  };

  deleteComment: RequestHandler = async (req: Request, res: Response) => {
    var result = await Comment.destroy({
      where: {
        id: req.params.id,
        post_id: req.params.post_id,
      },
      force: true,
    });

    return res.status(200).send({
      sucess: true,
      data: result,
    });
  };

  getComments: RequestHandler = async (req: Request, res: Response) => {
    var result = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [User],
    });

    var data = result.map((comment) => {
      var endData = {
        id: comment.id,
        post_id: comment.post_id,
        user_id: comment.user_id,
        username: comment.user?.username,
        name: comment.user?.name,
        comment: comment.comment,
        joined_at: comment.joined_at,
      };
      return endData;
    });

    return res.status(200).send({
      success: true,

      data: data,
    });
  };
}
