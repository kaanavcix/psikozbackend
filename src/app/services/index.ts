import { Sequelize } from "sequelize-typescript";
import { User } from '../models/user.model';
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { Book } from "../models/book.model";
import { Article, CategoryArticle } from "../models/article.model";

import * as dotenv from 'dotenv';
import { Music, Podcast, LikeMusic, LikePodcast } from '../models/music.model';

dotenv.config();

export const con = new Sequelize({
  database: "psikoz",
  dialect: "mysql"
  , username: "root",
  password: "1234",
  logging: false,
  models: [User, Post, Comment, Book, Article, CategoryArticle, Music, Podcast, LikeMusic, LikePodcast]
});


/* con.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully!");
});

 */
