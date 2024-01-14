import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../provider/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAllTest from "../../../../hooks/useAllTest";

const TestDetails = () => {
  //  const [, , refetch] = useAllTest();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const { name, price, details, slots, date, _id } = data;

  const availableSlots = data.slots;

  const [promocode, setPromoCode] = useState("");
  const [originalPrice, setOriginalPrice] = useState(price);
  const [discountedPrice, setDiscountedPrice] = useState(originalPrice);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const { refetch } = useAllTest();
  /*   const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []); */

  const handlePromoCode = async (e) => {
    e.preventDefault();
    await axiosSecure.post(`/banner/promo-code/${promocode}`).then((res) => {
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        const newDiscountedPrice =
          originalPrice - (originalPrice * data.rate) / 100;
        setOriginalPrice(newDiscountedPrice);
        setDiscountedPrice(newDiscountedPrice);
        setDiscountPercentage(data.rate);
      } else {
        // Handle invalid promo code
        setDiscountedPrice(originalPrice);
        setDiscountPercentage(null);
      }
    });
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    const ReservationDetails = {
      name,
      price: originalPrice,
      slots,
      details,
      date,
      email: user.email,
      UserName: user.displayName,
      reportStatus: "pending",
    };
    console.log(ReservationDetails);

    await axiosPublic.post("/reservations", ReservationDetails).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to Reservations`,
          showConfirmButton: false,
          timer: 1800,
        });
        navigate("/allTests");
      }
    });
  };

  const handleSlots = (_id) => {
    axiosPublic
      .patch(`/updateSlots/${_id}`)
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          console.log("successful:", response.data);
        }
        refetch();
      })
      .catch((error) => {
        console.log("error:", error);
      });
    console.log("Success");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReserve(e);
    handleSlots(_id);
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-center bg-slate-700 text-white py-2 md:py-6 my-2 md:my-6 rounded-lg">
          Test Details
        </h2>
      </div>
      <div className="card  bg-base-100 shadow-xl">
        <figure>
          <img src={data.image} alt="Album" className="max-h-[440px] w-auto" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Name: {data.name}</h2>
          <p>
            <span className="font-semibold text-lg">Details:</span>{" "}
            {data.details}
          </p>

          <div className="card-actions justify-start">
            <p className="font-semibold text-lg">
              Slots-Available:{" "}
              <span className="text-slate-700">{data.slots}.</span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              Available Until:{" "}
              <span className="text-slate-600">{data.date}.</span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg">
              Price: <span className="text-slate-600">${data.price}.</span>
            </p>
          </div>
          {availableSlots > 0 ? (
            <div className="card-actions justify-center py-2">
              <button
                className="btn btn-primary w-[50%] text-xl"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Reserve
              </button>
            </div>
          ) : (
            <div className="card-actions ">
              <button className="btn  disabled">Reserve</button>
              <p className="text-red-500">Not Available*</p>
            </div>
          )}
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Use your coupon code here:</h3>
            <h2>Price: {originalPrice}</h2>
            <div>
              <form className="join my-4">
                <input
                  className="input input-bordered join-item"
                  placeholder="Promo Code"
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="btn join-item rounded-r-full"
                  onClick={handlePromoCode}
                >
                  Apply Promo
                </button>
              </form>
            </div>
            <Link>
              <button
                className="btn  bg-primary text-white"
                onClick={handleSubmit}
              >
                Pay
              </button>
            </Link>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default TestDetails;
