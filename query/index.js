const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

function handleEvents(type, data) {
    if (type == 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    else if (type == 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        post.comments.push({ id, content, status });
    } else if (type == 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const comments = posts[postId].comments;

        const comment = comments.find((c) => c.id == id);

        comment.status = status;
        comment.content = content;
    }
    console.log('posts are: ', posts);
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvents(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('App listening on 4002');

    const events = await axios.get('http://event-bus-srv:4005/events');
    for(const event of events.data) {
        handleEvents(event.type, event.data);
    }
});
