import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import express, { Express, Request, Response, NextFunction, Router } from 'express';
import bodyParser from "body-parser"
import rateLimit from "express-rate-limit";


import { userRoute } from './routes/user.router';
import { baseRoute } from './routes/base.route';
import { materialRoute } from './routes/material.route';

import { con } from './services';
import { postRoute } from './routes/post.route';
import * as dotenv from 'dotenv';

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Yavaş la gardaş server çökertcen'
});


export default class Application {

  private _server: Express;
  private _router: Router;
  constructor() {
    this._server = express();
     this._router =Router();
    this._server.set('port', process.env.PORT || 8080);
    this._server.set("host", process.env.HOST || "localhost");
    this._server.use(bodyParser.json());
    this._server.use(cors({
      origin: '*', // default but ı will change
      credentials: true,
      methods: 'GET,PUT,POST,DELETE'
    }));
    this._server.use(helmet());
    this._server.use(limiter);
    this._server.use(express.urlencoded({ extended:true }));
    this._server.use(baseRoute);
  this._server.use(userRoute);
  this._server.use(postRoute);
  this._server.use(materialRoute);

  this._server.use((
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  });
   



  }

  public startServer():void{
  
    const host:string = this._server.get("host");
    const port:number = this._server.get("port");
    con
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err:any) => {
    console.log("Error", err);
  });
    this._server.listen(port,host,()=>{
      console.log(`Server is running on port ${port}`);
    });
    

  }
}

