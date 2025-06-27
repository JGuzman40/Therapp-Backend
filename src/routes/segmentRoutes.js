const { Router } = require("express");
const segmentController = require("../controllers/segmentController");
const uploadSegmentFiles = require("../services/uploadSegmentFiles");

const router = Router();

// Crear segmento
router.post("/", uploadSegmentFiles, segmentController.createSegment);

// ✅ ESTA debe ir antes de /:id
router.get("/event/:eventId", segmentController.getSegmentsByEventId);

// Actualizar segmento
router.put("/:id", uploadSegmentFiles, segmentController.updateSegment);

// Obtener todos
router.get("/", segmentController.getAllSegments);

// Obtener uno por ID
router.get("/:id", segmentController.getSegmentById);

// Eliminar
router.delete("/:id", segmentController.deleteSegment);


module.exports = router;
