import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Badge,
    InputBase,
    Menu,
    MenuItem,
} from "@mui/material";

import {
    ShoppingCart,
    Search,
    AccountCircle,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './css/Navbar.css';

function Navbar() {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const isLoggedIn =
        !!localStorage.getItem("access_token");

    const handleLogout = () => {

        localStorage.removeItem(
            "access_token"
        );

        localStorage.removeItem(
            "refresh_token"
        );

        navigate("/login");
    };

    return (

        <AppBar
            position="sticky"
            color="default"
            elevation={1}
        >

<Toolbar
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
    }}
>

    {/* LOGO */}
    <Typography
        variant="h6"
        sx={{
            fontWeight: "bold",
            color: "#0aad4b",
            cursor: "pointer",
            whiteSpace: "nowrap",
        }}
        onClick={() => navigate("/")}
    >
        QuickKart
    </Typography>


    {/* SEARCH */}
    <Box
        sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            background: "#f3f3f3",
            borderRadius: 2,
            px: 2,
            height: 42,
            maxWidth: 600,
            ml: 2,
        }}
    >

        <Search />

        <InputBase
            placeholder="Search products..."
            sx={{
                ml: 1,
                width: "100%",
            }}
            onKeyDown={(e) => {

                if (
                    e.key === "Enter" &&
                    e.target.value.trim()
                ) {
                    navigate(
                        `/products?search=${encodeURIComponent(
                            e.target.value.trim()
                        )}`
                    );
                }

            }}
        />

    </Box>


    {/* RIGHT SIDE */}
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: "auto",
        }}
    >

        {/* LOGIN / PROFILE */}
        {!isLoggedIn ? (

            <Button
                color="inherit"
                onClick={() =>
                    navigate("/login")
                }
                sx={{
                    whiteSpace: "nowrap",
                }}
            >
                Login
            </Button>

        ) : (

            <>
                <IconButton
                    onClick={(e) =>
                        setAnchorEl(e.currentTarget)
                    }
                >
                    <AccountCircle />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() =>
                        setAnchorEl(null)
                    }
                >

                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            navigate("/profile");
                        }}
                    >
                        Profile
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            navigate("/orders");
                        }}
                    >
                        Orders
                    </MenuItem>

                    <MenuItem
                        onClick={handleLogout}
                    >
                        Logout
                    </MenuItem>

                </Menu>
            </>

        )}


        {/* MORE */}
        <Button
            color="inherit"
            onClick={() =>
                navigate("/products")
            }
            sx={{
                whiteSpace: "nowrap",
            }}
        >
            More
        </Button>


        {/* CART */}
        <IconButton
            onClick={() =>
                navigate("/cart")
            }
        >

            <Badge
                badgeContent={0}
                color="error"
            >
                <ShoppingCart />
            </Badge>

        </IconButton>

    </Box>

</Toolbar>

        </AppBar>
    );
}

export default Navbar;