const { loginService } = require("../services/loginService");
const catchAsync = require("../utils/catchAsync");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginService({ email, password }); // Recibes el token del servicio

  // Redirigir según el rol
  let redirectUrl = "";
  if (user.role === "administrador") {
    redirectUrl = "/dashboard-administrador";
  } else if (user.role === "facilitador") {
    redirectUrl = "/dashboard-facilitador";
  } else if (user.role === "participante") {
    redirectUrl = "/dashboard-participante";
  }

  // Devolver el token, el usuario y la redirección en la respuesta
  return res.status(200).json({
    message: "Inicio de sesión exitoso",
    redirect: redirectUrl,
    user,
    token, // Aquí enviamos el token al frontend
  });
};

module.exports = {
  loginController: catchAsync(loginController),
};
