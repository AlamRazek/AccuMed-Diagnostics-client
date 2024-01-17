import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Swipper = () => {
  const axiosPublic = useAxiosPublic();
  const { data: slider = [] } = useQuery({
    queryKey: ["slider"],
    queryFn: async () => {
      const res = await axiosPublic.get("/slider");
      return res.data;
    },
  });
  return (
    <div>
      <div className="shadow-lg p-4 lg:p-8">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          autoplay={{ delay: 2000 }}
          loop={true}
          onSlideChange={() => console.log()}
          onSwiper={(swiper) => console.log()}
        >
          {slider.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="max-h-[400px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Swipper;
