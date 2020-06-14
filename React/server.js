require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 4000;

// const pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: 'eu',
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/paint', (req, res) => {
  // pusher.trigger('painting', 'draw', req.body);
  res.json(req.body);
});

var a = 10

app.post('/data', (req, res) => {
  res.json({
    id: req.body.id,
    temp: Math.floor(Math.random()*10 + 37),
    bar: Math.floor(Math.random()*20 + 270),
    heartRate: Math.floor(Math.random()*30 + 60),
    o2ConRate: Math.floor(Math.random()*20),
    estTimeRemain: Math.floor(Math.random()*15*60),
  })
})


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
