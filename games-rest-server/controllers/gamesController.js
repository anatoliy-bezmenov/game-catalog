const router = require("express").Router();

const gamesService = require("../services/gamesService");
const { getErrorMessage } = require("../utils/errorUtils");
const { isAuth } = require("../middlewares/authMiddeware");

router.get("/", async (req, res) => {
  const games = await gamesService.getAll().lean();
  res.json(games);
});


router.post("/create", isAuth, async (req, res) => {
  const gameData = req.body;
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    await gamesService.create(req.user._id, gameData);
    res.json(req.body);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q
  const data = await gamesService.search(query)
  res.json(data);
})

router.get("/:gamesId/edit", isAuth,  isGamesOwner, async (req, res) => {
  const gamesData = req.body;

  try {
    const editedGame = await gamesService.update(req.params.gamesId, gamesData);
    res.json(editedGame); 
  } catch(err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }

});

router.post("/:gamesId/update", isAuth,  isGamesOwner, async (req, res) => {
  const gamesData = req.body;

  try {
    const editedGame = await gamesService.update(req.params.gamesId, gamesData);
    res.json(editedGame); 
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/:gamesId/details", async (req, res) => {
  const games = await gamesService.getOneDetailed(req.params.gamesId).lean();
  const isOwner = games.owner && games.owner._id == req.user?._id;

  res.json({ ...games, isOwner });
});

router.get("/:gamesId/delete", isAuth , isGamesOwner, async (req, res) => {
  const games = await gamesService.delete(req.params.gamesId);
  res.json(games);
});

async function isGamesOwner(req, res, next) {
  const games = await gamesService.getOneDetailed(req.params.gamesId).lean();

  if (games?.owner?._id != req.user?._id) {
    return res.status(401).json({ error: "Unauthorized owner" });
  }
  next();
}

module.exports = router;
