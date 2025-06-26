const {
  createSegmentService,
  getAllSegmentsService,
  getSegmentByIdService,
  updateSegmentService,
  deleteSegmentService,
} = require("../services/segmentService");

const catchAsync = require("../utils/catchAsync");

// ✅ Función utilitaria para transformar los archivos de Cloudinary
const extractFileUrls = (files) => {
  if (!files || !Array.isArray(files)) return [];
  return files.map((file) => ({
    url: file.path,
    public_id: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
  }));
};

// 🟢 Crear un segmento con archivos opcionales
const createSegment = async (req, res) => {
  const uploadedFiles = extractFileUrls(req.files);
  const newSegment = await createSegmentService(req.body, uploadedFiles);
  res.status(201).json({
    message: "Segmento creado exitosamente",
    segment: newSegment,
  });
};

// 🟢 Obtener todos los segmentos
const getAllSegments = async (req, res) => {
  const segments = await getAllSegmentsService();
  res.status(200).json(segments);
};

// 🟢 Obtener un segmento por ID
const getSegmentById = async (req, res) => {
  const segment = await getSegmentByIdService(req.params.id);
  res.status(200).json(segment);
};

// 🟢 Actualizar un segmento con posibles archivos nuevos
const updateSegment = async (req, res) => {
  const uploadedFiles = extractFileUrls(req.files);
  const updatedSegment = await updateSegmentService(req.params.id, req.body, uploadedFiles);
  res.status(200).json({
    message: "Segmento actualizado exitosamente",
    segment: updatedSegment,
  });
};

// 🟢 Eliminar un segmento
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
