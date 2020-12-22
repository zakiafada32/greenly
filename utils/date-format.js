// format YYYY-MM-DD hh:mm
export const getDate = () => {
  const d = new Date();
  const date = d.toLocaleString().replaceAll('/', '-').split(', ')[0];
  const time = d.toTimeString().split(' ')[0].split(':').splice(0, 2).join(':');
  return `${date} ${time}`;
};

export const formatDate = (d) => {
  const local = new Date(d);
  const [day, month, year] = local.toLocaleString().split(', ')[0].split('/');
  const date = `${day}-${month}-${year}`;
  const time = local
    .toTimeString()
    .split(' ')[0]
    .split(':')
    .splice(0, 2)
    .join(':');
  return `${date} ${time}`;
};
