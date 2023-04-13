import {Box, FormControl, InputLabel, MenuItem, TextField} from "@mui/material";
import { Category, Price } from "../types/category";
import { Grid, Pagination, Stack, Typography } from "@mui/material";
import {
  ProductOpPagination,
  ProductPagination,
  ProductSort,
} from "../types/product";
import React, { useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  fetchAllProducts,
  fetchTotalProductsCount,
  sortByName,
} from "../redux/reducers/productReducer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import { AxiosError } from "axios";
import ProductBox from "../components/product/ProductBox";
import ProductSideFilter from "../components/product/ProductSideFilter";
import { fetchAllCatagory } from "../redux/reducers/categoryReducer";

const Products = () => {
  const [page, setPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const [total, setTotal] = useState(10);
  const [perPage, setPerPage] = useState("20");
  const [filter, setFilter] = useState<ProductSort>("asc");
  const [search, setSearch] = useState("");
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [selectedCatId, setSelectedCatId] = useState(0);
  const [selectedPrcId, setSelectedPrcId] = useState("");

  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as ProductSort);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // const products = useAppSelector((state) =>
  //   state.productReducer.filter((item) => {
  //     return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
  //   })
  // );
  const products = useAppSelector((state) => state.productReducer);
  const priceList: Price[] = [
    {
      id: "1",
      min: 10,
      max: 50,
    },
    {
      id: "2",
      min: 50,
      max: 100,
    },
    {
      id: "3",
      min: 100,
      max: 200,
    },
    {
      id: "4",
      min: 200,
      max: 500,
    },
    {
      id: "5",
      min: 500,
      max: 1000,
    },
    {
      id: "6",
      min: 1000,
      max: 10000,
    },
  ];
  const dispatch = useAppDispatch();

  const fetchProductList = () => {
    const offset = (page - 1) * parseInt(perPage);
    let filterOptions: ProductPagination = {
      search,
      offset: offset,
      limit: parseInt(perPage),
    };

    if (selectedPrcId !== "") {
      const foundPrc = priceList.find((prc) => prc.id === selectedPrcId);
      if (foundPrc) {
        filterOptions = {
          ...filterOptions,
          price_min: foundPrc.min,
          price_max: foundPrc.max,
        };
      }
    }

    if (selectedCatId !== 0) {
      filterOptions = {
        ...filterOptions,
        categoryId: selectedCatId,
      };
    }

    dispatch(fetchAllProducts(filterOptions));
  };

  useEffect(() => {
    fetchProductList();
  }, [page, search, perPage]);

  useEffect(() => {
    setPage(1);
    fetchProductList();
  }, [selectedCatId, selectedPrcId]);

  useEffect(() => {
    let filterOps: ProductOpPagination = { search, categoryId: selectedCatId };
    if (selectedPrcId !== "") {
      const foundPrc = priceList.find((prc) => prc.id === selectedPrcId);
      if (foundPrc) {
        filterOps = {
          ...filterOps,
          price_min: foundPrc.min,
          price_max: foundPrc.max,
        };
      }
    }
    dispatch(fetchTotalProductsCount(filterOps))
      .then((res) => {
        const resData: number | any = res.payload;
        setProductCount(resData);
        setTotal(Math.ceil(resData / parseInt(perPage)));
      })
      .catch((err) => console.log(err));
  }, [search, selectedCatId, selectedPrcId]);

  useEffect(() => {
    dispatch(sortByName(filter as ProductSort));
  }, [filter]);

  useEffect(() => {
    dispatch(fetchAllCatagory())
      .then((res) => {
        const resData: Category[] | any = res.payload;
        if (resData instanceof AxiosError) {
          console.log("Error in Category - ", resData.response?.data.message);
          // toast.error(`Error - ${resData.response?.data.message}`);
          setCategoryList([]);
        } else {
          // console.log("resData - ", resData);
          setCategoryList(resData);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="page-products">
      <Typography variant="h5" className="page-title">
        Products
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="standard"
                label="Search Product by title"
                name="search"
                autoComplete="search"
                className="form--field"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel></InputLabel>
                <Select
                  variant="standard"
                  value={perPage}
                  label="Per Page"
                  onChange={(e) => setPerPage(e.target.value as string)}
                >
                  <MenuItem value={20}>20 per page</MenuItem>
                  <MenuItem value={35}>35 per page</MenuItem>
                  <MenuItem value={50}>50 per page</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel></InputLabel>
                <Select
                  variant="standard"
                  value={filter}
                  label="Filter"
                  onChange={handleFilter}
                >
                  <MenuItem value={"asc"}>A - Z</MenuItem>
                  <MenuItem value={"desc"}>Z - A</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <ProductSideFilter
            list={categoryList}
            selectedCatId={selectedCatId}
            setSelectedCatId={setSelectedCatId}
            priceList={priceList}
            selectedPrcId={selectedPrcId}
            setSelectedPrcId={setSelectedPrcId}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid className="page-products_lists" container spacing={2}>
            {products.productList &&
              products.productList.map((product, index) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} xl={3}>
                  <ProductBox info={product} />
                </Grid>
              ))}

            {(!products.productList || products.productList.length === 0) && (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", width: "100%", py: 2 }}
              >
                No products found!
              </Typography>
            )}
          </Grid>
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Stack spacing={2}>
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                count={total}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
              />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default Products;
