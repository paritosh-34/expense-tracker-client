import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

interface MyMoneyInputProps<State> {
  value: string;
  label: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => void;
  name: keyof State;
  error?: boolean;
  placeholder?: string;
  helperText?: string;
}

const MyMoneyInput = <T,>({
  value,
  label,
  onChange,
  name,
  error = false,
  placeholder = `Enter your ${label}`,
  helperText = '',
}: MyMoneyInputProps<T>) => {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={error}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        type="number"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e, name)}
        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
        required
      />
      <FormHelperText hidden={!error} error={error}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default MyMoneyInput;
