const {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} = require("../services/eventService");

const catchAsync = require("../utils/catchAsync");

const createEvent = async (req, res) => {
  const newEvent = await createEventService(req.body);
  res
    .status(201)
    .json({ message: "Evento creado exitosamente", event: newEvent });
};

const getAllEvents = async (req, res) => {
  const events = await getAllEventsService();
  res.status(200).json(events);
};

const getEventById = async (req, res) => {
  const event = await getEventByIdService(req.params.id);
  res.status(200).json(event);
};

const updateEvent = async (req, res) => {
  const updatedEvent = await updateEventService(req.params.id, req.body);
  res
    .status(200)
    .json({ message: "Evento actualizado exitosamente", event: updatedEvent });
};

const deleteEvent = async (req, res) => {
  await deleteEventService(req.params.id);
  res.status(200).json({ message: "Evento desactivado exitosamente" });
};

module.exports = {
  createEvent: catchAsync(createEvent),
  getAllEvents: catchAsync(getAllEvents),
  getEventById: catchAsync(getEventById),
  updateEvent: catchAsync(updateEvent),
  deleteEvent: catchAsync(deleteEvent),
};
