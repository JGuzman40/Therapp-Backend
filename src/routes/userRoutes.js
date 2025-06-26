const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/facilitadores/:adminId", userController.getFacilitadoresByAdmin);
router.get("/participantes/:eventId", userController.getParticipantesByEvent);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
