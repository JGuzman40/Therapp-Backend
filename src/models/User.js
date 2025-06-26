const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      role: {
        type: DataTypes.ENUM("administrador", "facilitador", "participante"),
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 25],
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Contraseña hasheada",
      },

      imageUrl: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      adminId: {
        type: DataTypes.UUID,
        allowNull: true,
      },

      eventId: {
  type: DataTypes.UUID,
  allowNull: true,
  references: {
    model: "Events",
    key: "id",
  },
}
    },
    {
      timestamps: true,
    }
  );
};