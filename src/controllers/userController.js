const {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  getFacilitadoresByAdminService,
  getParticipantesByEventService,
  updateUserService,
  deleteUserService,
} = require("../services/userService");

const catchAsync = require("../utils/catchAsync");

const createUser = async (req, res) => {
  const newUser = await createUserService(req.body);
  res.status(201).json({
    message: "Usuario creado exitosamente",
    user: newUser,
  });
};

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).json({
    message: "Lista de usuarios activos",
    count: users.length,
    users,
  });
};

const getUserById = async (req, res) => {
  const user = await getUserByIdService(req.params.id);
  res.status(200).json({
    message: "Usuario encontrado",
    user,
  });
};
const getFacilitadoresByAdmin = async (req, res) => {
  const facilitadores = await getFacilitadoresByAdminService(req.params.adminId);
  res.status(200).json(facilitadores);
};

const getParticipantesByEvent = async (req, res) => {
  const participantes = await getParticipantesByEventService(req.params.eventId);
  res.status(200).json(participantes);
};

const updateUser = async (req, res) => {
  const updatedUser = await updateUserService(req.params.id, req.body);
  res.status(200).json({
    message: "Usuario actualizado exitosamente",
    user: updatedUser,
  });
};

const deleteUser = async (req, res) => {
  await deleteUserService(req.params.id);
  res.status(200).json({
    message: "Usuario desactivado exitosamente",
  });
};

module.exports = {
  createUser: catchAsync(createUser),
  getAllUsers: catchAsync(getAllUsers),
  getUserById: catchAsync(getUserById),
  getFacilitadoresByAdmin: catchAsync(getFacilitadoresByAdmin),
  getParticipantesByEvent: catchAsync(getParticipantesByEvent),
  updateUser: catchAsync(updateUser),
  deleteUser: catchAsync(deleteUser),
};
