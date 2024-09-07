export const getMaxDate = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 16);
  return today.toISOString().split('T')[0];
};
