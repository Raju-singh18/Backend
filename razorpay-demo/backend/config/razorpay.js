
import Razorpay from "razorpay";
import dotenv from "dotenv"
dotenv.config();

// Verify credentials are loaded
if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
  console.error('ERROR: Razorpay credentials not found in environment variables');
  throw new Error('Missing Razorpay credentials');
}

console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY);
console.log('Razorpay Secret exists:', !!process.env.RAZORPAY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

export default razorpay;
