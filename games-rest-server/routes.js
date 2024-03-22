const router = require('express').Router();

const authController = require('./controllers/authController');
const gamesController = require('./controllers/gamesController');

router.use('/auth', authController);
router.use('/games', gamesController);

router.all('*', (req, res) => {
    res.json({ username: 'Flavio' })
});

module.exports = router;