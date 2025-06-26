const { Router } = require("express");
const segmentController = require("../controllers/segmentController");
const uploadSegmentFiles = require("../services/uploadSegmentFiles");

const router = Router();

// Cargar archivos y crear segmento
router.post("/", uploadSegmentFiles, segmentController.createSegment);

// Cargar archivos y actualizar segmento
router.put("/:id", uploadSegmentFiles, segmentController.updateSegment);

// Resto sin archivos
router.get("/", segmentController.getAllSegments);
router.get("/:id", segmentController.getSegmentById);
router.delete("/:id", segmentController.deleteSegment);

module.exports = router;
