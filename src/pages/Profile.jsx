import {
    Box,
    Typography,
} from "@mui/material";

function Profile() {

    return (

        <Box
            sx={{
                px: {
                    xs: 2,
                    md: 5,
                },
                py: 5,
            }}
        >

            <Typography
                variant="h4"
                fontWeight="bold"
            >
                My Profile
            </Typography>

            <Typography
                sx={{ mt: 2 }}
            >
                Profile information will appear here.
            </Typography>

        </Box>
    );
}

export default Profile;