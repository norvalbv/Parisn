type TimeLeftProps = {
  startTime: number;
  endTime: number;
};

export const timeLeft = ({ startTime, endTime }: TimeLeftProps): string => {
  const diffInSeconds = endTime - startTime;
  // calculate hours
  const hours = Math.floor(diffInSeconds / 3600);
  // calculate remaining minutes after subtracting the hours
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  // create the output string, making sure to correctly use 'hr' or 'hrs', 'min' or 'mins'
  const timeleft = `1day ${hours}${hours === 1 ? 'hr' : 'hrs'} ${minutes}${
    minutes === 1 ? 'min' : 'mins'
  }`;

  return timeleft;
};
