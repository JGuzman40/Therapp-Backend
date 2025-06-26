const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Session",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    eventId: {
  type: DataTypes.UUID,
  references: {
    model: "Events",
    key: "id",
  },
},
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      days: {
        type: DataTypes.STRING, // Para los días, si es necesario
        allowNull: true,
      },
      dates: {
        type: DataTypes.TEXT, // Almacenar como texto
        allowNull: true,
        get() {
          const value = this.getDataValue("dates");
          return value ? JSON.parse(value) : []; // Convertir de JSON a array
        },
        set(value) {
          this.setDataValue("dates", JSON.stringify(value)); // Convertir de array a JSON
        },
      },
      time: {
        type: DataTypes.TIME, // Formato de hora HH:MM:SS
        allowNull: false,
      },
      meetingLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
