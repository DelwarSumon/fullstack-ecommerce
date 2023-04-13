import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";
import { ProductDetail } from "../../types/product";

const ProductBox = ({ info }: ProductDetail) => {
 
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={(info.images && info.images[0]) ? info.images[0].url : "../../../no-product.png"}
        title="green iguana"
      />
      <CardContent>
        <Typography
          sx={{
            height: 32,
            whiteSpace: "nowrap",
            overflow: "hidden",
            color: "inherit",
            textDecoration: "none",
          }}
          gutterBottom
          variant="h6"
          component={Link}
          to={`/products/${info.id}`}
        >
          {info.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          ${info.price}
        </Typography>
        <Typography
          sx={{ height: 60, overflow: "hidden" }}
          variant="body2"
          color="text.secondary"
        >
          {info.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-evenly" }}>
        <AddToCartButton product={info} id={info.id} />
      </CardActions>
    </Card>
  );
};
export default ProductBox;
