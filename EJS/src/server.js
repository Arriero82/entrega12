const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const Products = require("../../container/Container");
const products = new Products("../database/file.json");
const Messages = require("../../mess-container/messContainer");
const messages = new Messages("../mess-db/messages.json");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.status(200).render("pages/index");
});

const PORT = 8082;

const server = httpServer.listen(PORT, () => {
  console.log(`listening in port ${server.address().port}`);
});

io.on("connection", (cliente) => {
  console.log(`cliente ${cliente.id} conectado`);
  const mensajes = messages.getAll();
  const productos = products.getAll();

  cliente.emit("productos-server", productos);

  cliente.on("new-product", (producto) => {
    products.save(producto);
    const productos = products.getAll();

    io.sockets.emit("productos-server", productos);
  });

  cliente.emit("mensajes-server", mensajes);

  cliente.on("new-message", (mensaje) => {
    messages.save(mensaje);
    const mensajes = messages.getAll();
    io.sockets.emit("mensajes-server", mensajes);
  });
});
