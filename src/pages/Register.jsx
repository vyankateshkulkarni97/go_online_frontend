import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
} from "@mui/material";

import { registerUser } from "../services/authApi";


function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        // Basic validation
        if (!form.username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!form.first_name.trim()) {
            setError("First name is required.");
            return;
        }

        if (!form.last_name.trim()) {
            setError("Last name is required.");
            return;
        }

        if (!form.email.trim()) {
            setError("Email is required.");
            return;
        }

        if (!form.phone.trim()) {
            setError("Phone number is required.");
            return;
        }

        if (!form.password) {
            setError("Password is required.");
            return;
        }

        if (form.password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }


        try {

            setLoading(true);

            await registerUser(form);

            alert(
                "Registration successful. Please login."
            );

            navigate("/login");

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            const backendError =
                error.response?.data;

            if (backendError) {

                if (backendError.username) {

                    setError(
                        backendError.username[0]
                    );

                } else if (backendError.phone) {

                    setError(
                        backendError.phone[0]
                    );

                } else if (backendError.email) {

                    setError(
                        backendError.email[0]
                    );

                } else {

                    setError(
                        "Registration failed. Please check your details."
                    );

                }

            } else {

                setError(
                    "Unable to connect to the server."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <Box
            sx={{
                minHeight: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#f5fff8,#f5f7ff)",
                py: 5,
                px: 2,
            }}
        >

            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    padding: {
                        xs: 3,
                        sm: 4,
                    },
                    borderRadius: 3,
                }}
            >

                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    sx={{
                        color: "#0aad4b",
                        mb: 1,
                    }}
                >
                    QuickKart
                </Typography>


                <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight="bold"
                    mb={1}
                >
                    Create Account
                </Typography>


                <Typography
                    textAlign="center"
                    color="text.secondary"
                    mb={3}
                >
                    Create your account and start shopping
                </Typography>


                {error && (

                    <Box
                        sx={{
                            background: "#fff1f1",
                            border: "1px solid #ffcaca",
                            color: "#d32f2f",
                            borderRadius: 1.5,
                            padding: 1.5,
                            mb: 2,
                            fontSize: 14,
                        }}
                    >
                        {error}
                    </Box>

                )}


                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        required
                        label="Username"
                        name="username"
                        value={form.username}
                        margin="normal"
                        onChange={handleChange}
                    />


                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                            },
                            gap: 1.5,
                        }}
                    >

                        <TextField
                            fullWidth
                            required
                            label="First Name"
                            name="first_name"
                            value={form.first_name}
                            margin="normal"
                            onChange={handleChange}
                        />


                        <TextField
                            fullWidth
                            required
                            label="Last Name"
                            name="last_name"
                            value={form.last_name}
                            margin="normal"
                            onChange={handleChange}
                        />

                    </Box>


                    <TextField
                        fullWidth
                        required
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        margin="normal"
                        onChange={handleChange}
                    />


                    {/* IMPORTANT:
                        name must be "phone"
                    */}

                    <TextField
                        fullWidth
                        required
                        label="Phone"
                        name="phone"
                        value={form.phone}
                        margin="normal"
                        onChange={handleChange}
                        inputProps={{
                            maxLength: 15,
                        }}
                    />


                    <TextField
                        fullWidth
                        required
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        margin="normal"
                        onChange={handleChange}
                    />


                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                            mt: 3,
                            height: 48,
                            borderRadius: 2,
                            backgroundColor: "#0aad4b",
                            fontWeight: 700,
                            textTransform: "none",
                            fontSize: 16,
                            "&:hover": {
                                backgroundColor: "#078c3b",
                            },
                        }}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </Button>

                </form>


                <Typography
                    textAlign="center"
                    mt={3}
                    color="text.secondary"
                >
                    Already have an account?{" "}

                    <Link
                        component="button"
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                        sx={{
                            color: "#0aad4b",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </Link>

                </Typography>

            </Paper>

        </Box>
    );
}

export default Register;