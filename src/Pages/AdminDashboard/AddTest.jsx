import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTest = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const notify = () => toast("Test Added");
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
      const testForm = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        details: data.details,
        slots: parseFloat(data.slots),
        image: res.data.data.display_url,
      };
      const testRes = await axiosSecure.post("/test", testForm);
      console.log(testRes.data);
      if (testRes.data.insertedId) {
        reset();
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added `,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Test Name*</span>
            </div>
            <input
              type="text"
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
              name="deadline"
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

          <button className="btn">Add Test</button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
