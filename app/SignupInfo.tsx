"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import InputAdornment from '../components/InputAdornment';
import SubmitButton from './SubmitButton';



export default function SignupTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <TextField id="outlined" label="First Name" variant="outlined" />
    <TextField id="outlined" label="Last Name" variant="outlined" />
    <TextField id="outlined" label="Email Address" variant="outlined" />
    <TextField id="outlined" label="Password" variant="outlined" />
    {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"> */}
      {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
      {/* <OutlinedInput
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl> */}
    <TextField id="outlined" label="ZIP Code" variant="outlined" />  

    <SubmitButton/>
    </Box>
  );
};