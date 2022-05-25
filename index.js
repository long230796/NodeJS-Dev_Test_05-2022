const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const User = require('./module.js')

const port = 3000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/user/read', (req, res) => {
	const id = req.query.id;
	const user = new User();
	res.json(user.getUserById(id));
})

app.listen(port, () => console.log(`server listening on port ${port}`))
