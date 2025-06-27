const { Router } = require("express");
const sessionController = require("../controllers/sessionController");

const router = Router();

router.post("/", sessionController.createSession);
router.get("/event/:eventId", sessionController.getSessionsByEventId); // 🔹 Nueva
router.get("/", sessionController.getAllSessions);
router.get("/:id", sessionController.getSessionById);
router.put("/:id", sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);

module.exports = router;
