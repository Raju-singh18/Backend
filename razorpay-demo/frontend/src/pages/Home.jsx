import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import CustomerForm from "../components/CustomerForm";
import OrderSummary from "../components/OrderSummary";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto py-10 px-5">

        <div className="grid lg:grid-cols-2 gap-8">

          <ProductCard />

          <div className="space-y-6">
            <CustomerForm />
            <OrderSummary />
          </div>

        </div>

      </div>

    </div>
  );
}