const router = require("express").Router();

const authController = require("./controllers/authController");
const gamesController = require("./controllers/gamesController");

router.use("/auth", authController);
router.use("/games", gamesController);

router.all("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

module.exports = router;