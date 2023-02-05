export const getServerUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://moveobackend.vercel.app';
  } else {
    return 'http://localhost:4000';
  }
};
