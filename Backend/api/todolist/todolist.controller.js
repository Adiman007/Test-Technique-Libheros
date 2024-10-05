const router = require('express').Router()
const db = require('../../db_connection.js')

// default /users route
router.get('/todolist',async (req, res) => {
    console.log("GET /todolist")
	return await db.query('SELECT * FROM todo_list')
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

router.get('/todolist/:id',async (req, res) => {
    console.log("GET /todolist/:id")
    const id = parseInt(req.params.id)
    return await db.query('SELECT * FROM todo_list WHERE user_id = $1', [id])
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

router.post('/todolist', async (req, res) => {
    console.log("POST /todolist")
    const name  = req.body?.name;
    const user_id= req.body?.user_id; 
    if (!name || !user_id) {
        return res.status(400).send("Please provide name and user_id")
    }

    if (await TodolistExist(name,user_id)) {

        return res.status(400).send("invalid name");
    }
    if (await UserExist(user_id)) {

        return res.status(400).send("invalid user_id");
    }

    return await db.query('INSERT INTO todo_list (name,user_id) VALUES ($1, $2)', [name,user_id])
        .then(() => res.status(201).send("Todolist added"))
        .catch((error) => res.status(404).send(error))
})

async function TodolistExist(name,user_id) {
    return db.query('SELECT * FROM todo_list WHERE name = $1 and user_id = $2', [name,user_id])
        .then((data) => data.length > 0)
        .catch((error) => false)
}
async function UserExist(user_id) {
    return db.query('SELECT * FROM users WHERE id = $1', [user_id])
        .then((data) => console.log(data))
        .catch((error) => false)
}

router.delete('/todolist/:id', async (req, res) => {
    console.log("DELETE /todolist/:id")
    const id = parseInt(req.params.id)
    return await db.query('DELETE FROM todo_list WHERE id = $1', [id])
        .then(() => res.status(200).send("Todolist deleted"))
        .catch((error) => res.status(404).send(error))
})

module.exports = router