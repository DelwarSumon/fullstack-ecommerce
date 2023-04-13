import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  deleteCartItem,
  emptyCartItem,
} from "../../redux/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";

import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const DrawerCart = (props: any) => {
  const cartItems = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  const handleDeleteCart = (id: string) => {
    dispatch(deleteCartItem(id));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCartItem());
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <Box sx={{ width: "100%", minWidth: 400, p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Your Cart</Typography>
        <Tooltip title="Close">
          <IconButton color="primary" onClick={() => props.setOpenCart(false)}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Typography variant="subtitle2">{`${cartItems.count} items in cart`}</Typography>
      <Typography
        variant="subtitle2"
        sx={{ pb: 1 }}
      >{`Total amount $${cartItems.total} `}</Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          component={Link}
          to={"/cart"}
          onClick={() => props.setOpenCart(false)}
        >
          View/Edit Cart
        </Button>
        {cartItems.count > 0 && (
          <Button
            variant="outlined"
            color={"error"}
            sx={{ ml: 1 }}
            onClick={() => handleEmptyCart()}
          >
            Empty Cart
          </Button>
        )}
      </Box>
      <Divider sx={{ my: 2 }} />
      {cartItems.items &&
        cartItems.items.map((cart) => (
          <Paper
            key={cart.id}
            sx={{
              px: 2,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Box sx={{ width: 60, height: 60 }}>
                  <Img alt="Image" src={`${cart.product.images[0] ? cart.product.images[0].url : "../../../no-product.png"}`} />
                </Box>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      sx={{ color: "inherit", textDecoration: "none" }}
                      component={Link}
                      to={`/products/${cart.product.id}`}
                      onClick={() => props.setOpenCart(false)}
                    >
                      {cart.product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {cart.product.category.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ ml: 1 }}
                  >
                    ${cart.product.price * cart.count}
                  </Typography>
                </Grid>
                <Grid item>
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
            </Grid>
          </Paper>
        ))}
    </Box>
  );
};

export default DrawerCart;
