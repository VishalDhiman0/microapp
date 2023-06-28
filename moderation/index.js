const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if(type == 'CommentCreated') {
        const { id, content, postId } = data;

        let status;
        if(content.includes('orange')) {
            status = 'rejected';
        }
        else {
            status = 'accepted';
        }

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id,
                status,
                postId,
                content,
            },
        });
    }

    res.send({});
});

app.listen(4003, () =>{
    console.log('App listening on 4003');
});
