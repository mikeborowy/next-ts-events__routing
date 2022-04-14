export const isValidEmail = (email: string | undefined) => {
  if (!email || email.trim() === "" || !email.includes("@")) {
    return false;
  }

  return true;
};
