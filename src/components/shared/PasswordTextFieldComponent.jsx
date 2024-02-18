import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const PasswordTextFieldComponent = ({ register, name, rules, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <TextField
      {...register(name, rules)}
      label="Password"
      type={showPassword ? 'text' : 'password'}
      error={!!error}
      helperText={error?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={togglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};