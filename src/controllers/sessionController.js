const {
  createSessionService,
  getAllSessionsService,
  getSessionByIdService,
  updateSessionService,
  deleteSessionService,
} = require("../services/sessionService");

const catchAsync = require("../utils/catchAsync");

const createSession = async (req, res) => {
  const newSession = await createSessionService(req.body);
  res
    .status(201)
    .json({ message: "Sesión creada exitosamente", session: newSession });
};

const getAllSessions = async (req, res) => {
  const sessions = await getAllSessionsService();
  res.status(200).json(sessions);
};

const getSessionById = async (req, res) => {
  const session = await getSessionByIdService(req.params.id);
  res.status(200).json(session);
};

const updateSession = async (req, res) => {
  const updatedSession = await updateSessionService(req.params.id, req.body);
  res
    .status(200)
    .json({
      message: "Sesión actualizada exitosamente",
      session: updatedSession,
    });
};

const deleteSession = async (req, res) => {
  await deleteSessionService(req.params.id);
  res.status(200).json({ message: "Sesión eliminada exitosamente" });
};

module.exports = {
  createSession: catchAsync(createSession),
  getAllSessions: catchAsync(getAllSessions),
  getSessionById: catchAsync(getSessionById),
  updateSession: catchAsync(updateSession),
  deleteSession: catchAsync(deleteSession),
};
