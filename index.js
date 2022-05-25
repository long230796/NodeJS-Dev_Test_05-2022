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



app.get('/user/search', (req, res) => {
	const name = req.query.name;
	const user = new User();

	res.json(user.searchUser(name.toLowerCase()));
})



app.get('/locate', (req, res) => {
	const n = req.query.n;
	const id = req.query.userId;

	const user = new User();
	res.json(user.getNearestUser(id, n));

})


app.post('/user/add', (req, res) => {
	const id = uuid.v4();
	const body = req.body;
	const user = new User();

	body.id = id;
	res.json(user.addUser(body));

})



app.put('/user/edit/:id', (req, res) => {
	const id = req.params.id;
	const userData = req.body;
	const user = new User();

	res.json(user.editUserById(id, userData));
})



app.delete('/user/edit/:id', (req, res) => {
	const id = req.params.id;
	const user = new User();

	res.json(user.rmUserById(id));
})



app.listen(port, () => console.log(`server listening on port ${port}`))
