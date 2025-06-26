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
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Events",
          key: "id",
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Nombre del segmento (ej. Semana 1 - Introducción)",
      },

      topics: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Temas que se tratarán en el segmento",
      },

      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "Fecha de inicio del segmento",
      },

      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: "Fecha de fin del segmento",
      },

      files: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Archivos subidos al segmento (url, type, name, public_id)",
      },
    },
    {
      timestamps: true,
    }
  );
};
