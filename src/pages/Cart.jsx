import {
    Box,
    Typography,
    Button,
} from "@mui/material";

import {
    ShoppingCart,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import './css/Cart.css';

function Cart() {

    const navigate = useNavigate();

    return (

        <Box
            sx={{
                px: {
                    xs: 2,
                    md: 5,
                },
                py: 5,
                textAlign: "center",
            }}
        >

            <ShoppingCart
                sx={{
                    fontSize: 80,
                    color: "gray",
                }}
            />

            <Typography
                variant="h4"
                fontWeight="bold"
                mt={2}
            >
                Your Cart
            </Typography>

            <Typography
                color="text.secondary"
                mt={1}
            >
                Your cart is currently empty.
            </Typography>

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() =>
                    navigate("/products")
                }
            >
                Continue Shopping
            </Button>

        </Box>
    );
}

export default Cart;