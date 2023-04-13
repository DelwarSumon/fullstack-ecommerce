import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

const HomeSlider = () => {
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  return (
    <Swiper autoplay={true} speed={1200} slidesPerView={1}>
      <SwiperSlide>
        <img
          className="slider--img"
          src="https://remonone.github.io/bof-frontend-project-advanced/slider.png"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="slider--img"
          src="https://remonone.github.io/bof-frontend-project-advanced/slider.png"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="slider--img"
          src="https://remonone.github.io/bof-frontend-project-advanced/slider.png"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};
export default HomeSlider;
