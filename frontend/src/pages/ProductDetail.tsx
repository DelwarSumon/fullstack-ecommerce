import "swiper/css";

import { Box, Card, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import AddToCartButton from "../components/product/AddToCartButton";
import { AxiosError } from "axios";
import NotFound from "./NotFound";
import { Product } from "../types/product";
import { fetchProductDetail } from "../redux/reducers/productReducer";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../hooks/reduxHook";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const params = useParams();
  const [info, setInfo] = useState<Product | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductDetail(params.id))
      .then((res) => {
        if (res.payload instanceof AxiosError) {
          toast.error(res.payload.response?.data.message);
        } else {
          const resData: Product = res.payload;
          setInfo(resData);
        }
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  SwiperCore.use([Autoplay, Pagination, Navigation]);

  return (
    <Box>
      {info ? (
        <Box>
          <Swiper
            speed={1200}
            autoplay={true}
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
          >
            {info && info.images &&
              info.images.map((img: any) => (
                <SwiperSlide key={img.id}>
                  <Card sx={{ maxWidth: "100%", height: 350 }}>
                    <CardMedia
                      sx={{ height: "100%", width: "100%" }}
                      image={`${img.url}`}
                      title={info.title}
                    />
                  </Card>
                </SwiperSlide>
              ))}
          </Swiper>

          <Typography sx={{ mt: 2 }} gutterBottom variant="h6" component="div">
            {info.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            ${info.price}
          </Typography>
          <Typography sx={{ pb: 2 }} variant="body2" color="text.secondary">
            {info.description}
          </Typography>

          <AddToCartButton product={info} id={info.id} />
        </Box>
      ) : (
        <NotFound
          headline={`Look like the product is lost in this world`}
          message={`the product you are looking is not exists in this world. You can find in Alien space!`}
        />
      )}
    </Box>
  );
};
export default ProductDetail;
