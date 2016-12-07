const http = require('http');
const express = require('express');
const middlewares = require('./lib/middlewares');
const app = express();
const server = http.createServer(app);
const port = 8080;

middlewares.load(app);

const mainController = require('./controllers/main');
const usersController = require('./controllers/users');
const cardsController = require('./controllers/cards');

app.get('/', mainController.home);

app.post('/user/login', usersController.login);
app.post('/user/store', usersController.store);
app.put('/user/:user_id', usersController.update);
app.delete('/user/:user_id', usersController.delete);

app.get('/card', cardsController.index);
app.post('/card', cardsController.store);
app.get('/card/:card_id', cardsController.show);
app.put('/card/:card_id', cardsController.update);
app.delete('/card/:card_id', cardsController.delete);

server.listen(port, function () {
  console.log(`localhost:${port} portunda uygulama hazir.`)
});
