import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import type { RootState } from '../../app/store';
import colors from '../../style/colors';

const Loader = () => {
	const loading = useSelector((state: RootState) => state.general.loading)
  return (
    <Backdrop
			sx={{ color: colors.black, zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
  );
};

export default Loader;
