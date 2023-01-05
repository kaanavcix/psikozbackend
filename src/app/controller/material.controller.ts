import { LikeMusic } from './../models/music.model';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Book, BookVariables } from '../models/book.model';
import moment from "moment";
import { Article, CategoryArticle } from '../models/article.model';
import { Music, Podcast, LikePodcast } from '../models/music.model';


export class MaterialController {



  uploadMusic: RequestHandler = async (req: Request, res: Response,) => {

    var { title, content }: Podcast = req.body;

    var control = await Podcast.findAll({
      where: {
        podcast_path: req.file?.path
      }
    })

    if (control.length !== 0) {
      return res.status(201).send({
        success: false,
        message: 'Podcast already exists'
      })
    }

    await Podcast.create({
      title: title,
      content: content,
      podcast_path: req.file?.path,
      created_at: moment().unix()

    }).then((pds) =>
      res.status(200).send({
        success: true,
        data: pds
      })).catch((err) => {
        res.status(400).send({
          success: false,
        })
      })

  }

  getbooks: RequestHandler = async (req: Request, res: Response) => {
    Book.findAll().then((value) => res.status(200).json({
      sucess: true,
      data: value
    }));

  }


  addbooks: RequestHandler = async (req: Request, res: Response) => {

    const { title, summary, content, writer, variable_id }: Book = req.body;
    const timestamp = moment().unix();

    if (title !== null|| summary !== null|| content !== null) {
      var data = Book.create({
        title: title,
        content: content,
        summary: summary,
        writer: writer,
        variable_id: Number(variable_id),
        image: req.file?.path,
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


  addArticle: RequestHandler = async (req: Request, res: Response) => {

    let { title, content, category_id } = req.body;

    let time = moment().unix();


    let model = await Article.create({
      title: title,
      content: content,
      category_id: category_id,
      image_path: req.file?.path,
      created_at: time
    });

    if (model !== null) {
      res.send({
        success: true
      })
    }

  };


  getMaterial: RequestHandler = async (req: Request, res: Response) => {
    const bookModel = await Book.findAll();

    let result = await bookModel.map(async (book) => {


      let variableName = await BookVariables.findOne({
        where: {
          id: book.variable_id
        }
      })
      let timeFromDb = book.created_at;
      let lastData = await moment.unix(timeFromDb).fromNow()

      let data = {
        id: book.id,
        title: book.title,
        summary: book.summary,
        content: book.content,
        image: book.image,
        createdAt: lastData,
        writer: book.writer,
        name: variableName?.variable_name,
        likes: book.likes



      }
      return data;
    });


    const articleModel = await Article.findAll();

    let result2 = await articleModel.map(async article => {

      var categoryName = await CategoryArticle.findOne({
        where: {
          id: article.category_id
        }



      });

      let timeFromDb = article.created_at;
      let lastData = await moment.unix(timeFromDb).fromNow()
      //  console.log('lastData :>> ', lastData);


      let data = {
        id: article.id,
        title: article.title,
        summary: "",
        content: article.content,
        image: article.image,
        createdAt: lastData,
        writer: article.writer,
        name: categoryName?.name,
        likes: article.likes




      }
      return data;

    });




    let notPromise1 = await Promise.all(result);
    let notPromise2 = await Promise.all(result2);

    let lastNotPromise = [...notPromise1, ...notPromise2];

    return res.status(200).send({

      sucess: true,
      data: lastNotPromise,
    });


  };

  getFavorites: RequestHandler = async (req: Request, res: Response) => {

  };
}

