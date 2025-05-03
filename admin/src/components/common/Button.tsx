'use client';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

interface ButtonProps extends MuiButtonProps {
    name: string
}

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <MuiButton variant="contained" {...props}>
            {children}
        </MuiButton>
    );
}