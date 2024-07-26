const getOnClickMenuItem = (navigate: (route: string) => void, onClose: () => void) => (route: string) => () => {
  onClose();
  navigate(route);
};

export { getOnClickMenuItem };
