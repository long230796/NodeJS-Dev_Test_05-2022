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
		const users = data.users;

		let user = users.filter((item) =>
			item.id === id
		)
		if (user.length > 0) {
			return {data: user};
		} else {
			return {data: null};
		}

	}


	addUser(body) {
		const data = jsonfile.readFileSync('./db.json');
		data.users.push(body);

		return this.writeFile(data);
	}


	editUserById(id, userData) {
		let data = jsonfile.readFileSync('./db.json');
		let users = data.users;

		for (let i = 0; i < users.length; i ++) {
			if (users[i].id === id) {
				for (let key in userData) { users[i][key] = userData[key] }
				data.users = users;
				return this.writeFile(data);
			}
		}
		
		return {data: null};
	}


	rmUserById(id) {
		let data = jsonfile.readFileSync('./db.json');
		let users = data.users;

		let newUser = users.filter((obj) =>
			obj.id !== id
		)

		data.users = newUser;
		return this.writeFile(data);	

	}


	searchUser(name) {
		const data = jsonfile.readFileSync('./db.json');
		const users = data.users;

		let newUser = users.filter((obj) => 
			(obj.firstname.toLowerCase().includes(name) || obj.lastname.toLowerCase().includes(name))
		)

		newUser = newUser.sort().reverse();
		return newUser.length > 0 ? {data: newUser} : {data: null}

	}


	writeFile(data) {
		try { jsonfile.writeFileSync('./db.json', data, { spaces: 2 }); }
		catch(e) { return e; }

		return {success: true};	
	}

	plusElement(e) {
		let temp = 0;
		for (let i = 0; i < e.length; i++) {
		  temp += parseInt(e.charAt(i));
		}

		return temp;
	}

	getCoordinate(user) {
		const x = this.plusElement(user.coordinate.split(':')[0]);
		const y = this.plusElement(user.coordinate.split(':')[1]);

		return {x:x, y:y};
	}


	getNearestUser(id, n) {
		const data = jsonfile.readFileSync('./db.json');
		const users = data.users;
		const user = users.find((item) => {
			return item.id === id;
		})

		const target = this.getCoordinate(user);

		let distance = users.map((item) => {
			if (item.id !== user.id) {
				let userCoordinate = this.getCoordinate(item);
				let distance = this.getDistance(target, userCoordinate);

				item.distance = distance
				return item;
			}

		})
		// sort ascending
		distance.sort((a, b) => a.distance - b.distance);

		return {data: distance.slice(0, n)}; 

	}

	getDistance(target, position) {
		let m = Math.pow((position.x - target.x), 2);
		let n = Math.pow((position.y - target.y), 2);

		return Math.sqrt( m + n )
	}
}

module.exports = User;