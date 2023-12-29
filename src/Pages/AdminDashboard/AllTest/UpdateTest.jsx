import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateTest = () => {
  const { register, handleSubmit, reset } = useForm();
  const { name, _id, price, image, slots, category, details } = useLoaderData();
  console.log(name);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const onSubmit = async (data) => {
    //upload image to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu the data menu item data with the url
      const updatedTestForm = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        details: data.details,
        date: data.date,
        slots: parseFloat(data.slots),
        image: res.data.data.display_url,
      };
      console.log(updatedTestForm);
      const testRes = await axiosSecure.patch(`/test/${_id}`, updatedTestForm);
      console.log(testRes.data);
      if (testRes.data.modifiedCount > 0) {
        reset();
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is Updated `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <div>
        <h2 className="text-center py-2 md:py-6 my-2 md:my-6 font-bold text-2xl bg-slate-800 text-white">
          PLease Update the test Form
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Test Name*</span>
            </div>
            <input
              type="text"
              defaultValue={name}
              placeholder="Test Name"
              {...register("name", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </label>

          <div className="flex gap-6">
            {/* price */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                type="number"
                defaultValue={price}
                placeholder="price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Slots</span>
              </div>
              <input
                type="number"
                defaultValue={slots}
                placeholder="slots"
                {...register("slots", { required: true })}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          {/* test details */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Test Details</span>
            </div>
            <textarea
              {...register("details", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
              defaultValue={details}
            ></textarea>
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text font-semibold underline">
                Application Deadline
              </span>
            </div>
            <input
              type="date"
              name="date"
              {...register("date", { required: true })}
              min={currentDate}
              defaultValue={currentDate}
              required
              className="input input-bordered"
            />
          </label>

          <div className="from-control w-full my-4">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button className="btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTest;
