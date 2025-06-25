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
          len: [2, 25], // El nombre debe tener entre 2 y 25 caracteres
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validar que sea un formato de email
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      eventId: {
        // Campo para asociar el usuario con un evento
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Events", // Asegúrate de que se llame 'Events'
          key: "id",
        },
      },
    },
    {
      timestamps: true,
    }
  );
};
