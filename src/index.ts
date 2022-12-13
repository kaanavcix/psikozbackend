import * as dotenv from "dotenv";
import { Application } from './app/app';
dotenv.config();


new Application().startServer();

