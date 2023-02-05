const codeBLocksMigrationData = [
	{
		id: 'asyncCase_1',
		title: 'Async case',
		code: 'const asyncFunc = async () => {\n\tconst response = await fetch(resource);\n   \tconst data = await response.json();\n}',
		href: 'codeBlock/asyncCase_1',
	},
	{
		id: 'javaScriptObjects_2',
		title: 'Javascript Objects',
		code: '<html>\n<body>\n\n<h2>JavaScript Objects</h2>\n<p>Creating a JavaScript Object:</p>\n\n<p id="demo"></p>\n\n<script>\nconst person = {};\nperson.firstName = "John";\nperson.lastName = "Doe";\nperson.age = 50;\nperson.eyeColor = "blue"; \n\ndocument.getElementById("demo").innerHTML =\nperson.firstName + " is " + person.age + " years old.";\n</script>\n\n</body>\n</html>',
		href: 'codeBlock/javaScriptObjects_2',
	},
	{
		id: 'events_3',
		title: 'Events',
		code: '<html>\n<body>\n\n<button onclick="document.getElementById(\'demo\').innerHTML=Date()">The time is?</button>\n\n<p id="demo"></p>\n\n</body>\n</html>',
		href: 'codeBlock/events_3',
	},
	{
		id: 'forLoop_4',
		title: 'For Loop',
		code: '<html>\n<body>\n\n<h2>JavaScript For Loop</h2>\n\n<p id="demo"></p>\n\n<script>\nconst cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];\n\nlet text = "";\nfor (let i = 0; i < cars.length; i++) {\n  text += cars[i] + "<br>";\n}\n\ndocument.getElementById("demo").innerHTML = text;\n</script>\n\n</body>\n</html>',
		href: 'codeBlock/forLoop_4',
	},
];

module.exports = codeBLocksMigrationData;
