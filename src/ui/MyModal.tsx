import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FC } from 'react';

interface MyModalProps {
  handleCancel: () => void;
  handleOk: () => void;
  open: boolean;
  title: string;
  content: string;
}

const MyModal: FC<MyModalProps> = ({ handleCancel, handleOk, open, title, content }) => {
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MyModal;
