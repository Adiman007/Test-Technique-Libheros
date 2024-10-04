const express = require('express')
const usersController = require('./api/users/users.controller')
//const todosController = require('./api/todos/todos.controller')
require('dotenv').config()
const db = require('./db_connection.js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000




app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//routes
app.use(usersController)
//app.use(todosController)

app.get("/", (req, res) => {
	return res.status(200).send("Hello World");

})
app.post('/', (req, res) => {
	console.log(req.body)
    return res.send(`Hello ${req.body.name}!`)
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