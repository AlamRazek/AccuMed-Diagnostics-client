import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  const { isActive, image, title, rate, coupon, details } = data;

  return (
    <div>
      {isActive === "true" && (
        <div
          className="hero min-h-[450px] "
          style={{
            backgroundImage: `url(${image}) `,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content ">
            <div className="max-w-md text-left">
              <h1 className="mb-5 text-5xl font-bold text-white">{title}</h1>
              <p className="mb-5">{details}</p>
              <p className="text-xl">
                Use Our coupon Code:{" "}
                <span className="text-2xl font-bold text-[#F3CCF3] underline">
                  {coupon} <br />
                </span>{" "}
                to get {rate}% discount {coupon}
              </p>
              <Link to="/allTests">
                {" "}
                <button className="btn glass btn-sm my-2 ">See All Test</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
