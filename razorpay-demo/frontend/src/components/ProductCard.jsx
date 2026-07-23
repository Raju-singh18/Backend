export default function ProductCard() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">

      <img
        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
        className="rounded-lg h-80 w-full object-cover"
      />

      <h2 className="text-3xl font-bold mt-6">
        Wireless Headphones
      </h2>

      <p className="text-gray-600 mt-3">
        Premium Bluetooth Headphones with Noise Cancellation.
      </p>

      <div className="text-4xl text-green-600 font-bold mt-6">
        ₹999
      </div>

    </div>
  );
}