import { useDispatch } from 'react-redux';
import { setClose, setOpen } from '../redux/slice/modalSlice';

const useModal = () => {
  const dispatch = useDispatch();

  const handleOpen = (props) => {
    dispatch(setOpen(props));
  };

  const handleClose = () => {
    dispatch(setClose());
  };

  return { handleOpen, handleClose };
};

export default useModal;
