'use client';

import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingProps {
    size?: number;
    text?: string;
}

const Loading: React.FC<LoadingProps> = ({ size, text }) => {
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
                {text}
            </Typography>
        </Box>
    );
}

export default Loading;