const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcryptjs");

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Credenciales inválidas");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Credenciales inválidas");

  // Generar token JWT con información del usuario
  const token = jwt.sign(
    { id: user.id, role: user.role }, // Información que queremos almacenar en el token
    process.env.JWT_SECRET, // Clave secreta
    { expiresIn: "1h" } // Expiración del token
  );

  return { user, token }; // Devolvemos el usuario y el token
};

module.exports = {
  loginService,
};
