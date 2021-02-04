import axios from 'axios';

export const populateData = async (group, user) => {
  let result = {};
  const url = `/api/getData?${group ? 'group=' + group + '&' : ''}${user ? 'user=' + user + '&' : ''}`;

  await axios.get(url).then((response) => {
    result.supportResolved = response.data[0].payload.values;
    result.supportOverdue = response.data[1].payload.values;
    result.developmentBugs = response.data[2].payload.values;
  }).catch((err) => {
    throw err;
  });

  return result;
};

export const populateSelectors = async () => {
  let result = {};

  await axios.get('/api/getSelectors').then((response) => {
    result.usersList = response.data[0].payload.values.map((e) => {
      const splited = e[0].split('|');
      return { id: splited[0], fullName: splited[1] };
    });

    result.groupsList = response.data[1].payload.values.map(e => e[0]);
  }).catch((err) => {
    throw err;
  });

  return result;
};