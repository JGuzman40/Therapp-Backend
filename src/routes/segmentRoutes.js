const { Router } = require("express");
const segmentController = require("../controllers/segmentController");

const router = Router();

// Crear un segmento
router.post("/", segmentController.createSegment);

// Obtener todos los segmentos
router.get("/", segmentController.getAllSegments);

// Obtener un segmento por ID
router.get("/:id", segmentController.getSegmentById);

// Actualizar un segmento
router.put("/:id", segmentController.updateSegment);

// Eliminar un segmento
router.delete("/:id", segmentController.deleteSegment);

module.exports = router;
