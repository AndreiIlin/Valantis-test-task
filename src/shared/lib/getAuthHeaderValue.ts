import md5 from 'md5';
export const getAuthHeaderValue = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const dateString = `${year}${month}${day}`;

  return md5(`${import.meta.env.VITE_PASSWORD_KEY}_${dateString}`);
};
