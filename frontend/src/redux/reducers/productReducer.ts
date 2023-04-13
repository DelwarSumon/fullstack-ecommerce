import {
  CreateProductWithForm,
  ModifyProductWithForm,
  ProductOpPagination,
  ProductPagination,
  ProductReducer,
} from "../../types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import axiosInstance from "../../common/axiosInstance";
import { sortName } from "../methods/productMethods";

// const initialState: Product[] = [];
const initialState: ProductReducer = {
  productList: [],
};

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async ({
    search,
    offset,
    limit,
    categoryId,
    price_min,
    price_max,
  }: ProductPagination) => {
    try {
      let actionUrl = `products?skip=${offset}&limit=${limit}`;
      if (search) actionUrl += `&search=${search}`;
      if (categoryId) actionUrl += `&categoryId=${categoryId}`;
      if (price_min && price_max)
        actionUrl += `&price_min=${price_min}&price_max=${price_max}`;
      const response = await axiosInstance.get(actionUrl);
      return response.data;
    } catch (error: any) {
      const e = error as AxiosError;
      return e;
    }
  }
);
export const fetchTotalProductsCount = createAsyncThunk(
  "fetchTotalProductsCount",
  async ({ search, categoryId, price_min, price_max }: ProductOpPagination) => {
    try {
      let actionUrl = `products?`;
      if (search && search !== "") actionUrl += `&title=${search}`;
      if (categoryId && categoryId !== 0)
        actionUrl += `&categoryId=${categoryId}`;
      if (price_min && price_max)
        actionUrl += `&price_min=${price_min}&price_max=${price_max}`;
      const response = await axiosInstance.get(actionUrl);
      if (!response || "error" in response.data) {
        return 0;
      } else {
        return response.data ? response.data.length : 0;
      }
    } catch (error: any) {
      const e = error as AxiosError;
      return e;
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "fetchProductDetail",
  async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`products/${id}`);
      return response.data;
    } catch (error: any) {
      const e = error as AxiosError;
      return e;
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async ({ imageList, product }: CreateProductWithForm) => {
    try {
      console.log("imageList: ", imageList)
      // let imageFiles: string[] = [];
      // for (let index = 0; index < imageList.length; index++) {
      //   const image = imageList[index];
      //   const response = await axiosInstance.post(
      //     "files/upload",
      //     { file: image },
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   const data = response.data.location;
      //   imageFiles.push(data);
      // }

      const productResponse = await axiosInstance.post("products", {
        ...product,
        images: [{"url": imageList}],
      });
      // const { images, ...productWithoutImages } = product;
      // const productResponse = await axiosInstance.post("products", productWithoutImages);
      return productResponse.data;
    } catch (error: any) {
      // throw new Error(error.message);
      console.log(error.response, error.response.statusText);
      const e = error as AxiosError;
      return e;
    }
  }
);
export const modifyProduct = createAsyncThunk(
  "modifyProduct",
  async ({ id, images, oldimages, update }: ModifyProductWithForm) => {
    try {
      let imageFiles: string[] = oldimages ? oldimages : [];
      // for (let index = 0; index < images.length; index++) {
      //   const image = images[index];
      //   const response = await axiosInstance.post(
      //     "files/upload",
      //     { file: image },
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   const data = response.data.location;
      //   imageFiles.push(data);
      // }

      // const productResponse = await axiosInstance.put(`products/${id}`, {
      //   ...update,
      //   images: imageFiles,
      // });
      const { images, ...productWithoutImages } = update;
      const productResponse = await axiosInstance.put(`products/${id}`, productWithoutImages);
      return productResponse.data;
    } catch (error: any) {
      const e = error as AxiosError;
      return e;
    }
  }
);

export const modifyProduct1 = createAsyncThunk(
  "modifyProduct",
  async ({ id, images, oldimages, update }: ModifyProductWithForm) => {
    try {
      let imageFiles: string[] = oldimages ? oldimages : []; //update.images;
      if (images) {
        for (let index = 0; index < images.length; index++) {
          const image = images[index];
          const response = await axiosInstance.post(
            "files/upload",
            { file: image },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const data = response.data.location;
          imageFiles.push(data);
        }
      }
      const productResponse = await axiosInstance.put(`products/${id}`, {
        ...update,
        images: imageFiles,
      });
      return productResponse.data;
    } catch (error: any) {
      const e = error as AxiosError;
      return e;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string) => {
    try {
      const productResponse = await axiosInstance.delete(`products/${id}`);
      // return productResponse.data;
      return id;
    } catch (error) {
      const e = error as AxiosError;
      return e;
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {
    /**manage sync process */
    sortByName: sortName,
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        state.productList = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        return state;
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        return state;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        state.productDetail = action.payload;
      })
      .addCase(fetchTotalProductsCount.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        state.count = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        state.productDetail = action.payload;
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        state.productDetail = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          return state;
        } else if (!action.payload) {
          return state;
        }
        state.productList = state.productList.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

const productReducer = productSlice.reducer;
export const { sortByName } = productSlice.actions;
export default productReducer;
