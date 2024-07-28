import { Skeleton } from '@mui/material';

interface Props {
  text?: boolean;
  sx?: any,
}

const ButtonSkeleton = ({ text = false, sx }: Props) => (
  <Skeleton
    variant="rounded"
    width="11.25rem"
    height={text ? '1.922rem' : '2.281rem'}
    sx={sx}
  />
);

export default ButtonSkeleton;
