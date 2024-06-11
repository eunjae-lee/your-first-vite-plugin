console.log('NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  console.log('this is production');
} else {
  console.log('this is not production');
}
