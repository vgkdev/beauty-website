import { createPayment, returnPayment } from "../services/paymentService";

const handleCreatePayment = async (req, res) => {
  const response = await createPayment(req.query);
  return res.status(200).json(response);
};

const handleReturnPayment = async (req, res) => {
  const response = await returnPayment(req.query);
  return res.status(200).json(response);
};

module.exports = {
  handleCreatePayment,
  handleReturnPayment,
};
