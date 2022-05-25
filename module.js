const jsonfile = require('jsonfile');

class User {
	constructor(username, lastname, age, coordinate) {
		this.username = username;
		this.lastname = lastname;
		this.age = age;
		this.coordinate = coordinate;
	}

	getUserById(id) {
		const data = jsonfile.readFileSync('./db.json');

		let user = data.users.filter((item) => {
			return item.id === id;
		})
		if (user.length > 0) {
			return user;
		} else {
			return null;
		}

	}
}

module.exports = User;