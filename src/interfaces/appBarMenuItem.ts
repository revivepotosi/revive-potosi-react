interface AppBarMenuItem {
  name: string;
  icon: JSX.Element;
  onClick: (() => void) | (() => Promise<void>);
};

export default AppBarMenuItem;
