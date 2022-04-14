export const isValidName = (name: string | undefined) => {
  if (!name || name.trim() === "") {
    return false;
  }

  return true;
};
