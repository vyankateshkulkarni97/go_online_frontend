import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import CategoryNavbar from "./components/CategoryNavbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import './App.css'

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <CategoryNavbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/category/:id"
                    element={<Category />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;