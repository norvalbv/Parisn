type TimeLeftProps = {
  start: number;
  end: number;
};

export const timeLeft = ({ start, end }: TimeLeftProps): string => {
  const diffInSeconds = end - start;
  // calculate hours
  const hours = Math.floor(diffInSeconds / 3600);
  // calculate remaining minutes after subtracting the hours
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  // create the output string, making sure to correctly use 'hr' or 'hrs', 'min' or 'mins'
  const timeleft = `${hours} ${hours === 1 ? 'hr' : 'hrs'} ${minutes} ${
    minutes === 1 ? 'min' : 'mins'
  }`;

  return timeleft;
};
