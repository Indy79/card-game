import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import APP_ROOT from 'app-root-path';
import pkg from '../../package.json';
import { handleCard, draw, initDeck } from './cards/index.js';
import { __DEV__ } from './utils.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(express.static(APP_ROOT + '/dist/client'));

const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

app.get('/version', function (req, res) {
  res.json({
    version: pkg.version
  });
});

app.get('*', function (_, response) {
  response.sendFile(APP_ROOT + '/dist/client/index.html');
});

let usersConnected = [];
let isGameOn = false;

io.on('connection', socket => {
  const nick = socket.handshake.query.nick;
  const currentUser = {
    id: socket.id,
    nick: nick,
    cards: []
  };
  usersConnected = [...usersConnected, currentUser];
  if (__DEV__) console.log('Logged with :', currentUser);
  if (__DEV__) console.log('Currently logged :', usersConnected);

  io.to(socket.id).emit('UPDATE_SELF', currentUser);

  socket.broadcast.emit('USER_JOINED', currentUser);

  setTimeout(() => {
    if (__DEV__) console.log('Broadcasting users list');
    io.emit('REFRESH_USER', usersConnected);
  }, 500);

  const startGame = () => {
    isGameOn = true;
    initDeck();
    usersConnected = usersConnected.map(user => Object.assign({}, user, { cards: [] }));
    io.emit('REFRESH_USER', usersConnected);
    io.emit('GAME_STARTED');
  };

  socket.on('GAME_ON', _ => {
    startGame();
  });

  socket.on('REFRESH_GAME', _ => {
    if (isGameOn) io.emit('GAME_STARTED');
    startGame();
  });

  socket.on('USER_DRAW_CARD', (id, fn) => {
    if (__DEV__) console.log(`User ${id} draw a card`);
    if (!isGameOn) startGame();
    usersConnected.find(user => user.id === id).cards.push(draw());
    io.emit('REFRESH_USER', usersConnected);
    fn('OK');
  });

  socket.on('disconnect', _ => {
    if (__DEV__) console.log('Unlogged with :', usersConnected.find(user => user.id === currentUser.id));
    usersConnected = usersConnected.filter(user => user.id !== currentUser.id);
    if (__DEV__) console.log('Currently logged :', usersConnected);
    socket.broadcast.emit('USER_DISCONNECT', currentUser);
    socket.broadcast.emit('REFRESH_USER', usersConnected);
  });
});

server.listen(port, () => {
  console.log('[INFO] Listening on *:' + port);
});
//# sourceMappingURL=index.js.map