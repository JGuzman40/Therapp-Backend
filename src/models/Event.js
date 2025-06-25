const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      eventType: {
        type: DataTypes.ENUM(
          "Seminario",
          "Taller",
          "Curso",
          "Sesión personal",
          "Sesión grupal",
          "Programa Microdosis",
          "Registro terapéutico",
          "Conferencia",
          "Clase magistral",
          "Sesión de mediación",
          "Terapia de pareja",
          "Círculo de escucha",
          "Mindfulness"
        ),
        allowNull: false,
      },
      eventName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eventImage: {
        type: DataTypes.STRING, // URL o path de la imagen
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
