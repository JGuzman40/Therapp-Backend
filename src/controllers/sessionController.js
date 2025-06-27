const {
  createSessionService,
  getAllSessionsService,
  getSessionByIdService,
  getSessionsByEventIdService,
  updateSessionService,
  deleteSessionService,
} = require("../services/sessionService");

const catchAsync = require("../utils/catchAsync");

// Crear una sesión
const createSession = async (req, res) => {
  const newSession = await createSessionService(req.body);
  res.status(201).json({
    message: "Sesión creada exitosamente",
    session: newSession,
  });
};

// Obtener todas las sesiones
const getAllSessions = async (req, res) => {
  const sessions = await getAllSessionsService();
  res.status(200).json(sessions);
};

// Obtener una sesión por ID
const getSessionById = async (req, res) => {
  const session = await getSessionByIdService(req.params.id);
  res.status(200).json(session);
};

const getSessionsByEventId = async (req, res) => {
  const { eventId } = req.params;
  const sessions = await getSessionsByEventIdService(eventId);
  res.status(200).json(sessions);
};

// Actualizar una sesión
const updateSession = async (req, res) => {
  const updatedSession = await updateSessionService(req.params.id, req.body);
  res.status(200).json({
    message: "Sesión actualizada exitosamente",
    session: updatedSession,
  });
};

// Eliminar una sesión
const deleteSession = async (req, res) => {
  await deleteSessionService(req.params.id);
  res.status(200).json({ message: "Sesión eliminada exitosamente" });
};

module.exports = {
  createSession: catchAsync(createSession),
  getAllSessions: catchAsync(getAllSessions),
  getSessionById: catchAsync(getSessionById),
  getSessionsByEventId: catchAsync(getSessionsByEventId),
  updateSession: catchAsync(updateSession),
  deleteSession: catchAsync(deleteSession),
};
