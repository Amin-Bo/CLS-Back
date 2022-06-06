const {ONE_SIGNAL_CONFIG} = require('../config/on_signal.config');
const pushNotificationService = require('../services/push-notification.services');

exports.SendNotification = async (req, res , next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: {"en": "Test Notification"},
        included_segments: ["All"],
        content_available: true,
        small_icon: "ic_notification_icon",
        data : {
            PushTitle : "Title Notification",
        },
    };

    pushNotificationService.SendNotification(message, (error , results) => {
        if (error) {
            return next(error);
        } 

        return res.status(200).json({
            message : "Success",
            data : results
        });
    });
}

exports.SendNotificationToDevice = async (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: {"en": req.message},
        included_segments: ["included_player_ids"],
        include_player_ids: [req.device_id],
        content_available: true,
        small_icon: "ic_notification_icon",
        data : {
            PushTitle : "Title Notification",
        },
    };

    pushNotificationService.SendNotification(message, (error , results) => {
        if (error) {
            return next(error);
        } 

        return res.status(200).json({
            message : "Success",
            data : results
        });
    });
}