import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    console.log('Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);

    console.log('Order created successfully:', order.id);

    return res.status(200).json({
      success: true,
      data: order,
      message: "Order Created Successfully!",
    });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error.error || 'Unknown error'
    });
  }
};

// const VerifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature === razorpay_signature) {
//       return res.status(200).json({
//         success: true,
//         message: "Payment Verified",
//       });
//     }

//     return res.status(400).json({
//       success: false,
//       message: "Invalid Signature",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const VerifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Check if all required fields are present
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "All payment details are required.",
      });
    }

    // Generate signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Debug logs (remove in production)
    console.log("Order ID:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Received Signature:", razorpay_signature);
    console.log("Generated Signature:", generatedSignature);

    // Compare signatures
    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment Verified Successfully",
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid Signature",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export { createOrder, VerifyPayment };
