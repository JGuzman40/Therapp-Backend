const bcrypt = require("bcryptjs");
const { User } = require("../db");

const createUserService = async (data) => {
  const { name, email, password, role, imageUrl } = data;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("El usuario ya existe");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    imageUrl,
  });

  return newUser;
};

const getAllUsersService = async () => {
  return await User.findAll();
};

const getUserByIdService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("Usuario no encontrado");
  return user;
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
  updateUserService,
  deleteUserService,
};
