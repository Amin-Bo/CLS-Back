const Invoice = require("../models/invoice");
const moment = require('moment');
const Supplier = require("../models/supplier");
const { default: mongoose } = require("mongoose");
exports.addInvoice = (req, res) => {
    let newInvoice = new Invoice();
    newInvoice.supplier = req.body.supplier;
    newInvoice.date = moment(req.body.date).format('YYYY-MM-DD[T00:00:00.000Z]');
    newInvoice.payment_status = req.body.payment_status;
    newInvoice.payment_method = req.body.payment_method;
    newInvoice.amount = req.body.amount;
    newInvoice.amount_excluding_taxes = req.body.Amount_excluding_taxes;
    newInvoice.file = req.file.filename;
    newInvoice.save((err, invoice) => {
        if (!invoice) {
            console.log(err);
            return res.status(501).json({
                message: "error has occurred"
            });
        }
        return res.status(200).json({
            invoice,
            added: true
        });
    });
};
exports.getAllInvoices = (req, res) => {
    Invoice.find((err, invoices) => {
        if (!invoices) {
            console.log(err);
        }
        return res.status(200).json(invoices);
    }).populate("supplier");
};
exports.getInvoiceById = (req, res) => {
    Invoice.find({
        _id: req.params.id
    }, (err, invoice) => {
        if (!invoice) {
            return res.status(404).json({
                message: "invoice not found"
            });
        }
        return res.status(200).json(invoice[0]);
    });
};
exports.getInvoiceBySupplierId = (req, res) => {
    Invoice.find({
        supplier: req.params.id
    }, (err, invoice) => {
        if (!invoice) {
            return res.status(404).json({
                message: "invoice not found"
            });
        }
        return res.status(200).json(invoice)
    }).populate("supplier");
};
exports.InvoicesStatistiques = (req, res) => {
    Invoice.aggregate([{
            $group: {
                _id: "$supplier",
                value: {
                    $sum: "$amount"
                }
            }
        },
        {
            $project: {
                supplier: '$_id',
                value: 1
            }
        },

        {
            $lookup: {
                from: "suppliers",
                localField: "supplier",
                foreignField: "_id",
                as: "supplier"
            },
        }
    ]).exec((err, invoices) => {
        if (!invoices) {
            console.log(err);
        }
        return res.status(200).json(invoices);
    });
};
exports.InvoicesStatistiquesByDateRange = (req, res) => {
    Invoice.aggregate([
        // {
        //     $match: {
        //         date: {$lte:'2022-12-31',  $gte:'2015-12-31'}
        //     }
        // },
        {
            $match: {
                $and:[{date:{$gte:req.params.minDate}},{date:{$lte:req.params.maxDate}}]
            }
        },
        {
            $group: {
                _id: "$supplier",
                value: {
                    $sum: "$amount"
                }
            }
        },
        {
            $project: {
                supplier: '$_id',
                value: 1
            }
        },

        {
            $lookup: {
                from: "suppliers",
                localField: "supplier",
                foreignField: "_id",
                as: "supplier"
            },
        }
    ]).exec((err, invoices) => {
        if (!invoices) {
            console.log(err);
        }
        return res.status(200).json(invoices);
    });
}
exports.InvoicesStatistiquesByYear = (req, res) => {
    Invoice.aggregate([
        {
            $match: {
                date:{$gte:req.params.year+'-01-01',  $lte:req.params.year+'-12-31'}
            }
        },
        {
            $group: {
                _id: "$supplier",
                value: {
                    $sum: "$amount"
                }
            }
        },
        {
            $project: {
                supplier: '$_id',
                value: 1
            }
        },

        {
            $lookup: {
                from: "suppliers",
                localField: "supplier",
                foreignField: "_id",
                as: "supplier"
            },
        }
    ]).exec((err, invoices) => {
        if (!invoices) {
            console.log(err);
        }
        return res.status(200).json(invoices);
    });
}

exports.StatsBySupplier = (req, res) => {
    //convert req.params.id to ObjectId
    let id = req.params.id;
    let o_id = new mongoose.Types.ObjectId(id);
    Invoice.aggregate([
        {
            $match: {
                supplier: o_id
            }
        },
        {
            $group: {
                _id: "$supplier",
                value: {
                    $sum: "$amount"
                }
            }
        },
        {
            $project: {
                supplier: '$_id',
                value: 1
            }
        },

        {
            $lookup: {
                from: "suppliers",
                localField: "supplier",
                foreignField: "_id",
                as: "supplier"
            },
        }
    ]).exec((err, invoices) => {
        if (!invoices) {
            console.log(err);
        }
        return res.status(200).json(invoices);
    });
}