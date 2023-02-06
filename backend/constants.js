const codeBLocksMigrationData = [
	{
		id: 'asyncCase_1',
		title: 'Async case',
		code: `// Edit the function and use async - await

		const asyncFunction = () => {
			const response = fetch("http://localhost:3000");
			const data = response.json();
			
			return data;
		}`,
		href: 'codeBlocks/asyncCase_1',
	},
	{
		id: 'javaScriptObjects_2',
		title: 'Javascript Objects',
		code: `// Create an object for the dog: his name will be "Joy" and his age 5

		const dog = {}`,
		href: 'codeBlocks/javaScriptObjects_2',
	},
	{
		id: 'events_3',
		title: 'Events',
		code: `<body>
		// Click the button to display the date - use event onClick
	 
		 <button>The time is?</button>
	 
		 <script>
			 function displayDate() {
				 document.getElementById("demo").innerHTML = Date();
			 }
		 </script>
	 
		 <p id="demo"></p>
	 
	 </body>`,
		href: 'codeBlocks/events_3',
	},
	{
		id: 'forLoop_4',
		title: 'For Loop',
		code: `const cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];

		// Use for loop to print all the names in cars array
		
		
		document.getElementById("demo").innerHTML = text;`,
		href: 'codeBlocks/forLoop_4',
	},
];

module.exports = codeBLocksMigrationData;
