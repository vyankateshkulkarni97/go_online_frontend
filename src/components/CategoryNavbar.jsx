import {
    Box,
    Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategories } from "../services/categoryApi";
import './css/CategoryNavbar.css';

function CategoryNavbar() {

    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const loadCategories = async () => {

            try {

                const data =
                    await getCategories();

                setCategories(
                    data.results || data
                );

            } catch (error) {

                console.error(
                    "Category error:",
                    error
                );

            }

        };

        loadCategories();

    }, []);

    return (

        <Box
            sx={{
                display: "flex",
                overflowX: "auto",
                gap: 1,
                px: 2,
                py: 1,
                borderBottom: "1px solid #ddd",
                background: "#fff",

                "&::-webkit-scrollbar": {
                    height: 5,
                },
            }}
        >

            {categories.map((category) => (

                <Button
                    key={category.id}
                    sx={{
                        minWidth: 100,
                        whiteSpace: "nowrap",
                        color: "#222",
                    }}
                    onClick={() =>
                        navigate(
                            `/category/${category.id}`
                        )
                    }
                >

                    {category.name}

                </Button>

            ))}

        </Box>
    );
}

export default CategoryNavbar;