const Todo = require('../model/todo.model');
const mongoose = require('mongoose');

module.exports = {

    getAll: () => {
        return new Promise((resolve, reject) => {
            Todo.find({}, (err, data) => {
                if (err) {
                    return reject({ status: 400, message: 'Bad Request' })
                }
                return resolve({ success: true, message: 'Data Get Successfully', data: data })
            })
        })
    },

    addTodo: (todoDetails) => {
        return new Promise((resolve, reject) => {
            if (todoDetails && todoDetails.text) {

                const todo = new Todo({
                    text: todoDetails.text,
                    status: 'pending'
                })

                todo.save().then(data => {
                    return resolve({ success: true, message: 'Added Successfully' })
                }).catch(err => {
                    return reject({ success: false, message: err })
                })


            } else {
                return reject({ status: 400, message: 'Bad Request' })
            }

        })
    },

    deleteTodo: (todoDetails) => {
        return new Promise((resolve, reject) => {
            if (todoDetails && todoDetails.todoId) {
                Todo.deleteOne({ "_id": todoDetails.todoId }, (err) => {
                    if (err) {
                        return reject({ status: 400, message: 'Bad Request' })
                    }
                    return resolve({ success: true, message: 'Deleted Successfully' })
                })

            } else {
                return reject({ status: 400, message: 'Bad Request'  })
            }
        })
    },

    updateTodo: (todoDetails) => {
        return new Promise((resolve, reject) => {
            if (todoDetails && todoDetails.todoId) {
                Todo.find({ "_id": todoDetails.todoId }, (err, data) => {
                    if (err) {
                        return reject({ status: 400, message: errorConfig.BAD_REQUEST })
                    }
                    else {
                        if (data.length == 0) {
                            return reject({ status: 400, message: 'Todo Not Exist' })
                        }
                        Todo.updateOne({ "_id": todoDetails.todoId },
                            {
                                $set: {
                                    text: todoDetails.text,
                                    status: todoDetails.status,
                                }
                            }, (error, data) => {
                                if (error) {
                                    return reject({ status: 400, message: 'Bad Request'  })
                                }
                                return resolve({ success: true, message: 'Todo Updated Successfully' })
                            })
                    }

                })


            }else{
                return reject({ status: 400, message: 'Bad Request'  }) 
            }
        })
    }
   
}

