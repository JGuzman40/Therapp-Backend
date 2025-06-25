const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/index.js");

const server = express();

// Middlewares básicos
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());

server.use("/therapp", router);

server.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Manejo básico de errores
server.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = server;
