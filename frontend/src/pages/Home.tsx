import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { useEffect, useState } from "react";

import HomeSlider from "../components/home/HomeSlider";
import NewProducts from "../components/home/NewProducts";
import { Typography } from "@mui/material";
import { fetchAllProducts } from "../redux/reducers/productReducer";

const Home = () => {
  const [search, setSearch] = useState("");
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts({ search: "", offset: 0, limit: 10 }));
  }, []);
  return (
    <div>
      {/* Swiper Slider: https://swiperjs.com/get-started */}
      <HomeSlider />
      {/* New Products */}
      <Typography variant="h6" gutterBottom sx={{ my: 2 }}>
        Most Recommended Products
      </Typography>

      <NewProducts list={products.productList} />
    </div>
  );
};
export default Home;
