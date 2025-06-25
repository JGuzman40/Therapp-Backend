const { Event } = require("../db"); // Importamos el modelo de Evento

// Crear un evento
const createEventService = async (data) => {
  const { eventType, eventName, eventImage, isActive, description } = data;

  const newEvent = await Event.create({
    eventType,
    eventName,
    eventImage,
    isActive,
    description,
  });

  return newEvent;
};

// Obtener todos los eventos
const getAllEventsService = async () => {
  return await Event.findAll();
};

// Obtener un evento por su ID
const getEventByIdService = async (id) => {
  const event = await Event.findByPk(id);
  if (!event) throw new Error("Evento no encontrado");
  return event;
};

// Actualizar un evento
const updateEventService = async (id, data) => {
  const { eventType, eventName, eventImage, isActive, description } = data;

  const event = await Event.findByPk(id);
  if (!event) throw new Error("Evento no encontrado");

  event.eventType = eventType || event.eventType;
  event.eventName = eventName || event.eventName;
  event.eventImage = eventImage || event.eventImage;
  event.isActive = isActive !== undefined ? isActive : event.isActive;
  event.description = description || event.description;

  await event.save();
  return event;
};

// Desactivar un evento (soft delete)
const deleteEventService = async (id) => {
  const event = await Event.findByPk(id);
  if (!event) throw new Error("Evento no encontrado");

  event.isActive = false;
  await event.save();
};

module.exports = {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
};
