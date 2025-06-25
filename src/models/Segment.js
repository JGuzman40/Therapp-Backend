const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Segment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      topics: {
        type: DataTypes.TEXT, // Podría ser una lista de temas
        allowNull: true,
      },
      files: {
        type: DataTypes.JSON, // Para almacenar rutas a archivos (PDF, MP4, JPG, etc.)
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
