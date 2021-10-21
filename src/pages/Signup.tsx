import { FC, useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { blueGrey, grey } from '@mui/material/colors';
import Image from '@assets/bg.jpg';
import { endpoints } from '@constants/apiEndpoints';
import { loginReq } from '@services/authService';
import showToast from '@utils/showToast';
import validatePassword from '@utils/validatePassword';
import MyInput from '@ui/Input/MyInput';
import MyPhoneInput from '@ui/Input/MyPhoneInput';
import MyPasswordInput from '@ui/Input/MyPasswordInput';
import Logo from '@ui/Logo';

interface SignupProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface State {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const Signup: FC<SignupProps> = ({ setIsAuthenticated }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<State>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<keyof State, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
  });
  const [passwordMsg, setPasswordMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => {
    // phone validation
    if (prop === 'phone') {
      if (e.target.value.length < 10) setErrors((prev) => ({ ...prev, phone: true }));
      else if (e.target.value.length > 10) return;
      else setErrors((prev) => ({ ...prev, phone: false }));

      // password validation
    } else if (prop === 'password') {
      const [err, msg] = validatePassword(e.target.value);
      setErrors((prev) => ({ ...prev, password: err }));
      setPasswordMsg(msg);

      // email validation
    } else if (prop === 'email') {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(e.target.value)) setErrors((prev) => ({ ...prev, email: true }));
      else setErrors((prev) => ({ ...prev, email: false }));

      // firstName validation
    } else if (prop === 'firstName') {
      if (e.target.value.length < 3) setErrors((prev) => ({ ...prev, firstName: true }));
      else setErrors((prev) => ({ ...prev, firstName: false }));
    }

    setValues({ ...values, [prop]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const r = await loginReq(endpoints.signup, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    });

    if (r) {
      setIsAuthenticated(true);
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
        backgroundImage: `url(${Image})`,
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
        <Typography variant="h5" textAlign="center" fontWeight={700} fontFamily="Pattaya">
          Sign Up
        </Typography>
        <Logo style={{ color: grey[500], fontSize: '1.2em', margin: '0em 0em 2em' }} />
        <MyInput<State>
          value={values.firstName}
          name="firstName"
          error={errors.firstName}
          label="First Name"
          onChange={handleChange}
          helperText="Must have atleast 3 characters"
        />
        <MyInput<State>
          value={values.lastName}
          name="lastName"
          label="Last Name"
          onChange={handleChange}
          required={false}
        />
        <MyInput<State>
          value={values.email}
          name="email"
          error={errors.email}
          label="Email"
          onChange={handleChange}
          helperText="Invalid email"
        />
        <MyPhoneInput<State>
          value={values.phone}
          name="phone"
          onChange={handleChange}
          error={errors.phone}
        />
        <MyPasswordInput<State>
          value={values.password}
          name="password"
          onChange={handleChange}
          error={errors.password}
          helperText={passwordMsg}
        />
        <Typography variant="body2" mt={1} style={{ alignSelf: 'flex-end' }} color={blueGrey[500]}>
          Already signed up?{' '}
          <RouterLink to="/login">
            <Typography variant="body2" color="primary" style={{ display: 'inline' }}>
              Login
            </Typography>
          </RouterLink>
        </Typography>
        <LoadingButton
          type="submit"
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          style={{ marginTop: '2em' }}
        >
          Signup
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Signup;
