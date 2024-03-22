const router = require('express').Router();

const authService = require('../services/authService');

const { isAuth, isGuest } = require('../middlewares/authMiddeware');

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);
        
        res.cookie('auth', token);
        res.end(JSON.stringify(req.body, null, 2))
    } catch(err) {
        res.end(JSON.stringify(err))
    }
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
    
        res.cookie('auth', token)
        
        const resData = {
            token: token,
        }
        res.end(JSON.stringify(resData));
        // res.end(JSON.stringify(req.body, null, 2))
        

    } catch(err) {
        res.end(JSON.stringify(err))
    };

});


router.post('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
});

module.exports = router;