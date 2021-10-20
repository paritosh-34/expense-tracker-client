import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

interface MyInputProps<State> {
  value: string;
  label: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => void;
  name: keyof State;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  required?: boolean;
}

const MyInput = <T,>({
  value,
  label,
  onChange,
  name,
  error,
  helperText,
  placeholder = `Enter your ${label}`,
  required = true,
}: MyInputProps<T>) => (
  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={error}>
    <InputLabel>{label}</InputLabel>
    <OutlinedInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e, name)}
      required={required}
    />
    <FormHelperText hidden={!error} error={error}>
      {helperText}
    </FormHelperText>
  </FormControl>
);

export default MyInput;
