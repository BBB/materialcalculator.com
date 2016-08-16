const storage = global.localStorage || { getItem() {}, setItem() {} };

const sidebarWidth = (val) => {
  if (val) {
    return storage.setItem('sidebarWidth', val);
  }
  const storedVal = storage.getItem('sidebarWidth');
  return storedVal || '40%';
};

export {
  sidebarWidth,
};
