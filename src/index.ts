import Application  from './app/app';
import * as dotenv  from "dotenv"
dotenv.config();
const app = new Application();
new Application().startServer();

