const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Event",
    {
      id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,
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
        type: DataTypes.STRING,
        allowNull: true,
        comment: "URL de imagen representativa del evento",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Descripción del evento",
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Fecha de inicio del evento",
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        comment: "Fecha de finalización del evento",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        comment: "Determina si el evento está activo",
      },
    },
    {
      timestamps: true,
    }
  );
};
