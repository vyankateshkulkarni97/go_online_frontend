import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import './css/ProductCard.css';

function ProductCard({ product }) {

    const navigate = useNavigate();

    const discount = product.mrp
        ? Math.round(
            ((product.mrp -
                product.selling_price) /
                product.mrp) *
            100
        )
        : 0;

    return (

        <Card
            sx={{
                width: 220,
                minWidth: 220,
                borderRadius: 2,
                cursor: "pointer",
                transition: "0.2s",

                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4,
                },
            }}
            onClick={() =>
                navigate(
                    `/products/${product.id}`
                )
            }
        >

            <CardMedia
                component="img"
                height="180"
                image={
                    product.images?.length
                        ? product.images[0].image
                        : "https://via.placeholder.com/300"
                }
                alt={product.name}
                sx={{
                    objectFit: "contain",
                    p: 2,
                }}
            />

            <CardContent>

                <Typography
                    variant="body1"
                    fontWeight="bold"
                    noWrap
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    {product.unit || ""}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        mt: 1,
                    }}
                >

                    <Typography fontWeight="bold">
                        ₹{product.selling_price}
                    </Typography>

                    {product.mrp >
                        product.selling_price && (

                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration:
                                    "line-through",
                                color: "gray",
                            }}
                        >
                            ₹{product.mrp}
                        </Typography>

                    )}

                </Box>

                {discount > 0 && (

                    <Typography
                        variant="caption"
                        color="green"
                    >
                        {discount}% OFF
                    </Typography>

                )}

                <Button
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                >
                    Add
                </Button>

            </CardContent>

        </Card>
    );
}

export default ProductCard;