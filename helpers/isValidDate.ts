export const isValidDate = (
  year?: string | number,
  month?: string | number
) => {
  const yearNum = Number(year);
  const monthNum = Number(month);

  if (
    isNaN(yearNum) ||
    isNaN(monthNum) ||
    yearNum > 2030 ||
    yearNum < 2021 ||
    monthNum < 1 ||
    monthNum > 12
  )
    return true;

  return false;
};
