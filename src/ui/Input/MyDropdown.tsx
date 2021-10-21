import { TextField, FormControl } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { IOption } from '@interfaces/';

interface MyDropdownProps<State> {
  label: string;
  value: string;
  options: IOption[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => void;
  name: keyof State;
}

const MyDropdown = <T,>({ label, value, options, onChange, name }: MyDropdownProps<T>) => {
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <TextField select label={label} value={value} onChange={(e) => onChange(e, name)} required>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default MyDropdown;
