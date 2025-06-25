const { Session } = require("../db"); // Asegúrate de que la ruta sea correcta

const createSessionService = async (data) => {
  const { eventId, name, days, time, meetingLink, message, dates } = data;

  const newSession = await Session.create({
    eventId,
    name,
    days,
    time,
    meetingLink,
    message,
    dates, // Aquí ahora puedes enviar un array de fechas
  });

  return newSession;
};

const getAllSessionsService = async () => {
  return await Session.findAll();
};

const getSessionByIdService = async (id) => {
  const session = await Session.findByPk(id);
  if (!session) throw new Error("Sesión no encontrada");
  return session;
};

const updateSessionService = async (id, data) => {
  const session = await Session.findByPk(id);
  if (!session) throw new Error("Sesión no encontrada");

  // Actualiza los campos de la sesión
  session.eventId = data.eventId || session.eventId;
  session.name = data.name || session.name;
  session.days = data.days || session.days;
  session.dates = data.dates || session.dates;
  session.time = data.time || session.time;
  session.meetingLink = data.meetingLink || session.meetingLink;
  session.message = data.message || session.message;

  await session.save();
  return session;
};

const deleteSessionService = async (id) => {
  const session = await Session.findByPk(id);
  if (!session) throw new Error("Sesión no encontrada");

  await session.destroy(); // Elimina la sesión
};

module.exports = {
  createSessionService,
  getAllSessionsService,
  getSessionByIdService,
  updateSessionService,
  deleteSessionService,
};
