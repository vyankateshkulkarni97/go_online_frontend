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

import { loginUser } from "../services/authApi";
import './css/Login.css';

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
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

            const data = await loginUser(form);

            localStorage.setItem(
                "access_token",
                data.access
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh
            );

            navigate("/");

        } catch (error) {

            console.error(error);

            setError(
                "Invalid username or password"
            );
        }
    };

    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >

            <Paper
                elevation={3}
                sx={{
                    width: 400,
                    padding: 4,
                }}
            >

                <Typography
                    variant="h4"
                    textAlign="center"
                    fontWeight="bold"
                    mb={3}
                >
                    Login
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
                        value={form.username}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>

                </form>

                <Typography
                    textAlign="center"
                    mt={3}
                >
                    Don't have an account?{" "}
                    <Link
                        component="button"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Register
                    </Link>
                </Typography>

            </Paper>

        </Box>
    );
}

export default Login;