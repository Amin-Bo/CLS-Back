const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationsController');
const pushNotifs = require('../controllers/push-notification.Controller');
const passport = require('passport');


router.get('/getAllNotifications',passport.authenticate('jwt', { session: false }), notificationController.getAllNotifications);
router.delete('/deleteAllNotifications',passport.authenticate('jwt', { session: false }), notificationController.deleteAllNotifications);
router.delete('/deleteNotification/:id',passport.authenticate('jwt', { session: false }), notificationController.deleteNotification);

router.get('/SendNotification',pushNotifs.SendNotification);
router.post('/SendNotificationToDevice',pushNotifs.SendNotificationToDevice);
module.exports = router;
