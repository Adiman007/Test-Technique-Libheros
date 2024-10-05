const router = require('express').Router()
const db = require('../../db_connection.js')

// default /users route
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
    if (!todolist_id || !title || !end_date) {
        return res.status(400).send("Please provide todolist_id,title and end_date")
    }

    const current_date = new Date();
    const end_date_obj = new Date(end_date);

    if (end_date_obj <= current_date) {
        return res.status(400).send("end_date must be greater than the current date");
    }
    return await db.query('INSERT INTO todos (todolist_id,title, long_description,completed, end_date) VALUES ($1, $2,$3,$4,$5)', [todolist_id,title, long_description,completed,end_date])
        .then(() => res.status(201).send("Todo added"))
        .catch((error) => res.status(404).send(error))
})

router.delete('/todo/:id', async (req, res) => {
    console.log("DELETE /todo/:id")
    const id = parseInt(req.params.id)
    return await db.query('DELETE FROM todos WHERE id = $1', [id])
        .then(() => res.status(200).send("todo deleted"))
        .catch((error) => res.status(404).send(error))
})




module.exports = router