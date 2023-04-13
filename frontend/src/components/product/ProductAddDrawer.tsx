import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import { CreateProduct, CreateProductWithForm } from "../../types/product";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { AxiosError } from "axios";
import { Category } from "../../types/category";
import CloseIcon from "@mui/icons-material/Close";
import { createProduct } from "../../redux/reducers/productReducer";
import { fetchAllCatagory } from "../../redux/reducers/categoryReducer";
import { productSchema } from "../../validations/productSchema";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../hooks/reduxHook";
import { yupResolver } from "@hookform/resolvers/yup";

const ProductAddDrawer = (props: any) => {
  const { handleDrawer } = props;
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProduct>({
    resolver: yupResolver(productSchema),
  });
  const onsubmit: SubmitHandler<CreateProduct> = async (data) => {
    const formData: CreateProductWithForm = {
      imageList: data.images,
      product: data,
    };
    await dispatch(createProduct(formData))
      .then((res) => {
        if (res.payload instanceof AxiosError) {
          toast.error(res.payload.message);
        } else {
          handleDrawer(false);
          toast.success("Product added successfully.");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(fetchAllCatagory())
      .then((res) => {
        const resData: Category[] | any = res.payload;
        if (resData instanceof AxiosError) {
          console.log("Error in Category - ", resData.response?.data.message);
          // toast.error(`Error - ${resData.response?.data.message}`);
          setCategoryList([]);
        } else {
          setCategoryList(resData);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h5" component="div">
          New Product
        </Typography>
        <Tooltip title="Close">
          <IconButton color="primary" onClick={() => handleDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />

      <Box sx={{ p: 2 }}>
        <form onSubmit={handleSubmit(onsubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Title"
            autoFocus
            {...register("title")}
            error={errors.title ? true : false}
            helperText={errors.title?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Description"
            type="text"
            {...register("description")}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Price"
            type="number"
            {...register("price")}
            error={errors.price ? true : false}
            helperText={errors.price?.message}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              defaultValue={""}
              {...register("categoryId")}
              error={errors.categoryId ? true : false}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categoryList &&
                categoryList.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText
              sx={{ mb: 2 }}
              error={errors.categoryId ? true : false}
            >
              {errors.categoryId?.message}
            </FormHelperText>
          </FormControl>

          {/* <Button component="label" variant="outlined" sx={{ mr: 2, py: 2 }}>
            <input
              type="file"
              accept="image/*"
              {...register("images")}
              multiple
            />
          </Button>
          <FormHelperText sx={{ mb: 2 }} error={errors.images ? true : false}>
            {errors.images?.message}
          </FormHelperText> */}

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Images"
            autoFocus
            {...register("images")}
            error={errors.images ? true : false}
            helperText={errors.images?.message}
          />

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProductAddDrawer;
