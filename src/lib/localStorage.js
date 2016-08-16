const sidebarWidth = (val) => {
  if (val) {
    return localStorage.setItem('sidebarWidth', val);
  }
  const storedVal = localStorage.getItem('sidebarWidth');
  return storedVal || '40%';
};

export {
  sidebarWidth,
};
