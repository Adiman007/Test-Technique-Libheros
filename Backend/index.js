const express = require('express')
const usersController = require('./api/users/users.controller')
//const todosController = require('./api/todos/todos.controller')
require('dotenv').config()

const app = express()
const port = 3000

//routes
app.use(usersController)
//app.use(todosController)

app.get("/", (req, res) => {
	return res.status(200).send("Hello World");

})

app.listen(port, async () => {
	try {
		await db.connect();
		console.log("Connected to the database");
	} catch (error) {
		console.error("Failed to connect to the database", error);
	}
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

// Export the Express API
module.exports = app;