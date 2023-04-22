const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const routes = require('./routes/appointments');

const app = express();

app.use(cors());

app.use(bodyParser.json({ extension: false }));

app.use(routes);

sequelize
    .sync()
    .then()
    .catch(err => console.error(err));

app.listen(3000);