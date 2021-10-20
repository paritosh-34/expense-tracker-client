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
import MyPhoneInput from '@ui/Input/MyPhoneInput';
import MyPasswordInput from '@ui/Input/MyPasswordInput';
import Logo from '@ui/Logo';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface State {
  phone: string;
  password: string;
}

const Login: FC<LoginProps> = ({ setIsAuthenticated }) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<State>({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<keyof State, boolean>>({
    phone: false,
    password: false,
  });
  const [passwordMsg, setPasswordMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: keyof State
  ) => {
    if (prop === 'phone') {
      if (e.target.value.length < 10) setErrors((prev) => ({ ...prev, phone: true }));
      else if (e.target.value.length > 10) return;
      else setErrors((prev) => ({ ...prev, phone: false }));
    } else if (prop === 'password') {
      const [err, msg] = validatePassword(e.target.value);

      setErrors((prev) => ({ ...prev, password: err }));
      setPasswordMsg(msg);
    }
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClick = async () => {
    setLoading(true);

    const r = await loginReq(endpoints.login, {
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
      >
        <Typography variant="h5" textAlign="center" fontWeight={700} fontFamily="Pattaya">
          Login
        </Typography>
        <Logo style={{ color: grey[500], fontSize: '1.2em', margin: '0em 0em 2em' }} />
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
          Not a user?{' '}
          <RouterLink to="/signup">
            <Typography variant="body2" color="primary" style={{ display: 'inline' }}>
              Signup
            </Typography>
          </RouterLink>
        </Typography>
        <LoadingButton
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          style={{ marginTop: '2em' }}
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Login;
