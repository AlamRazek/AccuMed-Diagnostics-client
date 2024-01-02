import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBanner = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

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
      const testBanner = {
        title: data.title,
        coupon: data.coupon,
        rate: parseFloat(data.rate),
        details: data.details,
        image: res.data.data.display_url,
        isActive: "false",
      };
      const testRes = await axiosSecure.post("/banners", testBanner);
      console.log(testRes.data);
      if (testRes.data.insertedId) {
        reset();
        // show success popup
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.title} is added `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center py-2 md:py-6 my-2 md:my-6 font-bold text-2xl bg-slate-800 text-white">
          Add a Banner
        </h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Banner Title</span>
            </div>
            <input
              type="text"
              placeholder="Banner Title"
              {...register("title", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </label>

          <div className="flex gap-6">
            {/* Coupon code */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Coupon Code</span>
              </div>
              <input
                type="text"
                placeholder="Coupon Code"
                {...register("coupon", { required: true })}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Coupon Rate</span>
              </div>
              <input
                type="number"
                placeholder="Coupon Rate"
                {...register("rate", { required: true })}
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

export default AddBanner;
