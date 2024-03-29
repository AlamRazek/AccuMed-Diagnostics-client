import React from "react";
import { Link } from "react-router-dom";

const TestCard = ({ data }) => {
  const { name, price, image, _id } = data;
  return (
    <div className="p-2 my-2 text-center">
      <div className="card card-compact max-w-96 bg-base-300 ">
        <figure className="">
          <img
            src={image}
            alt="image"
            className="h-[300px] w-[350px] p-4 rounded-xl"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title justify-center">{name}</h2>
          <p className="card-title justify-center">${price}</p>
          <div className="card-actions justify-center">
            <Link to={`/card/details/${_id}`}>
              <button className="btn shadow-lg text-lg ">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
