import {
    Box,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    getProduct,
} from "../services/productApi";

import './css/ProductDetails.css';

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] =
        useState(null);

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const data =
                    await getProduct(id);

                setProduct(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadProduct();

    }, [id]);

    if (!product) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
                    mt: 10,
                }}
            >

                <CircularProgress />

            </Box>
        );
    }

    return (

        <Box
            sx={{
                display: "flex",
                gap: 5,
                px: {
                    xs: 2,
                    md: 8,
                },
                py: 5,
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
            }}
        >

            <Box
                sx={{
                    width: {
                        xs: "100%",
                        md: "45%",
                    },
                }}
            >

                <img
                    src={
                        product.images?.length
                            ? product.images[0].image
                            : "https://via.placeholder.com/500"
                    }
                    alt={product.name}
                    style={{
                        width: "100%",
                        height: 450,
                        objectFit: "contain",
                    }}
                />

            </Box>


            <Box
                sx={{
                    width: {
                        xs: "100%",
                        md: "45%",
                    },
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    {product.name}
                </Typography>

                <Typography
                    sx={{
                        mt: 2,
                        color: "text.secondary",
                    }}
                >
                    {product.description}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ mt: 3 }}
                >
                    ₹{product.selling_price}
                </Typography>

                <Typography
                    sx={{
                        textDecoration:
                            "line-through",
                        color: "gray",
                    }}
                >
                    ₹{product.mrp}
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    sx={{ mt: 4 }}
                >
                    Add to Cart
                </Button>

            </Box>

        </Box>
    );
}

export default ProductDetails;