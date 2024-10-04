const router = require('express').Router()
const db = require('../../db_connection.js')

// default /users route
router.get('/users',async (req, res) => {
    console.log("GET /users")
	return await db.query('SELECT * FROM users')
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

module.exports = router