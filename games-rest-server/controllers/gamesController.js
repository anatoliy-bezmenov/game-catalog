const router = require('express').Router();

const gamesService = require('../services/gamesService');
const { getErrorMessage } = require('../utils/errorUtils');
const { isAuth } = require('../middlewares/authMiddeware');

router.get('/', async (req, res) => {
    const games = await gamesService.getAll().lean();
    res.end(JSON.stringify(games), null, 2)
});


router.post('/create', isAuth, async (req, res) => {
    const themeData = req.body;

    try {
        await gamesService.create(req.user._id, themeData);
        res.end(JSON.stringify(req.body, null, 2))
    } catch(err) {
        res.end(JSON.stringify(err))
    }
});

router.get('/:gamesId/edit', isGamesOwner, async (req, res) => {
    const gamesData = req.body;
    const editedGame = await gamesService.edit(req.params.gamesId, gamesData);

    res.end(JSON.stringify(editedGame));
});

router.post('/:gamesId/edit', isGamesOwner, async (req, res) => {
    const gamesData = req.body;

    try {
        await gamesService.edit(req.params.gamesId, gamesData);
        res.end(JSON.stringify(gamesData, null, 2))
    } catch(err) {
        res.end(JSON.stringify(err));
    };
});


router.get('/:gamesId/details', async (req, res) => {
    const games = await gamesService.getOneDetailed(req.params.gamesId).lean();

    // const isOwner = games.owner && games.owner._id == req.user?._id;

    res.end(JSON.stringify(games));
});

router.get('/:gamesId/delete', isGamesOwner, async (req, res) => {
    const games = await gamesService.delete(req.params.gamesId);
    res.end(JSON.stringify(games))
})

async function isGamesOwner(req, res, next) {
    const games = await gamesService.getOne(req.params.gamesId).lean();

    if (games.owner != req.user?._id) {
        // return res.redirect(`/stones/${req.params.stonesId}/details`);
    };
    next();
};

module.exports = router;