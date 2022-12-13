import http from 'http';
import helmet from 'helmet';
import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser"
import rateLimit from "express-rate-limit";
import route from "./routes/route"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Yavaş la gardaş server çökertcen'
});


export class Application {

  private _server: Express;
  constructor() {
    this._server = express();
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
    this._server.use(route);




  }

  public startServer():void{
  
    const host:string = this._server.get("host");
    const port:number = this._server.get("port");
    this._server.listen(port,host,()=>{
      console.log(`Server is running on port ${port}`);
    });
    

  }
}