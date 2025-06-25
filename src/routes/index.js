const { Router } = require("express");
const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const eventRoutes = require("./eventRoutes");
const sessionRoutes = require("./sessionRoutes");
const segmentRoutes = require("./segmentRoutes");

const router = Router();
router.use("/login", loginRoutes);
router.use("/users", userRoutes);
router.use("/event", eventRoutes);
router.use("/session", sessionRoutes);
router.use("/segment", segmentRoutes);

module.exports = router;
