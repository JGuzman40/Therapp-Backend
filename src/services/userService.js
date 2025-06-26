const bcrypt = require("bcryptjs");
const { User } = require("../db");
const {
  sendAdminWelcomeEmail,
  sendFacilitadorWelcomeEmail,
  sendParticipantWelcomeEmail,
} = require("./emailService");

const createUserService = async (data) => {
  const { name, email, password, role, imageUrl, adminId, eventId } = data;

  // Verifica si ya existe el usuario
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("El usuario ya existe");

  // Hashea la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crea el usuario
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    imageUrl,
    adminId,
    eventId,
  });

  // Enviar correo de bienvenida según el rol
  try {
    const emailData = { name, email, password };
    if (role === "administrador") {
      await sendAdminWelcomeEmail(emailData);
    } else if (role === "facilitador") {
      await sendFacilitadorWelcomeEmail(emailData);
    } else if (role === "participante") {
      await sendParticipantWelcomeEmail(emailData);
    }
  } catch (err) {
    console.error("Error al enviar correo de bienvenida:", err.message);
  }

  return newUser;
};

const getAllUsersService = async () => {
  return await User.findAll({
    where: { isActive: true },
    attributes: { exclude: ["password"] },
  });
};

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) throw new Error("Usuario no encontrado");
  return user;
};
const getFacilitadoresByAdminService = async (adminId) => {
  const facilitadores = await User.findAll({
    where: {
      role: "facilitador",
      adminId,
      isActive: true,
    },
    attributes: { exclude: ["password"] },
  });

  return facilitadores;
};

const getParticipantesByEventService = async (eventId) => {
  const participantes = await User.findAll({
    where: {
      role: "participante",
      eventId,
      isActive: true,
    },
    attributes: { exclude: ["password"] },
  });

  return participantes;
};


const updateUserService = async (id, data) => {
  const { name, password, email, imageUrl, isActive, role } = data;

  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.imageUrl = imageUrl || user.imageUrl;
  user.isActive = isActive !== undefined ? isActive : user.isActive;
  user.role = role || user.role;

  await user.save();
  return user;
};

const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");
  user.isActive = false;
  await user.save();
};

module.exports = {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  getFacilitadoresByAdminService,
  getParticipantesByEventService,
  updateUserService,
  deleteUserService,
};
