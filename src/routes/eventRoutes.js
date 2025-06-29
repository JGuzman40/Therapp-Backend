const { Router } = require("express");
const eventController = require("../controllers/eventController");

const router = Router();

router.post("/", eventController.createEvent); // Crear un evento
router.get("/", eventController.getAllEvents); // Obtener todos los eventos
router.get("/types", eventController.getEventTypes); // cargar el enum de tipos de evento
router.get("/:id", eventController.getEventById); // Obtener un evento por ID
router.get("/facilitador/:facilitadorId", eventController.getEventsByFacilitador);
router.put("/:id", eventController.updateEvent); // Actualizar un evento
router.delete("/:id", eventController.deleteEvent); // Desactivar un evento

module.exports = router;
