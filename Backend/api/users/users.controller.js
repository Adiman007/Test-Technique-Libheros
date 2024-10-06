const router = require('express').Router()
const db = require('../../db_connection.js')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

// default /users route
router.get('/users',async (req, res) => {
    console.log("GET /users")
	return await db.query('SELECT * FROM users')
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

router.get('/user/:id',async (req, res) => {
    console.log("GET /users/:id")
    const id = parseInt(req.params.id)
    return await db.query('SELECT * FROM users WHERE id = $1', [id])
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(404).send(error))
})

router.post('/user', async (req, res) => {
    console.log("POST /users")
    const { name, last_name, email, password } = req.body;
    if (!name || !last_name || !email || !password) {
        return res.status(400).send("Please provide name,last_name, email and password")
    }

    if (await UserExist(email)) {
        return res.status(400).send("invalid Email");
    }

    const hash =  await bcrypt.hash(password, 10)

    return await db.query('INSERT INTO users (name,last_name, email,password) VALUES ($1, $2,$3,$4)', [name,last_name, email,hash])
        .then(() => res.status(201).send("User added"))
        .catch((error) => res.status(404).send(error.detail))
})

async function UserExist(email) {
    return await db.query('SELECT * FROM users where email = $1', [email])
        .then((data) => data.rows.length > 0)
        .catch((error) => false)
}

router.post('/login', async (req, res) => {
    console.log("POST /login")
    console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Please provide email and password")
    }

    const user = await db.query('SELECT * FROM users where email = $1', [email])
        .then((data) => data)
        .catch((error) => null)

    if (!user || user.length == 0) {
        return res.status(400).send("Invalid email or password")
    }
    if (!await bcrypt.compare(password,user[0].password)) {
        return res.status(400).send("Invalid email or password")
    }
	const token = await createJWT(user.id)
	return res.status(200).send({token})
})

async function createJWT(id) {
	return jwt.sign({sub:id}, process.env.JWT_SECRET);
}
module.exports = router