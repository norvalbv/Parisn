type Options = {
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24';
};

// Convert timestamp to date
function convertToDate(
  timestamp: number,
  requireMillis?: boolean,
  format?: {
    type: keyof typeof typeMap | 'custom';
    customValues?: Options;
    requireTime?: boolean;
  }
): string {
  const options: Options =
    format === undefined
      ? (typeMap.long as Options)
      : format.type !== 'custom'
      ? (typeMap[format.type] as Options)
      : format.requireTime
      ? {
          year: format.customValues?.year || 'numeric',
          month: format.customValues?.month || '2-digit',
          day: format.customValues?.day || '2-digit',
          hour: format.customValues?.hour || '2-digit',
          minute: format.customValues?.minute || '2-digit',
          second: format.customValues?.second || '2-digit',
          hourCycle: format.customValues?.hourCycle || 'h12',
        }
      : {
          year: format.customValues?.year || 'numeric',
          month: format.customValues?.month || '2-digit',
          day: format.customValues?.day || '2-digit',
        };

  // Forces use of 12 hour cycle time format for 'en-GB' locale, as the `Intl` uses 24 hours cycle time for the locale.
  // No need to change the date format as it already formatted according to the defined locale.
  if (navigator.language === 'en-GB') {
    options.hourCycle = 'h12';
  }

  const date = Intl.DateTimeFormat(navigator.language, options).format(
    requireMillis ? timestamp * 1000 : timestamp
  );

  return date;
}
const typeMap = {
  long: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  },
  short: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  },
};

export default convertToDate;
