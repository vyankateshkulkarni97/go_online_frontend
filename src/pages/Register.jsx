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

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(form);

            alert(
                "Registration successful. Please login."
            );

            navigate("/login");

        } catch (error) {

            console.error(error);

            setError(
                "Registration failed. Please check your details."
            );
        }
    };

    return (

        <Box
            sx={{
                minHeight: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
                py: 4,
            }}
        >

            <Paper
                elevation={3}
                sx={{
                    width: 450,
                    padding: 4,
                }}
            >

                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    mb={3}
                >
                    Create Account
                </Typography>

                {error && (
                    <Typography
                        color="error"
                        mb={2}
                    >
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        onChange={handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 3 }}
                    >
                        Register
                    </Button>

                </form>

                <Typography
                    textAlign="center"
                    mt={3}
                >
                    Already have an account?{" "}

                    <Link
                        component="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </Link>

                </Typography>

            </Paper>

        </Box>
    );
}

export default Register;