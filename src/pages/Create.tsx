import { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { grey } from '@mui/material/colors';
import { AppContext } from '@store/context';
import { endpoints } from '@constants/apiEndpoints';
import states from '@constants/states';
import apiService from '@services/apiService';
import showToast from '@utils/showToast';
import MyInput from '@ui/Input/MyInput';
import Logo from '@ui/Logo';
import MyDatePicker from '@ui/Input/MyDatePicker';
import MyMoneyInput from '@ui/Input/MyMoneyInput';
import MyDropdown from '@ui/Input/MyDropdown';

interface State {
  date: Date | null;
  title: string;
  expense: string;
  state: string;
}

const Create: FC = () => {
  const { state } = useContext(AppContext);
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<State>({
    date: new Date(),
    title: '',
    expense: '',
    state: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleDateChange = (e: Date | null) => setValues({ ...values, date: e });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const r = await apiService(endpoints.create, {
      date: values.date,
      title: values.title,
      expense: values.expense,
      state: values.state,
    });

    if (r) {
      showToast(r.message);
      history.push('/expenses');
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: 1,
        }}
        px={3}
        py={4}
        onSubmit={handleSubmit}
      >
        <Typography
          color={state.isDarkMode ? 'white' : 'black'}
          variant="h5"
          textAlign="center"
          fontWeight={700}
          fontFamily="Pattaya"
        >
          Create
        </Typography>
        <Logo style={{ color: grey[500], fontSize: '1.2em', margin: '0em 0em 2em' }} />
        <MyDatePicker value={values.date} label="Date" onChange={handleDateChange} />
        <MyInput<State> value={values.title} name="title" label="Title" onChange={handleChange} />
        <MyMoneyInput<State>
          value={values.expense}
          name="expense"
          label="Expense"
          onChange={handleChange}
        />
        <MyDropdown<State>
          value={values.state}
          name="state"
          label="State"
          onChange={handleChange}
          options={states}
        />
        <LoadingButton
          type="submit"
          startIcon={<SaveIcon />}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          style={{ marginTop: '2em' }}
        >
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Create;
