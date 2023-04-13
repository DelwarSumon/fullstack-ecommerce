import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import { CartButton } from "../../types/cart";
import { addToCart } from "../../redux/reducers/cartReducer";
import { useAppDispatch } from "../../hooks/reduxHook";

const AddToCartButton = ({ product, id }: CartButton) => {
  const dispatch = useAppDispatch();

  // const products = useAppSelector((state) => state.cartReducer);
  // console.log("products cart - ", products)

  const handleCart = async () => {
    const item = {
      id,
      product,
    };
    dispatch(addToCart(item as CartButton));
  };

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() => handleCart()}
      startIcon={<AddShoppingCartIcon />}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
