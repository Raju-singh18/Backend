// import axios from "axios";

// export default function OrderSummary() {


//     const loadScript = ()=>{
//         return new Promise((resolve, reject)=>{
//             const script = document.createElement("script");
//             script.src="https://checkout.razorpay.com/v1/checkout.js";
//             script.onload = ()=>{
//                 resolve(true);
//             }
//             document.body.appendChild(script);
//         });
//     }

//   const paymentHandler = async () => {

//     await loadScript();

//     const { data } = await axios.post(
//       "http://localhost:5000/create-order",
//       {
//         amount:1179
//       }
//     );

//     console.log("Response through order creation:",data);

//     const options = {

//       key:import.meta.env.VITE_RAZORPAY_KEY,

//       amount:data.amount,

//       currency:data.currency,

//       order_id:data.id,

//       name:"Demo Store",

//       description:"React Razorpay Demo",

//       handler:async function(response){

//         console.log("Payment Response:", response);
//         try {

//     const verifyResponse = await axios.post(
//       "http://localhost:5000/verify-payment",
//       {
//         razorpay_order_id: response.razorpay_order_id,
//         razorpay_payment_id: response.razorpay_payment_id,
//         razorpay_signature: response.razorpay_signature,
//       }
//     );

//     if (verifyResponse.data.success) {
//       alert("Payment Verified Successfully");
//     } else {
//       alert("Payment Verification Failed");
//     }

//   } catch (error) {
//     console.log(error);
//     alert("Verification Error");
//   }

//       },

//       prefill:{

//         name:"Raju",

//         email:"raju@gmail.com",

//         contact:"9999999999"

//       },

//       theme:{
//         color:"#2563EB"
//       }

//     };

//     const razorpay=new window.Razorpay(options);

//     razorpay.open();

//   };

//   return (

//     <div className="bg-white rounded-xl shadow-xl p-6">

//       <h2 className="text-2xl font-bold mb-6">
//         Order Summary
//       </h2>

//       <div className="flex justify-between py-2">
//         <span>Product</span>
//         <span>₹999</span>
//       </div>

//       <div className="flex justify-between py-2">
//         <span>GST</span>
//         <span>₹180</span>
//       </div>

//       <div className="flex justify-between py-2">
//         <span>Shipping</span>
//         <span className="text-green-600">
//           FREE
//         </span>
//       </div>

//       <hr className="my-4"/>

//       <div className="flex justify-between text-xl font-bold">

//         <span>Total</span>

//         <span>₹1179</span>

//       </div>

//       <button
//         onClick={paymentHandler}
//         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition"
//       >
//         Pay with Razorpay
//       </button>

//     </div>

//   );

// }




import axios from "axios";

export default function OrderSummary() {

  // Load Razorpay SDK
  const loadScript = () => {
    return new Promise((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // Payment Function
  const paymentHandler = async () => {

    try {

      const isLoaded = await loadScript();

      console.log("Checkout ", isLoaded);

      if (!isLoaded) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      // Create Order
      const { data } = await axios.post(
        "http://localhost:5000/create-order",
        {
          amount: 1179,
        }
      );

      // If your backend returns:
      // {
      //   success:true,
      //   data: order
      // }

      const order = data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Demo Store",

        description: "React Razorpay Demo",

        handler: async function (response) {

          try {

            console.log("Payment Response", response);

            const verifyResponse = await axios.post(
              "http://localhost:5000/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyResponse.data.success) {

              alert("Payment Verified Successfully");

              console.log(verifyResponse.data);

            } else {

              alert("Payment Verification Failed");

            }

          } catch (error) {

            console.log(error);

            alert("Verification Error");

          }

        },

        prefill: {
          name: "Raju",
          email: "raju@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#2563EB",
        },

      };

      const razorpay = new window.Razorpay(options);

    console.log("razorpay: ", razorpay);

      razorpay.on("payment.failed", function (response) {

        console.log("Payment verification failed",response);

        alert(response.error.description);

      });

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert("Something went wrong.");

    }

  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="flex justify-between py-2">
        <span>Product</span>
        <span>₹999</span>
      </div>

      <div className="flex justify-between py-2">
        <span>GST</span>
        <span>₹180</span>
      </div>

      <div className="flex justify-between py-2">
        <span>Shipping</span>
        <span className="text-green-600">
          FREE
        </span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span>₹1179</span>
      </div>

      <button
        onClick={paymentHandler}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold transition"
      >
        Pay with Razorpay
      </button>

    </div>
  );
}
