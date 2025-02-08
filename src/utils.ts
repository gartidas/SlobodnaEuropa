export const getRandomDate = (yearsAgo = 5): string => {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - yearsAgo);

  const randomTimestamp =
    past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTimestamp).toISOString().split("T")[0];
};
