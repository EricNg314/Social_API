// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_api', {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.use(routes);

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
