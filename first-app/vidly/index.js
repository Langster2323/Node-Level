const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Horror' },
    { id: 4, name: 'Fantasy' },
    { id: 5, name: 'Comedy' }
]

// get all genres...
app.get('/api/genres', (req, res) => {
    res.send(genres);
})

// app.get('/api/genres/:id', (req, res) => {
//     const genre = genres.find(g => g.id === parseInt(req.params.id));

//     if (!genre) return res.status(404).send('The genre with the given id was not found')
// });

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found')
    const { error } = validateGenres(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre)

})

app.post('/api/genres', (req, res) => {
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

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given id was not found');

    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));