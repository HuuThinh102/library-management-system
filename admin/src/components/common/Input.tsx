'use client';
import { TextField, TextFieldProps } from '@mui/material';

type InputProps = TextFieldProps;

export default function Input(props: InputProps) {
    return <TextField variant="outlined" fullWidth {...props} />;
}