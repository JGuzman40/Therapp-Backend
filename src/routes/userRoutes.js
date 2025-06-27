const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

// Rutas específicas primero
router.get("/facilitadores/:adminId", userController.getFacilitadoresByAdmin);
router.get("/participantes/:eventId", userController.getParticipantesByEvent);
router.get("/:id/participants", userController.getParticipantsByEventId); // si decides mantener esta

// CRUD general de usuarios
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
