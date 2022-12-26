import { LikeMusic } from './../models/music.model';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Book } from '../models/book.model';
import moment from "moment";
import { Article, CategoryArticle } from '../models/article.model';
import { Music, Podcast, LikePodcast } from '../models/music.model';


export class MaterialController {


  getbooks: RequestHandler = async (req: Request, res: Response) => {
    Book.findAll().then((value) => res.status(200).json({
      sucess:true,
      data: value
    }));

  }


  addbooks: RequestHandler = async (req: Request, res: Response) => {

    const { title, summary, content }: Book = req.body;
    const timestamp = moment().unix();

    if (title !== null) {
      var data = Book.create({
        title: title,
        content: content,
        summary: summary,
        image: null,
        createdAt: timestamp,

      }).then((value) => res.status(200).json({
        status: true,
        data: value,
      }));
    }
  }


  getarticles: RequestHandler = async (req: Request, res: Response) => {

    var model = await Article.findAll();

    let data = model.map(async (value) => {
      let datas = await CategoryArticle.findOne({ where: { id: value.category_id } });

      return {
        id: value.id,
        title: value.title,
        summary: value.summary,
        content: value.content,
        image: value.image,
        createdAt: value.createdAt,
        categoryName: datas?.name
      }


    });

    Promise.all(data).then((data) =>
      res.status(200).json({
        status: true,
        data: data,
      }));


  }

  getmusic: RequestHandler = async (req: Request, res: Response) => {

    let model = await Music.findAll(
      {
        include: [LikeMusic]
      });

    return res.status(200).json({
      status: true,
      data: model,
    })
  }
  getpodcast: RequestHandler = async (req: Request, res: Response) => {

    let model = await Podcast.findAll(
      {
        include: [LikePodcast]
      });

    return res.status(200).json({
      status: true,
      data: model,
    })
  }
}

