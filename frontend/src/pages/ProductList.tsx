import {
  Box,
  Button,
  Drawer,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { ListTableColumn, Product, ProductPagination } from "../types/product";
import React, { useEffect, useState } from "react";
import {
  deleteProduct,
  fetchAllProducts,
  fetchTotalProductsCount,
} from "../redux/reducers/productReducer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import AddIcon from "@mui/icons-material/Add";
import { AxiosError } from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import ProductAddDrawer from "../components/product/ProductAddDrawer";
import ProductEditDrawer from "../components/product/ProductEditDrawer";
import { toast } from "react-hot-toast";

const columns: readonly ListTableColumn[] = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

const ProductList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDrawerAdd, setOpenDrawerAdd] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  const dispatch = useAppDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleProductAdd = async () => {
    setOpenDrawerAdd(true);
  };

  const handleProductEdit = async (id: string, product: Product) => {
    setOpenDrawerEdit(true);
    setEditProduct(product);
  };
  const handleProductDelete = async (id: string) => {
    await dispatch(deleteProduct(id))
      .then((res) => {
        if (res.payload instanceof AxiosError) {
          toast.error(res.payload.response?.data.message);
        } else {
          toast.success("Product deleted successfully.");
        }
      })
      .catch((err) => console.log(err));
  };

  const renderProductAddDrawer = (
    <Drawer
      open={openDrawerAdd}
      anchor={"right"}
      onClose={() => setOpenDrawerAdd(false)}
    >
      <ProductAddDrawer handleDrawer={setOpenDrawerAdd} />
    </Drawer>
  );

  const renderProductEditDrawer = (
    <Drawer
      open={openDrawerEdit}
      anchor={"right"}
      onClose={() => setOpenDrawerEdit(false)}
    >
      <ProductEditDrawer
        handleDrawer={setOpenDrawerEdit}
        product={editProduct}
      />
    </Drawer>
  );

  const productRes = useAppSelector((state) => state.productReducer);

  const fetchProductList = () => {
    const offset = page * rowsPerPage;
    let filterOptions: ProductPagination = {
      offset: offset,
      limit: rowsPerPage,
    };
    dispatch(fetchAllProducts(filterOptions));
  };

  useEffect(() => {
    fetchProductList();
  }, [page, rowsPerPage]);

  useEffect(() => {
    dispatch(fetchTotalProductsCount({}));
  }, []);

  return (
    <Box>
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleProductAdd()}
        >
          Add Product
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    fontWeight: "600",
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "rgba(96, 96, 96)",
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productRes.productList.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>
                      <Typography
                        variant="body2"
                        component={Link}
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          fontWeight: 600,
                        }}
                        to={`/products/${row.id}`}
                      >
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.category.name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.price.toLocaleString("en-US")}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleProductEdit(row.id, row)}
                        >
                          <BorderColorIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleProductDelete(row.id)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productRes.count ? productRes.count : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
        />
        {renderProductAddDrawer}
        {renderProductEditDrawer}
      </Paper>
    </Box>
  );
};

export default ProductList;
