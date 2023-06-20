export const timeLeft = (endTime: number): string => {
  const diffInMilliseconds = endTime - Date.now();

  if (diffInMilliseconds < 1) return 'Sale Ended';

  // if (diffInMilliseconds
  const diffInSeconds = diffInMilliseconds / 1000;

  // calculate days
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const remainingSecondsAfterDays = diffInSeconds % (3600 * 24);

  // calculate hours
  const hours = Math.floor(remainingSecondsAfterDays / 3600);
  const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;

  // calculate minutes
  const minutes = Math.floor(remainingSecondsAfterHours / 60);

  // create the output string, making sure to correctly use 'day' or 'days', 'hr' or 'hrs', 'min' or 'mins'
  const timeleft = `${days}${days === 1 ? 'day' : 'days'} ${hours}${
    hours === 1 ? 'hr' : 'hrs'
  } ${minutes}${minutes === 1 ? 'min' : 'mins'}`;

  return timeleft;
};
