module.exports = {
  PUBLIC_URL: process.env.NODE_ENV === 'start' ? '' : '/webpack-mpa',
  STATIC_URL: 'public',
};