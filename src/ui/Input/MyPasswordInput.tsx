import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface MyPasswordInputProps<State> {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => void;
  error: boolean;
  name: keyof State;
  helperText: string;
}

const MyPasswordInput = <T,>({
  value,
  onChange,
  error,
  name,
  helperText,
}: MyPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={error}>
      <InputLabel>Password</InputLabel>
      <OutlinedInput
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        value={value}
        onChange={(e) => onChange(e, name)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        required
      />
      <FormHelperText hidden={!error} error={error} style={{ whiteSpace: 'pre-wrap' }}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default MyPasswordInput;
