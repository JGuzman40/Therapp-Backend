const { Segment, Event } = require("../db");

// Crear un nuevo segmento
const createSegmentService = async (data, uploadedFiles = []) => {
  const { eventId, name, topics, startDate, endDate } = data;

  const event = await Event.findByPk(eventId);
  if (!event) throw new Error("Evento no encontrado");

  const newSegment = await Segment.create({
    eventId,
    name,
    topics,
    startDate,
    endDate,
    files: uploadedFiles,
  });

  return newSegment;
};

// Obtener todos los segmentos
const getAllSegmentsService = async () => {
  return await Segment.findAll();
};

// Obtener un segmento por su ID
const getSegmentByIdService = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new Error("Segmento no encontrado");
  return segment;
};

// Actualizar un segmento
const updateSegmentService = async (id, data, uploadedFiles = []) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new Error("Segmento no encontrado");

  segment.name = data.name || segment.name;
  segment.topics = data.topics || segment.topics;
  segment.startDate = data.startDate || segment.startDate;
  segment.endDate = data.endDate || segment.endDate;

  if (uploadedFiles.length > 0) {
    segment.files = uploadedFiles; // o acumular con [...(segment.files || []), ...uploadedFiles]
  }

  await segment.save();
  return segment;
};

// Eliminar un segmento (hard delete)
const deleteSegmentService = async (id) => {
  const segment = await Segment.findByPk(id);
  if (!segment) throw new Error("Segmento no encontrado");

  await segment.destroy();
};

module.exports = {
  createSegmentService,
  getAllSegmentsService,
  getSegmentByIdService,
  updateSegmentService,
  deleteSegmentService,
};