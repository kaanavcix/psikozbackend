import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { Book, BookVariables, BookLike } from "../models/book.model";
import {
  Article,
  CategoryArticle,
  ArticleLike,
  PsikoEduction,
} from "../models/article.model";

import * as dotenv from "dotenv";
import { Music, Podcast, LikeMusic, LikePodcast } from "../models/music.model";
import { Status } from "../models/status.model";
import { Appointment, AppointmentIsNeed } from '../models/appointment.model';

dotenv.config();

export const con = new Sequelize({
  dialect: "mysql",
  database: "psikoz",
  username: "root",
  password: "1234",
  logging: false,
  models: [
    AppointmentIsNeed,
    PsikoEduction,
    Status,
    Appointment,
    ArticleLike,
    BookLike,
    BookVariables,
    User,
    Post,
    Comment,
    Book,
    Article,
    CategoryArticle,
    Music,
    Podcast,
    LikeMusic,
    LikePodcast,
  ],
});
