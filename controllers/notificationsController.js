const Notification = require('../models/notification');

exports.getAllNotifications = (req, res) => {
    Notification.countDocuments({}, (err, count)=>{
        if(err) return res.status(404).json({message: "Request not found"})
        else 
        Notification.find({}, (err, notifications)=>{
                if (err) return res.status(500)
                else res.status(200).json({notifications, count})
            })
    })
}

exports.deleteNotification = (req, res) => {
    Notification.findByIdAndDelete(req.params.id, (err, notification)=>{
        if (err) return res.status(500).json({message: "Request not found"})
        else res.status(200).json({message: "Request deleted"})
    })
}

exports.deleteAllNotifications = (req, res) => {
    Notification.deleteMany({}, (err, notification)=>{
        if (err) return res.status(500).json({message: "Request not found"})
        else res.status(200).json({message: "All requests deleted"})
    })
}