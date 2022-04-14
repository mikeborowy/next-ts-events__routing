export const isValidComment = (comment: string | undefined) => {
  if (!comment || comment.trim() === "") {
    return false;
  }

  return true;
};
