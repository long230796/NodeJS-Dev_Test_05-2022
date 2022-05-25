const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const port = 3000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.listen(port, () => console.log(`server listening on port ${port}`))
