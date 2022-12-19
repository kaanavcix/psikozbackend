import helmet from "helmet";
import cors from "cors";
import express, { Express, Router } from "express";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import * as dotenv from "dotenv";
import { userRoute } from "./routes/user/user.router";
import baseRoute from "./routes/route";
import { con } from "./services";

dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Yavaş la gardaş server çökertcen"
});

export default class Application {
    private _server: Express;
    private _router: Router;

    constructor() {
        this._server = express();
        this._router = Router();
        this._server.set("port", process.env.PORT);
        this._server.set("host", process.env.HOST);
        this._server.use(bodyParser.json());
        this._server.use(cors({
            origin: " ",
            credentials: true,
            methods: "GET,PUT,POST,DELETE"
        }));
        this._server.use(helmet());
        this._server.use(limiter);
        this._server.use(express.urlencoded({ extended: true }));
        this._server.use(baseRoute);
        this._server.use(userRoute);
        this._server.use((
            err: Error,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            res.status(500).json({ message: err.message });
        });
    }

    public startServer(): void {
        const host: string = this._server.get("host");
        const port: number = this._server.get("port");

        con.sync().then(() => {
            console.log("Database successfully connected");
        }).catch((err: any) => {
            console.log("Error", err);
        });

        this._server.listen(port, host, () => {
            console.log(`Server is running on port *:${process.env.PORT}`);
        });
    }
}

