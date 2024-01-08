import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl text-center my-4">Payment</h2>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
