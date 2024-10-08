const router = require('express').Router()
const db = require('../../db_connection.js')

router.get('/todos',async (req, res) => {
    console.log("GET /todos")
	return await db.query('SELECT * FROM todos')
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

router.get('/todos/:id',async (req, res) => {
    console.log("GET /todos/:id")
    const id = parseInt(req.params.id)
    return await db.query('SELECT * FROM todos WHERE todolist_id = $1', [id])
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

router.post('/todo', async (req, res) => {
    console.log("POST /todo")
    const todolist_id  = req.body?.todolist_id;
    const title= req.body?.title; 
    const long_description = req.body?.long_description ?? "";
    const completed = req.body?.completed ?? false;
    const end_date = req.body?.end_date;
    const creation_date = new Date();
    if (!todolist_id || !title || !end_date) {
        return res.status(400).send("Please provide todolist_id,title and end_date")
    }

    const end_date_obj = new Date(end_date);

    if (end_date_obj <= creation_date) {
        return res.status(400).send("end_date must be greater than the current date");
    }
    return await db.query('INSERT INTO todos (todolist_id,title, long_description,completed, end_date,creation_date) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *', [todolist_id,title, long_description,completed,end_date,creation_date])
        .then((result) => res.status(201).send(result[0]))
        .catch((error) => res.status(404).send(error))
})

router.delete('/todo/:id', async (req, res) => {
    console.log("DELETE /todo/:id")
    const id = parseInt(req.params.id)
    return await db.query('DELETE FROM todos WHERE id = $1', [id])
        .then(() => res.status(200).send("todo deleted"))
        .catch((error) => res.status(404).send(error))
})

router.put('/todo/:id', async (req, res) => {
    console.log("PUT /todo/:id")
    const id = parseInt(req.params.id)
    const title = req.body?.title;
    const long_description = req.body?.long_description;
    const completed = req.body?.completed;
    const end_date = req.body?.end_date;
    if (!title && !long_description && !completed && !end_date) {
        return res.status(400).send("Please provide at least one field to update")
    }
    return await db.query('UPDATE todos SET title = $1, long_description = $2, completed = $3, end_date = $4 WHERE id = $5', [title, long_description, completed, end_date, id])
        .then(() => res.status(200).send("Todo updated"))
        .catch((error) => res.status(404).send(error))
})




module.exports = router