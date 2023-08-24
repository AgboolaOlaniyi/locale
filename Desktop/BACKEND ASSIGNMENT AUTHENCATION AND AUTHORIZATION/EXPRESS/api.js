
const express = require('express');
const itemsrouter = require('./items/api.router');
const userRouter = require('./users/users.router')

//const programRouter = require('./progams/program.router')

const port = 3002;

const app = express()

app.use(express.json()) // body parser



const items = [];


app.use('/items', itemsrouter)
app.use('/users', userRouter)


app.get('*', (req, res) => {
    res.status(404).json({
        data: null,
        error: 'Route not found'
    })
})



app.listen(port, () => console.log(`listening on port: ${port}`))