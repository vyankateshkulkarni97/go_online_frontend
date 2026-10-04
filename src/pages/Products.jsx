import {
    Box,
    Typography,
    TextField,
    Grid,
    CircularProgress,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

import {
    useSearchParams,
} from "react-router-dom";

import {
    getProducts,
    searchProducts,
} from "../services/productApi";

import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const initialSearch =
        searchParams.get("search") || "";

    const [search, setSearch] =
        useState(initialSearch);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            setLoading(true);

            const data = search
                ? await searchProducts(search)
                : await getProducts();

            setProducts(
                data.results || data
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const handleSearch = (e) => {

        setSearch(e.target.value);

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            if (search) {
                setSearchParams({
                    search,
                });
            } else {
                setSearchParams({});
            }

            loadProducts();

        }

    };

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
                mb={3}
            >
                All Products
            </Typography>

            <TextField
                fullWidth
                placeholder="Search products..."
                value={search}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                sx={{
                    maxWidth: 600,
                    mb: 4,
                }}
            />

            {loading ? (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "center",
                    }}
                >
                    <CircularProgress />
                </Box>

            ) : (

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

            )}

        </Box>
    );
}

export default Products;