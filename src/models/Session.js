// models/Session.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Session",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
      },
      sessionType: {
        type: DataTypes.ENUM("individual", "grupal"),
        allowNull: false,
        defaultValue: "grupal",
      },
      dates: {
        type: DataTypes.TEXT, // JSON.stringify([fecha1, fecha2...])
        allowNull: false,
        get() {
          const value = this.getDataValue("dates");
          return value ? JSON.parse(value) : [];
        },
        set(value) {
          this.setDataValue("dates", JSON.stringify(value));
        },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER, // en minutos
        allowNull: true,
        validate: {
          min: 1,
        },
      },
      meetingLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notify: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

    // participantId (si es individual)
      participantId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
