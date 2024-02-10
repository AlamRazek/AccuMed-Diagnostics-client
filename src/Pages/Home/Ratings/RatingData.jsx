const RatingData = ({ data }) => {
  const { name, title, details, rating } = data;
  return (
    <div>
      <p className="my-4 text-4xl">all the ratings {name}</p>
    </div>
  );
};

export default RatingData;
