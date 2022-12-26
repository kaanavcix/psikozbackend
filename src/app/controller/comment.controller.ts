import { RequestHandler, Request, Response } from 'express';
import { CommentModel } from '../models/comment.model';
import { Comment } from "./../models/comment.model";
import moment from 'moment';


export class CommentController {

  addComment: RequestHandler = async (req: Request, res: Response) => {


    var data: CommentModel = req.body;

    var time = moment().unix();

    Comment.create({
      user_id: data.user_id,

      comment: data.comment,
      joined_at: time,
      post_id: req.params.id,

    });
    var reso = await Comment.findAll();
    res.status(201).json(reso);
  };

  deleteComment: RequestHandler = async (req: Request, res: Response) => {

    var result = await Comment.destroy(
      {
        where: {
          id: req.params.id,
          post_id: req.params.post_id,

        }
        , force: true,

      });

    return res.status(200).send({
      sucess: true,
      data: result,

    })
  }
}