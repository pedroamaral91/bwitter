const express = require('express');
const mongoose = require('mongoose');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://pedro:hehe123@bwitter-pneqs.mongodb.net/bwitter', {
  useNewUrlParser: true
});

// Middleware
app.use((req, res, next) => {
  req.io = io;
  return next();
})
// Add json instead body requisition
app.use(express.json());

// All routes..
app.use(require('./routes'));

server.listen(3000, () => {
  console.log(' (: Server started or port 3000');
});