const express = require('express');
const jsonParser = require('body-parser').json;

const app = express();

app.use(jsonParser());

app.set('trust proxy', true);

// GET /
app.get('/', (req, res, next) => {
  const language = req.headers["accept-language"].match(/^[^,]+/).join('');
  const software = req.headers["user-agent"].match(/[^(]+(?=[\)])/).join('');
  const getIp = (req) => {
    const rawIp = req.headers["X-Forwarded-For"]
      || req.headers["x-forwarded-for"]
      || req.connection.remoteAddress;
    return rawIp.match(/^[^,]+/).join('');
  };

  res.json({
    ipaddress: getIp(req),
    language,
    software,
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
