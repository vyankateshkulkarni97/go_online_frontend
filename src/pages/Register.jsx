import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    MenuItem,
} from "@mui/material";

import { registerUser } from "../services/authApi";
import "./css/Register.css";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        role: "CUSTOMER",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));

        setError("");
    };

    // Validate form
    const validateForm = () => {
        if (!form.username.trim()) {
            return "Username is required.";
        }

        if (!form.first_name.trim()) {
            return "First name is required.";
        }

        if (!form.last_name.trim()) {
            return "Last name is required.";
        }

        if (!form.email.trim()) {
            return "Email is required.";
        }

        if (!form.phone.trim()) {
            return "Phone number is required.";
        }

        if (!/^[0-9]{10,15}$/.test(form.phone)) {
            return "Please enter a valid phone number.";
        }

        if (!form.password) {
            return "Password is required.";
        }

        if (form.password.length < 6) {
            return "Password must contain at least 6 characters.";
        }

        if (!form.role) {
            return "Please select a role.";
        }

        return "";
    };

    // Submit registration
    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            const response = await registerUser(form);

            console.log("Registration response:", response);

            alert("Registration successful!");

            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);

            const responseData = error.response?.data;

            // Backend validation errors
            if (responseData?.errors) {
                const errors = responseData.errors;

                if (errors.username) {
                    setError(errors.username[0]);
                } else if (errors.email) {
                    setError(errors.email[0]);
                } else if (errors.phone) {
                    setError(errors.phone[0]);
                } else if (errors.first_name) {
                    setError(errors.first_name[0]);
                } else if (errors.last_name) {
                    setError(errors.last_name[0]);
                } else if (errors.password) {
                    setError(errors.password[0]);
                } else if (errors.role) {
                    setError(errors.role[0]);
                } else {
                    setError("Registration failed.");
                }
            } else if (responseData?.message) {
                setError(responseData.message);
            } else if (responseData?.detail) {
                setError(responseData.detail);
            } else {
                setError("Unable to connect to the server.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="register-page">

            <Paper className="register-card" elevation={5}>

                {/* Logo */}
                <Typography
                    variant="h4"
                    className="register-logo"
                >
                    QuickKart
                </Typography>

                {/* Heading */}
                <Typography
                    variant="h5"
                    className="register-title"
                >
                    Create Account
                </Typography>

                <Typography
                    className="register-subtitle"
                >
                    Create your account and start shopping
                </Typography>

                {/* Error */}
                {error && (
                    <Box className="register-error">
                        {error}
                    </Box>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>

                    {/* Username */}
                    <TextField
                        fullWidth
                        required
                        label="Username"
                        name="username"
                        value={form.username}
                        margin="normal"
                        onChange={handleChange}
                        autoComplete="username"
                    />

                    {/* First + Last Name */}
                    <Box className="name-row">

                        <TextField
                            fullWidth
                            required
                            label="First Name"
                            name="first_name"
                            value={form.first_name}
                            margin="normal"
                            onChange={handleChange}
                            autoComplete="given-name"
                        />

                        <TextField
                            fullWidth
                            required
                            label="Last Name"
                            name="last_name"
                            value={form.last_name}
                            margin="normal"
                            onChange={handleChange}
                            autoComplete="family-name"
                        />

                    </Box>

                    {/* Email */}
                    <TextField
                        fullWidth
                        required
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        margin="normal"
                        onChange={handleChange}
                        autoComplete="email"
                    />

                    {/* Phone */}
                    <TextField
                        fullWidth
                        required
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        margin="normal"
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 15,
                        }}
                        autoComplete="tel"
                    />

                    {/* Password */}
                    <TextField
                        fullWidth
                        required
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        margin="normal"
                        onChange={handleChange}
                        autoComplete="new-password"
                    />

                    {/* Role */}
                    <TextField
                        fullWidth
                        required
                        select
                        label="Role"
                        name="role"
                        value={form.role}
                        margin="normal"
                        onChange={handleChange}
                    >
                        <MenuItem value="CUSTOMER">
                            Customer
                        </MenuItem>

                        <MenuItem value="ADMIN">
                            Admin
                        </MenuItem>

                        <MenuItem value="STORE_MANAGER">
                            Store Manager
                        </MenuItem>

                        <MenuItem value="DELIVERY_PARTNER">
                            Delivery Partner
                        </MenuItem>
                    </TextField>

                    {/* Register Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        className="register-button"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </Button>

                </form>

                {/* Login */}
                <Typography
                    className="login-text"
                >
                    Already have an account?{" "}

                    <Link
                        component="button"
                        type="button"
                        onClick={() => navigate("/login")}
                        className="login-link"
                    >
                        Login
                    </Link>
                </Typography>

            </Paper>

        </Box>
    );
}

export default Register;