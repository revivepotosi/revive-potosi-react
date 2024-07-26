interface AppBarMenuItem {
  name: string;
  icon: JSX.Element;
  onClick: (() => void) | (() => Promise<void>);
  hide?: boolean;
};

export default AppBarMenuItem;
