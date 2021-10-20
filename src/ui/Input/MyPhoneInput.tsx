import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

interface MyPhoneInputProps<State> {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => void;
  error: boolean;
  name: keyof State;
}

const MyPhoneInput = <T,>({ value, onChange, error, name }: MyPhoneInputProps<T>) => {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={error}>
      <InputLabel>Phone</InputLabel>
      <OutlinedInput
        type="number"
        label="Phone"
        placeholder="Enter your phone"
        value={value}
        onChange={(e) => onChange(e, name)}
        startAdornment={<InputAdornment position="start">+91</InputAdornment>}
        required
      />
      <FormHelperText hidden={!error} error={error}>
        Number must be 10 digits
      </FormHelperText>
    </FormControl>
  );
};

export default MyPhoneInput;
