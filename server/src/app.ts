import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import { sessionStore } from 'libs';
import router from 'routes';
import { textCyan, textRed, textYellow } from 'utils/colorprint';

const app = express();
const server = http.createServer(app);

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionStore());
app.use(cookieParser());

app.use('/', router);

app.use((req, res, next) => {
  console.warn(`${textYellow('404')} | ${req.url}`);
  res.status(404).send('404');
});

app.use((err, req, res, next) => {
  console.error(`${textRed('500')} | ${req.url}`);
  if (app.settings.env === 'production') {
    console.error(err);
    res.status(500).send('500');
  } else {
    next(err.stack);
  }
});

server.on('error', (err) => {
  console.error(`${textRed('ERROR')} | ${err.stack}`);
});

const port = process.env.NODE_ENV === 'development' ? 8080 : 8200;
server.listen(port, () => {
  console.info(textCyan('connected!!'));
});
