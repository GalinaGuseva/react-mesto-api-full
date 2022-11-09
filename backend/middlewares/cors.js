const allowedCors = [
  'https://galamesto.students.nomoredomains.icu',
  'http://galamesto.students.nomoredomains.icu',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'localhost:3001',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};