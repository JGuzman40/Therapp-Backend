const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Bitacora",
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
      generalInfo: {
        type: DataTypes.JSON, // Para almacenar la información general
        allowNull: true,
      },
      intention: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dailyDose: {
        type: DataTypes.JSON, // Para almacenar dosis diarias
        allowNull: true,
      },
      elements: {
        type: DataTypes.JSON, // Para los elementos
        allowNull: true,
      },
      states: {
        type: DataTypes.JSON, // Para almacenar los estados
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
