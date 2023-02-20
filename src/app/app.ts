import cors from "cors";
import express, { Express, Router } from "express";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import { userRoute } from "./routes/user.router";
import { baseRoute } from "./routes/base.route";
import { materialRoute } from "./routes/material.route";
import { con, dbRsd } from "./services";
import { postRoute } from "./routes/post.route";
import * as dotenv from "dotenv";
import { createServer, Server as HTTPServer } from "http";
import { onboardingRoute } from "./routes/onboarding.route";
import WebSocket from "./services/websocket";
import socketIO,{Server as SocketIOServer} from "socket.io";
import { appointmentRouter } from './routes/appointment.route';


dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: "Yavaş la gardaş server çökertcen",
});



const websocket: WebSocket = new WebSocket(); // socket kodları buraya aktarılacak
class Application {
  private readonly _server: Express;
  private _router: Router;
  private _backendServer;
  private _io;

  constructor() {
    this._server = express();
    this._backendServer = createServer(this._server);
    this._io= require('socket.io')(this._backendServer);
    this._router = Router();
    this._server.set("port", process.env.PORT || 8081);
    this._server.use(bodyParser.json());
    this._server.use(
      cors({
        origin: "*",
        methods: "GET,PUT,POST,DELETE",
      })
    );

    this._server.use(limiter);
    this._server.use(express.urlencoded({ extended: true }));
    this._server.use(baseRoute);
    this._server.use(userRoute);
    this._server.use(postRoute);
    this._server.use(appointmentRouter);
    this._server.use(materialRoute);
    this._server.use(onboardingRoute);
    this._server.use(express.static("uploads"));
    this._server.use(
      (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) =>
        res.status(500).json({
          message: err.message,
        })
    );
  }

  startServer():void {
    const port: number = this._server.get("port");
    dbRsd
      .sync()
      .then(() => {
        console.log("Database successfully connected");
      })
      .catch((err: any) => {
        console.log("Error", err);
      });

    this._backendServer.listen(port, () => {
      console.log(`Server is running on port *:${port}`);
    });
    
    this._io.on("connection",()=>{

      console.log("Connection establishe");
    })
  }
}


export default Application;

//!!!1!!!!! mete kodları start server içine yazalım diğer
