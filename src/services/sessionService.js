const { Session, Event, User } = require("../db");
const sendSessionNotificationEmail = require("../utils/sendSessionNotificationEmail");

// Crear una nueva sesión
const createSessionService = async (data) => {
  const {
    eventId,
    name,
    sessionType,
    dates,
    time,
    duration,
    meetingLink,
    message,
    notify,
    participantId,
  } = data;

  // Verifica si el evento existe
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error("Evento no encontrado");

  // Si es sesión individual, verifica el participante
  let participant = null;
  if (sessionType === "individual") {
    if (!participantId) throw new Error("Falta el ID del participante");
    participant = await User.findByPk(participantId);
    if (!participant) throw new Error("Participante no encontrado");
  }

  // Crea la sesión
  const newSession = await Session.create({
    eventId,
    name,
    sessionType,
    dates,
    time,
    duration,
    meetingLink,
    message,
    notify,
    participantId: participant?.id || null,
  });

  // Si se debe notificar
  if (notify) {
    if (sessionType === "individual") {
      try {
        await sendSessionNotificationEmail({
          to: participant.email,
          participantName: participant.name,
          sessionName: name,
          dates,
          time,
          meetingLink,
          sessionType,
          message,
        });
      } catch (error) {
        console.error("❌ Error al enviar notificación:", error.message);
      }
    } else {
      const participantes = await User.findAll({
        where: {
          role: "participante",
          eventId,
          isActive: true,
        },
      });

      for (const p of participantes) {
        try {
          await sendSessionNotificationEmail({
            to: p.email,
            participantName: p.name,
            sessionName: name,
            dates,
            time,
            meetingLink,
            sessionType,
            message,
          });
        } catch (error) {
          console.error(`❌ Error al notificar a ${p.email}:`, error.message);
        }
      }
    }
  }

  return newSession;
};

// Obtener todas las sesiones
const getAllSessionsService = async () => {
  return await Session.findAll();
};

// Obtener una sesión por ID
const getSessionByIdService = async (id) => {
  const session = await Session.findByPk(id);
  if (!session) throw new Error("Sesión no encontrada");
  return session;
};

const getSessionsByEventIdService = async (eventId) => {
  const sessions = await Session.findAll({ where: { eventId } });
  return sessions;
};


// Actualizar sesión
const updateSessionService = async (id, data) => {
  const session = await Session.findByPk(id);
  if (!session) throw new Error("Sesión no encontrada");

  const {
    eventId,
    name,
    sessionType,
    dates,
    time,
    duration,
    meetingLink,
    message,
    notify,
    participantId,
  } = data;

  if (eventId && eventId !== session.eventId) {
    const event = await Event.findByPk(eventId);
    if (!event) throw new Error("Evento no encontrado");
    session.eventId = eventId;
  }

  let participant = null;
  if (sessionType === "individual") {
    if (!participantId) throw new Error("Falta el ID del participante");
    participant = await User.findByPk(participantId);
    if (!participant) throw new Error("Participante no encontrado");
    session.participantId = participant.id;
  } else {
    session.participantId = null;
  }

  session.name = name || session.name;
  session.sessionType = sessionType || session.sessionType;
  session.dates = dates || session.dates;
  session.time = time || session.time;
  session.duration = duration !== undefined ? duration : session.duration;
  session.meetingLink = meetingLink || session.meetingLink;
  session.message = message || session.message;
  session.notify = notify !== undefined ? notify : session.notify;

  await session.save();

  // Si se debe notificar
  if (notify) {
    if (session.sessionType === "individual") {
      const p = participant || (await User.findByPk(session.participantId));
      try {
        await sendSessionNotificationEmail({
          to: p.email,
          participantName: p.name,
          sessionName: session.name,
          dates: session.dates,
          time: session.time,
          meetingLink: session.meetingLink,
          sessionType: session.sessionType,
          message: session.message,
        });
      } catch (error) {
        console.error("❌ Error al enviar notificación:", error.message);
      }
    } else {
      const participantes = await User.findAll({
        where: {
          role: "participante",
          eventId: session.eventId,
          isActive: true,
        },
      });

      for (const p of participantes) {
        try {
          await sendSessionNotificationEmail({
            to: p.email,
            participantName: p.name,
            sessionName: session.name,
            dates: session.dates,
            time: session.time,
            meetingLink: session.meetingLink,
            sessionType: session.sessionType,
            message: session.message,
          });
        } catch (error) {
          console.error(`❌ Error al notificar a ${p.email}:`, error.message);
        }
      }
    }
  }

  return session;
};

// Eliminar una sesión
const deleteSessionService = async (id) => {
  const session = await Session.findByPk(id);
  if (!session) throw new Error("Sesión no encontrada");
  await session.destroy();
};

module.exports = {
  createSessionService,
  getAllSessionsService,
  getSessionByIdService,
  getSessionsByEventIdService,
  updateSessionService,
  deleteSessionService,
};