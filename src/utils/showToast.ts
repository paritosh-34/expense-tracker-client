import { toast } from 'react-toastify';

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  if (type === 'error')
    toast.error(msg, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  else
    toast.success(msg, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
};

export default showToast;
