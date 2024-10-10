const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
