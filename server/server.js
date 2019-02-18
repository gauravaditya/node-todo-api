require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((document) => {
        res.status(200).send(document);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos
        })
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
           return res.status(404).send({todo});
        } 
        res.status(200).send({todo});
    }, (err) => {
        res.status(404).send('Unable to Get Todo');
    });

});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('No Todo by this Id');
        }

        res.status(200).send({
            todo,
            message: 'Successfully deleted!'
        });
    }).catch((err) => {
        res.status(400).status('Unable to Delete');
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid Id');
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
        body.completed = true;
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(404).send('Todo not found');
        }
        res.status(200).send({todo});
    }, (error) => {
        res.status(400).send('Unable to update todo');
    });
});

// Server Start
app.listen(`${port}`, () =>{
    console.log('Server started on port 3000');
});

module.exports = {
    app
}