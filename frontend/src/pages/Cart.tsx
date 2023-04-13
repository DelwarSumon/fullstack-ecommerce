import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  decreaseCartItem,
  deleteCartItem,
  emptyCartItem,
  increaseCartItem,
} from "../redux/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  console.log("cartItems - ", cartItems)

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const handleDecreaseCart = (id: string) => {
    dispatch(decreaseCartItem(id));
  };
  const handleIncreaseCart = (id: string) => {
    dispatch(increaseCartItem(id));
  };
  const handleDeleteCart = (id: string) => {
    dispatch(deleteCartItem(id));
  };
  const handleEmptyCart = () => {
    dispatch(emptyCartItem());
  };

  return (
    <Grid container className="page-cart" sx={{ mt: 2 }} spacing={2}>
      <Grid item sm={12} md={9}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6">Your Cart</Typography>
            <Typography
              variant="subtitle2"
              sx={{ pb: 1 }}
            >{`${cartItems.count} items in cart`}</Typography>
          </Box>
          <Box>
            {cartItems.count > 0 && (
              <Button
                variant="outlined"
                color={"error"}
                sx={{ ml: 1, mb: 1 }}
                onClick={() => handleEmptyCart()}
              >
                Empty Cart
              </Button>
            )}
          </Box>
        </Box>

        {cartItems.items &&
          cartItems.items.map((cart) => (
            <Box
              key={cart.id}
              sx={{
                flexGrow: 1,
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item sm={1} md={1}>
                  <Box sx={{ width: 60, height: 60 }}>
                    <Img
                      alt="Product Image"
                      src={`${
                        cart.product.images[0] ? cart.product.images[0].url : "../../../no-product.png"
                      }`}
                    />
                  </Box>
                </Grid>
                <Grid item sm={6} md={6}>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        sx={{ color: "inherit", textDecoration: "none" }}
                        component={Link}
                        to={`/products/${cart.product.id}`}
                      >
                        {cart.product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cart.product.category.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item sm={1} md={1}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ ml: 1 }}
                  >
                    ${cart.product.price}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                  sm={2}
                  md={2}
                  sx={{ display: "flex", alignItems: "flex-start" }}
                >
                  <Tooltip title="Decrease Item">
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleDecreaseCart(cart.product.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    disabled
                    type={"number"}
                    variant="outlined"
                    size="small"
                    value={cart.count}
                    sx={{ input: { textAlign: "center" } }}
                  />
                  <Tooltip title="Increase Item">
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleIncreaseCart(cart.product.id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item sm={1} md={1}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ ml: 1 }}
                  >
                    ${(cart.product.price * cart.count).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item sm={1} md={1}>
                  <Tooltip title="Delete Item">
                    <IconButton
                      size="small"
                      color="inherit"
                      sx={{ ml: 1 }}
                      onClick={() => handleDeleteCart(cart.product.id)}
                    >
                      <CloseIcon color={"error"} />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          ))}
      </Grid>

      <Grid item sm={12} md={3}>
        {cartItems.count > 0 && (
          <Box
            className="page-cart__summary"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#eae8e8",
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ py: 2 }}>
                Summary
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                minHeight: 100,
              }}
            >
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                Products
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                ${cartItems.total}{" "}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                minHeight: 80,
              }}
            >
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h6">${cartItems.total} </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color={"success"}
                sx={{ ml: 1, mb: 1 }}
                endIcon={<EastIcon />}
              >
                Checkout
              </Button>

              <Button
                variant="outlined"
                component={Link}
                to={"/products"}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Cart;
