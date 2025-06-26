const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

// Cargar los modelos
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

// Capitalización
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Modelos
const { User, Event, Segment, Session } =
  sequelize.models;

// Definir las relaciones

// Un administrador tiene muchos facilitadores
User.hasMany(User, { as: "Facilitadores", foreignKey: "adminId" });
User.belongsTo(User, { as: "Admin", foreignKey: "adminId" });

// Un facilitador tiene muchos eventos
User.hasMany(Event, { as: "Eventos", foreignKey: "facilitadorId" });
Event.belongsTo(User, { as: "Facilitador", foreignKey: "facilitadorId" });

// Un evento tiene muchas sesiones
Event.hasMany(Session, { as: "Sesiones", foreignKey: "eventId" });
Session.belongsTo(Event, { as: "Evento", foreignKey: "eventId" });

// Un evento tiene muchos segmentos
Event.hasMany(Segment, { as: "Segmentos", foreignKey: "eventId" });
Segment.belongsTo(Event, { as: "Evento", foreignKey: "eventId" });

// Un evento tiene muchos participantes
Event.hasMany(User, { as: "Participantes", foreignKey: "eventId" });
User.belongsTo(Event, { as: "Evento", foreignKey: "eventId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
