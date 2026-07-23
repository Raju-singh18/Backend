export default function CustomerForm() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-6">

      <h2 className="text-2xl font-bold mb-5">
        Customer Details
      </h2>

      <input
        className="w-full border rounded-lg p-3 mb-4"
        placeholder="Enter Name"
      />

      <input
        className="w-full border rounded-lg p-3 mb-4"
        placeholder="Enter Email"
      />

      <input
        className="w-full border rounded-lg p-3"
        placeholder="Enter Phone"
      />

    </div>
  );
}
