import {
    Box,
    Button,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";

import { getCategories } from "../services/categoryApi";
import './css/CategoryNavbar.css';


function CategoryNavbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const categories = [
        {
            name: "Fashion",
            slug: "fashion",
            icon: "👗",
        },
        {
            name: "Mobiles",
            slug: "mobiles",
            icon: "📱",
        },
        {
            name: "Electronics",
            slug: "electronics",
            icon: "💻",
        },
        {
            name: "Beauty",
            slug: "beauty",
            icon: "💄",
        },
        {
            name: "Home",
            slug: "home",
            icon: "🏠",
        },
        {
            name: "Appliances",
            slug: "appliances",
            icon: "🧊",
        },
        {
            name: "Toys, Baby & Kids",
            slug: "toys-baby-kids",
            icon: "🧸",
        },
        {
            name: "Food & Health",
            slug: "food-health",
            icon: "🥗",
        },
        {
            name: "Auto Accessories",
            slug: "auto-accessories",
            icon: "🚗",
        },
        {
            name: "Sports & Fitness",
            slug: "sports-fitness",
            icon: "🏋️",
        },
        {
            name: "Furniture",
            slug: "furniture",
            icon: "🛋️",
        },
        {
            name: "Books",
            slug: "books",
            icon: "📚",
        },
    ];

    const handleCategoryClick = (category) => {

        navigate(`/category/${category.slug}`);

    };


    return (
        <nav className="category-navbar">

            <div className="category-navbar-container">

                {categories.map((category) => {

                    // Check currently selected category
                    const isActive =
                        location.pathname ===
                        `/category/${category.slug}`;

                    return (
                        <button
                            key={category.slug}
                            className={`category-navbar-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleCategoryClick(category)
                            }
                        >

                            <span className="category-icon">
                                {category.icon}
                            </span>

                            <span>
                                {category.name}
                            </span>

                        </button>
                    );

                })}

            </div>

        </nav>
    );
}

export default CategoryNavbar;