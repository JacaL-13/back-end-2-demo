let movies = require('./db.json')

sortMovies()

function sortMovies() {
	movies = movies.sort((a, b) => {
		const nameA = a.title.toUpperCase(); // ignore upper and lowercase
		const nameB = b.title.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
	
		// names must be equal
		return 0;
	})
}

module.exports = {
	getMovies: (req, res) => {
		res.status(200).send(movies)
	},
	deleteMovie: (req, res) => {
		movies.splice(movies.findIndex(elem => elem.id === +req.params.id), 1)
		res.status(200).send(movies)
	},
	createMovie: (req, res) => {
		const {title, rating, imageURL} = req.body
		let newId = Math.max(...movies.map(elem => elem.id)) + 1

		let newMovie = {
			id: newId,
			title,
			rating, 
			imageURL
		}

		movies.push(newMovie)
		sortMovies()
		res.status(200).send(movies)
	},
	updateMovie: (req, res) => {
		let { id } = req.params
        let { type } = req.body
        let index = movies.findIndex(elem => +elem.id === +id)

        if (movies[index].rating > 4 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (movies[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            movies[index].rating++
            res.status(200).send(movies)
        } else if (type === 'minus') {
            movies[index].rating--
            res.status(200).send(movies)
        } else {
            res.sendStatus(400)
        }
	}
}