import { createPayment, returnPayment } from "../services/paymentService";
import { VNPay } from "vn-payments";

// VNPay.TEST_CONFIG = {
// 	paymentGateway: 'http://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
// 	merchant: 'COCOSIN',
// 	secureSecret: 'RAOEXHYVSDDIIENYWSLDIIZTANXUXZFJ',
// };

const vnpay = new VNPay({
  paymentGateway: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  merchant: "COCOSIN",
  secureSecret: "RAOEXHYVSDDIIENYWSLDIIZTANXUXZFJ",
});

const handleCreatePayment = (req, res) => {
  console.log("check data: ", req.body);
  const checkoutData = {
    amount: parseInt(req.body.amount, 10),
    orderInfo: req.body.orderInfo,
    clientIp: req.body.clientIp,
    // orderId: req.body.orderId,
    returnUrl: `http://localhost:8080/api/return-payment`,
    transactionId: "testOrder123", //mã giao dịch trong ngày
    bankCode: "NCB",

    // locale: "vn",
    // currency: "VND",
    orderId: req.body.orderId,
    orderType: "beauty",

    // paymentMethod: "ATM_ONLINE",
    // description: "Mua mỹ phẩm trên website của chúng tôi",
    // installment: false,
  };
  vnpay.buildCheckoutUrl(checkoutData).then((checkoutUrl) => {
    res.send({ checkoutUrl });
  });
};

const handleReturnPayment = (req, res) => {
  const query = req.query;
  console.log("check query: ", query);
  vnpay.verifyReturnUrl(query).then((results) => {
    if (results) {
      // Lưu thông tin đơn hàng vào cơ sở dữ liệu của bạn ở đây
      res.redirect("http://localhost:3000/payment/success");
    } else {
      res.redirect("http://localhost:3000/payment/cancel");
    }
  });
};

module.exports = {
  handleCreatePayment,
  handleReturnPayment,
};
