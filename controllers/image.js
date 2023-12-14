const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: '7c9505a48d7d437abb9d1eac8fbc0692'
});

const handleApiCall = (req, res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Url error'));
}

const handleImage = (req, res, database) =>{
    const { id } = req.body;
    database('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}
