import colors from '../../style/colors';

const styles = {
  primary: {
    root: {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: colors.primary,
      color: colors.primary,
    },
    selected: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  },
  secondary: {
    root: {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: colors.secondary,
      color: colors.secondary,
    },
    selected: {
      backgroundColor: colors.secondary,
      color: colors.white,
    },
  },
  white: {
    root: {
      backgroundColor: 'transparent',
      borderWidth: '2px',
      borderColor: colors.white,
      color: colors.white,
    },
    selected: {
      backgroundColor: colors.white,
      color: colors.primary,
    },
  },
};

const style = (color: string): any => {
  let root;
  let selected;
  switch (color) {
    case 'secondary':
      root = styles.secondary.root;
      selected = styles.secondary.selected;
      break;
    case 'white':
      root = styles.white.root;
      selected = styles.white.selected;
      break;
    default:
      root = styles.primary.root;
      selected = styles.primary.selected;
  }
  return {
    '&.MuiToggleButton-root': root,
    '&.MuiToggleButton-root.Mui-selected': selected,
  };
};

export default style;
