const {
  createSegmentService,
  getAllSegmentsService,
  getSegmentByIdService,
  updateSegmentService,
  deleteSegmentService,
} = require("../services/segmentService"); // Asegúrate de que la ruta sea correcta

const catchAsync = require("../utils/catchAsync");

// Crear un segmento
const createSegment = async (req, res) => {
  const newSegment = await createSegmentService(req.body);
  res
    .status(201)
    .json({ message: "Segmento creado exitosamente", segment: newSegment });
};

// Obtener todos los segmentos
const getAllSegments = async (req, res) => {
  const segments = await getAllSegmentsService();
  res.status(200).json(segments);
};

// Obtener un segmento por ID
const getSegmentById = async (req, res) => {
  const segment = await getSegmentByIdService(req.params.id);
  res.status(200).json(segment);
};

// Actualizar un segmento
const updateSegment = async (req, res) => {
  const updatedSegment = await updateSegmentService(req.params.id, req.body);
  res.status(200).json({
    message: "Segmento actualizado exitosamente",
    segment: updatedSegment,
  });
};

// Eliminar un segmento
const deleteSegment = async (req, res) => {
  await deleteSegmentService(req.params.id);
  res.status(200).json({ message: "Segmento eliminado exitosamente" });
};

module.exports = {
  createSegment: catchAsync(createSegment),
  getAllSegments: catchAsync(getAllSegments),
  getSegmentById: catchAsync(getSegmentById),
  updateSegment: catchAsync(updateSegment),
  deleteSegment: catchAsync(deleteSegment),
};
