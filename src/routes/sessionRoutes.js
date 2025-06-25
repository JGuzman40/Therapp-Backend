const { Router } = require("express");
const sessionController = require("../controllers/sessionController");

const router = Router();

router.post("/", sessionController.createSession); // Crear una sesión
router.get("/", sessionController.getAllSessions); // Obtener todas las sesiones
router.get("/:id", sessionController.getSessionById); // Obtener una sesión por ID
router.put("/:id", sessionController.updateSession); // Actualizar una sesión
router.delete("/:id", sessionController.deleteSession); // Eliminar una sesión

module.exports = router;
