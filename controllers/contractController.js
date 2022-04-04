const Contract = require("../models/contract");
const moment = require("moment");


exports.addContract = (req, res) => {
  let newContract = new Contract();
  newContract.supplier = req.body.supplier;
  if (req.file) {
    newContract.file = req.file.filename;
  }
  newContract.date_signature = moment(req.body.date_signature).format("YYYY-MM-DD[T00:00:00.000Z]");
  newContract.expires_at = moment(req.body.expires_at).format("YYYY-MM-DD[T00:00:00.000Z]");
  newContract.payment_status = req.body.payment_status;
  switch (req.body.payment_status) {
    case "paid":
      newContract.payment_status = req.body.payment_status;
      newContract.contract_details.payment_date = moment(req.body.payment_date).format("YYYY-MM-DD[T00:00:00.000Z]");
      newContract.contract_details.payment_amount = req.body.payment_amount;
      newContract.contract_details.method = req.body.method;
      break;
    case "not_paid":
      // newContract.contract_details.method = req.body.method;
      newContract.contract_details.payment_amount = req.body.payment_amount;
      newContract.contract_details.due_date = moment(req.body.due_date).format("YYYY-MM-DD[T00:00:00.000Z]");
      break;
    case "paid_by_split":
      newContract.contract_details.method = req.body.method;
      newContract.contract_details.global_amount = req.body.global_amount;
      newContract.contract_details.number_of_slices = req.body.number_of_slices;
      newContract.contract_details.payment_each_slice = req.body.payment_each_slice;
      break;
    default:
      break;
  }
  newContract.save((err, contract) => {
    if (!contract) {
      console.log(err);
      return res.status(501).json({
        message: "error has occurred"
      });
    }
    return res.status(200).json({
      contract,
      added: true
    });
  });
};
exports.getAllContracts = (req, res) => {
  Contract.find((err, contracts) => {
    if (!contracts) {
      console.log(err);
    }
    return res.status(200).json(contracts);
  }).populate("supplier");
};
exports.getContractById = (req, res) => {
  Contract.find({
    _id: req.params.id
  }, (err, contract) => {
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found"
      });
    }
    return res.status(200).json(contract[0]);
  });
};
exports.getContractBySupplierId = (req, res) => {
  Contract.find({
    supplier: req.params.id
  }, (err, contract) => {
    if (!contract) {
      return res.status(404).json({
        message: "Contract not found"
      });
    }
    return res.status(200).json({
      contract
    });
  }).populate("supplier");
};

exports.updateContract = (req, res) => {
  console.log(req.params.id);
  let contract_details = {};
  date_signature = moment(req.body.date_signature).format("YYYY-MM-DD[T00:00:00.000Z]");
  expires_at = moment(req.body.expires_at).format("YYYY-MM-DD[T00:00:00.000Z]");
  payment_status = req.body.payment_status;
  switch (payment_status) {
    case "paid":
      payment_status = req.body.payment_status;
      contract_details.payment_date = moment(req.body.payment_date).format("YYYY-MM-DD[T00:00:00.000Z]");
      contract_details.payment_amount = req.body.payment_amount;
      contract_details.method = req.body.method;
      break;
    case "not_paid":
      // newContract.contract_details.method = req.body.method;
      contract_details.payment_amount = req.body.payment_amount;
      contract_details.due_date = moment(req.body.due_date).format("YYYY-MM-DD[T00:00:00.000Z]");
      break;
    case "paid_by_split":
      contract_details.method = req.body.method;
      contract_details.global_amount = req.body.global_amount;
      contract_details.number_of_slices = req.body.number_of_slices;
      contract_details.payment_each_slice = req.body.payment_each_slice;
      break;
    default:
      break;
  } 


  Contract.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        supplier: req.body.supplier,
        date_signature: date_signature,
        expires_at: expires_at,
        payment_status: payment_status,
        contract_details: contract_details
      }
    },
    {
      new: true
    },
    (err, contract) => {
      if (!contract) {
        return res.status(404).json({
          message: "Contract not found"
        });
      }
      return res.status(200).json({
        updated: true
      });
    }
  );
}

exports.notifyMe = (req, res) => {
  return res.json({
    message: "hello notification"
  });
};