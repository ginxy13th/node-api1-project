const express = require('express');
const shortid = require('shortid');
const server = express();
const port = process.env.PORT || 5678;

server.listen(port, () => console.log('server up'));

server.use(express.json());
server.get('/working', (req ,res )=>{
    res.send('working')
    });

let users = [{
        id: shortid.generate(), // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
}]

server.post('/api/users', (req,res) => {
    const user = req.body
    if( !user.name  || !user.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (user === undefined){
        res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
    }else {
    user.id = shortid.generate()
    users.push(user)
    res.status(201).json(user)
    }
})

server.get('/api/users/:id', (req, res) => {
    const user = req.body
    const id = req.params.id;
    if (!user) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    } else if (user.id !== id) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(200).json({data: users})
    } 
})

server.get('/api/users', (req,res) => {
    if(users.length === 0 || users === undefined ){
        res.status(500).json( { errorMessage: "The users information could not be retrieved." })
   } else{
       res.status(200).json(users)
   }
})

server.delete("/api/users/:id", (req,res) => {
    const id = req.params.id
    users = users.filter(  u => u.id !== id)
    if (!users) {
        res.status(500).json({
            errorMessage: "The user could not be removed"
        })
    } else if(!users.id ){
        res.status(404).json({message: "The user with the specified ID does not exist."});
    }else{
        res.status(204).end()
    }
})

server.put("/api/users/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if (!users) {
        res.status(500).json({
            errorMessage: "The user information could not be modified"
        })
    } else {
        if (changes.name === undefined && changes.bio === undefined) {
            res.status(400).json({
                errorMessage: 'Please provide name and bio for the user.'
            })
        } else {
            let found = users.find(u => u.id === id);
            if (found) {
                Object.assign(found, changes);
                res.status(200).json(found);
            } else {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            }
        }
    }
});