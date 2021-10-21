/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState, useEffect } from 'react';
import { FormControl, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

interface MyDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (e: Date | null) => void;
}

const MyDatePicker: FC<MyDatePickerProps> = ({ label, value, onChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;

      if (width <= 600 && !isMobile) setIsMobile(true);
      else if (width > 600 && isMobile) setIsMobile(false);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, [isMobile, setIsMobile]);

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <LocalizationProvider dateAdapter={DateAdapter}>
        {isMobile ? (
          <MobileDatePicker
            label={label}
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <DesktopDatePicker
            label={label}
            inputFormat="dd/MM/yyyy"
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </LocalizationProvider>
    </FormControl>
  );
};

export default MyDatePicker;
