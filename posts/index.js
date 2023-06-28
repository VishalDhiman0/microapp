const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const posts = {};
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', (req, res) => {
    const postId = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[postId] = {
        id: postId,
        title,
    };

    axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id: postId, title
        },
    })
    res.status(201).send(posts[postId]);
});

app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('Hey! App listening on 4000');
});
