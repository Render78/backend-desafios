import express from "express";
import __dirname from "./util.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor funcionando en el puerto ${PORT}`));

const socketServer = new Server(httpServer);
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname+"/public"));
app.use("/", viewsRouter);