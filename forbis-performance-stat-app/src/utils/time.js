import moment from 'moment';

export const floatToTime = (value) => {
  let result;
  if (value) {
    result = moment('1900.01.01 00:00:00', 'YYYY.MM.DD HH:mm:ss').add(value, 'hours').format('H[h] mm[m]');
  };

  return result;
};