// src/pages/calculateEarnings.js
export const calculateEarnings = (amount, days = 14, multiplier = 2) => {
  // Basic 2x cap logic
  const earning = amount * multiplier;
  return {
    total: earning,
    daily: earning / days,
  };
};
