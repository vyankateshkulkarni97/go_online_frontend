import {
    Box,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";

import {
    getCategories,
} from "../services/categoryApi";

import {
    getProducts,
} from "../services/productApi";

import ProductCard from "../components/ProductCard";
import './css/Home.css';

import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [categories, setCategories] =
        useState([]);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadData = async () => {

            try {

                const [
                    categoryData,
                    productData,
                ] = await Promise.all([
                    getCategories(),
                    getProducts(),
                ]);

                setCategories(
                    categoryData.results ||
                    categoryData
                );

                setProducts(
                    productData.results ||
                    productData
                );

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, []);

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 10,
                }}
            >
                <CircularProgress />
            </Box>

        );
    }

    return (

        <Box>

            {/* HERO */}

            <Box
    className="home-hero"
    sx={{
        mx: {
            xs: 2,
            md: 5,
        },
        mt: 3,
        borderRadius: 3,
        minHeight: 280,
        display: "flex",
        alignItems: "center",
        px: {
            xs: 3,
            md: 8,
        },
        background:
            "linear-gradient(90deg,#e8f5e9,#fff3e0)",
    }}
>
    <Box className="home-hero-content">

        <Typography
            className="home-hero-title"
            variant="h3"
            fontWeight="bold"
        >
            Everything you need,
            delivered fast.
        </Typography>

        <Typography
            className="home-hero-subtitle"
            variant="h6"
        >
            Shop groceries,
            electronics, fashion
            and more.
        </Typography>

        <Button
            className="home-shop-button"
            variant="contained"
            onClick={() => navigate("/products")}
        >
            Shop Now
        </Button>

    </Box>
</Box>


            {/* CATEGORIES */}

            <Box className="home-category-container">

    {categories.map((category) => (
        <Box
            key={category.id}
            className="home-category-card"
            onClick={() =>
                navigate(`/category/${category.id}`)
            }
        >
            <Typography className="home-category-name">
                {category.name}
            </Typography>
        </Box>
    ))}

</Box>


            {/* PRODUCTS */}

            <Box className="home-products-container">

    {products
        .slice(0, 10)
        .map((product) => (
            <ProductCard
                key={product.id}
                product={product}
            />
        ))}

</Box>
<Button
    className="home-view-all"
    onClick={() => navigate("/products")}
>
    View All
</Button>
        </Box>
    );
}

export default Home;