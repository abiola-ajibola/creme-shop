import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, Rating } from "@mui/material";
import StyledLink from "./StyledLink";

export type ProductProps = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

// In the product page, include wishlist button and quantity

export default function ProductCard({ product }: { product: ProductProps }) {
  const { price, image, name, _id, rating, numReviews } = product;
  return (
    <Card sx={{ margin: "1rem 0rem" }}>
      <StyledLink href={`/product/${_id}`}>
        <Image width={640} height={510} src={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <strong>{name}</strong>
          </Typography>
          <Typography
            sx={{ display: "flex", marginBottom: "0.5rem" }}
            variant="body1"
            color="text.secondary"
          >
            <Rating readOnly precision={0.1} value={rating} />{" "}
            <Box component={"span"} sx={{ paddingLeft: "1rem" }}>
              {numReviews} reviews
            </Box>
          </Typography>
          <Typography variant="h4">${price}</Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </StyledLink>
    </Card>
  );
}
