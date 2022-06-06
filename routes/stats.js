const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }),statsController.getStats);
router.get('/requestsStats', passport.authenticate('jwt', { session: false }),statsController.getRequestsStats);
router.get('/genderStats', passport.authenticate('jwt', { session: false }),statsController.getGenderStats);
module.exports = router;
