'use client';

import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingProps {
    size?: number;
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
    return (
        <Box
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            <CircularProgress color="primary" size={size} />
            <Typography variant='subtitle2' sx={{ mr: 2 }}>
                Loading...
            </Typography>
        </Box>
    );
}

export default Loading;