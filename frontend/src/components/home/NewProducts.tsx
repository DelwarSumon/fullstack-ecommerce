import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import { Box } from "@mui/system";
import ProductBox from "../product/ProductBox";
import { ProductList } from "../../types/product";

const NewProducts = ({ list }: ProductList) => {
  SwiperCore.use([Autoplay, Pagination, Navigation]);

  return (
    <div>
      <Swiper
        speed={1200}
        autoplay={true}
        spaceBetween={20}
        slidesPerView={5}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1240: {
            slidesPerView: 5,
          },
        }}
      >
        {list &&
          list.map((product, index) => (
            <SwiperSlide key={product.id}>
              <Box sx={{ mb: 2 }}>
                <ProductBox info={product} />
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
export default NewProducts;
