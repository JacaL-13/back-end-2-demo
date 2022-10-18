const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const {
	getMovies,
	deleteMovie,
	createMovie,
	updateMovie
} = require('./controller.js')

//endpoint
app.get('/api/movies', getMovies)
app.delete('/api/movies/:id', deleteMovie)
app.post('/api/movies', createMovie)
app.put('/api/movies/:id', updateMovie)

app.listen(4004, () => console.log('Up on 4004'))
