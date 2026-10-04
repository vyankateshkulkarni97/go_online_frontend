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
                    gap: 2,
                    px: {
                        xs: 2,
                        md: 5,
                    },
                }}
            >

                {/* LOGO */}

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        cursor: "pointer",
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
                        maxWidth: 600,
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
                                e.target.value
                            ) {

                                navigate(
                                    `/products?search=${e.target.value}`
                                );

                            }

                        }}
                    />

                </Box>


                {/* LOGIN */}

                {!isLoggedIn ? (

                    <Button
                        color="inherit"
                        onClick={() =>
                            navigate("/login")
                        }
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

            </Toolbar>

        </AppBar>
    );
}

export default Navbar;