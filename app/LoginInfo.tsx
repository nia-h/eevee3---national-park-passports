"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SubmitButton from './SubmitButton'

export default function LoginInfo() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField id="outlined-required" label="Email Address" variant="outlined" />
    <TextField id="outlined-required" label="Password" variant="outlined" />
    <SubmitButton/>
    </Box>
  );
}