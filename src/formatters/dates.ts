import moment from 'moment';

export const formatDate = (unformattedDate: string) => {
  return moment(Date.parse(unformattedDate)).format(
    'dddd, MMMM Do, YYYY, HH:mm:ss'
  );
};
