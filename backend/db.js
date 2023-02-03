const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connection = mongoose.createConnection(process.env.DATABASE_URL);

const database = async () => {
	await connection.on('open', function () {
		connection.db.listCollections().toArray((err, collectionNamesList) => {
			if (err) {
				console.log(err);
				return;
			}

			const collection = collectionNamesList.filter((collectionName) => collectionName.name === 'codeblocks')[0];

			if (collection) {
				return;
			}

			connection.db.collection('codeblocks').insertMany(codeBLocksData, (err, res) => {
				if (err) throw err;
			});
		});
	});
};

const codeBLocksData = [
	{
		title: 'Async case',
		code: 'const asyncFunc = async () => {\n\tconst response = await fetch(resource);\n   \tconst data = await response.json();\n}',
		href: 'codeBlock/Async case',
	},
	{
		title: 'Javascript Objects',
		code: '<html>\n<body>\n\n<h2>JavaScript Objects</h2>\n<p>Creating a JavaScript Object:</p>\n\n<p id="demo"></p>\n\n<script>\nconst person = {};\nperson.firstName = "John";\nperson.lastName = "Doe";\nperson.age = 50;\nperson.eyeColor = "blue"; \n\ndocument.getElementById("demo").innerHTML =\nperson.firstName + " is " + person.age + " years old.";\n</script>\n\n</body>\n</html>',
		href: 'codeBlock/Javascript Objects',
	},
	{
		title: 'Events',
		code: '<html>\n<body>\n\n<button onclick="document.getElementById(\'demo\').innerHTML=Date()">The time is?</button>\n\n<p id="demo"></p>\n\n</body>\n</html>',
		href: 'codeBlock/Events',
	},
	{
		title: 'For Loop',
		code: '<html>\n<body>\n\n<h2>JavaScript For Loop</h2>\n\n<p id="demo"></p>\n\n<script>\nconst cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];\n\nlet text = "";\nfor (let i = 0; i < cars.length; i++) {\n  text += cars[i] + "<br>";\n}\n\ndocument.getElementById("demo").innerHTML = text;\n</script>\n\n</body>\n</html>',
		href: 'codeBlock/For Loop',
	},
];

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', (error) => {
	console.log(error);
});

db.once('open', () => {
	console.log('Connected to mongoDB');
});

module.exports = database;
