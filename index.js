const express = require('express');

const server = express();
const port = 5678;

server.listen(port, () => console.log('server up'));
server.use(express.json());

let users = [{
        id: "a_unique_id", // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
}]

server.get('/api/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json({ data: users})
    
})

// server.get('/api/users/:id', (req, res) => {

// })