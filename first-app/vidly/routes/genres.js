const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Horror' },
    { id: 4, name: 'Fantasy' },
    { id: 5, name: 'Comedy' }
]

// get all genres...
router.get('/', (req, res) => {
    res.send(genres);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send('The genre with the given id was not found')
});

router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found')
    const { error } = validateGenres(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre)

})

router.post('/', (req, res) => {
    const { error } = validateGenres(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})

function validateGenres(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema); 
}

router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given id was not found');

    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
});

module.exports = router;