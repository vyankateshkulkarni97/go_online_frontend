import {
    Box,
    Typography,
    Grid,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    getProductsByCategory,
} from "../services/productApi";

import ProductCard from "../components/ProductCard";
import './css/Category.css';

function Category() {

    const { id } = useParams();

    const [products, setProducts] =
        useState([]);

    useEffect(() => {

        const loadProducts = async () => {

            try {

                const data =
                    await getProductsByCategory(
                        id
                    );

                setProducts(
                    data.results || data
                );

            } catch (error) {

                console.error(error);

            }

        };

        loadProducts();

    }, [id]);

    return (

        <Box
            sx={{
                px: {
                    xs: 2,
                    md: 5,
                },
                py: 4,
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                Category Products
            </Typography>

            <Grid
                container
                spacing={3}
            >

                {products.map(
                    (product) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={product.id}
                        >

                            <ProductCard
                                product={product}
                            />

                        </Grid>

                    )
                )}

            </Grid>

        </Box>
    );
}

export default Category;