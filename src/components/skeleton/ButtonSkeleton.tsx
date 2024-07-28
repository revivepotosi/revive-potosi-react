import { Skeleton } from '@mui/material';

interface Props {
  text?: boolean;
  sx?: any;
  width?: string;
}

const ButtonSkeleton = ({ text = false, sx, width = '11.25rem' }: Props) => (
  <Skeleton
    variant="rounded"
    width={width}
    height={text ? '1.922rem' : '2.281rem'}
    sx={sx}
  />
);

export default ButtonSkeleton;
