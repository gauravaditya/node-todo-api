const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {app} = require('../server');
const {Todo} = require('../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First Test Todo'
    }, {
        _id: new ObjectID(),
        text: 'Second Test Todo'
    }
    
];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done(), (err) => done(err));
});

describe('POST /todos', () => {

    it('should create a new Todo', (done) => {
        let text = 'Test Todo Text';

        request(app)
        .post('/todos')
        .send( { text } )
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text)
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find({ text }).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }, (e) => {
                done(e);
            });
        });
    });

    it('should not create todo with invalid body data', (done) => {
        let todo = {};

        request(app)
        .post('/todos')
        .send(todo)
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });

});

describe('GET /todos', () => {
    it('should fetch all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get todo by ID', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo).toMatchObject({_id: todos[0]._id.toHexString()});
            }).end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        const id = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toMatchObject({todo: null});
            })
            .end(done);
    });

    it('should return 404 if id is not valid', (done) => {
        const id = '123456';

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            // .expect((res) => {
            //     expect(res.body).toEqual('Invalid Id');
            // })
            .end(done);
    });
});

describe('DELETE /todos', () => {

    it('should delete todo by given ID', (done) => {
        const id = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toMatchObject({message: 'Successfully deleted!'});
            })
            .end((err, res) => {
                Todo.findById(id).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }, (err) => {
                    done(err);
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        const id = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toMatchObject({});
            }).end(done);
    });

    it('should return 404 if Id Invalid', (done) => {
        const id = 1234567;
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toMatchObject({});
            }).end(done);
    });
});