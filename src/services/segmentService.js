const { Segment, Event } = require("../db"); // Asegúrate de que la ruta sea correcta

const createSegmentService = async (data) => {
  const { eventId, name, topics, files } = data;

  // Verificar si el evento existe
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error("Evento no encontrado");

  const newSegment = await Segment.create({
    eventId,
    name,
    topics,
    files,
  });

  return newSegment;
};

const getAllSegmentsService = async () => {
  return await Segment.findAll();
};

const getSegmentByIdService = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new Error("Segmento no encontrado");
  return segment;
};

const updateSegmentService = async (id, data) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new Error("Segmento no encontrado");

  // Actualiza los campos del segmento
  segment.eventId = data.eventId || segment.eventId;
  segment.name = data.name || segment.name;
  segment.topics = data.topics || segment.topics;
  segment.files = data.files || segment.files;

  await segment.save();
  return segment;
};

const deleteSegmentService = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new Error("Segmento no encontrado");

  await segment.destroy(); // Elimina el segmento
};

module.exports = {
  createSegmentService,
  getAllSegmentsService,
  getSegmentByIdService,
  updateSegmentService,
  deleteSegmentService,
};
