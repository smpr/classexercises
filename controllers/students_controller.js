const express = require('express')
const router = express.Router()
const Schema = require("../db/schema.js");

const StudentModel = Schema.StudentModel;

router.get('/', (request, response) => {
    StudentModel.find({})
        .then((students) => {
            response.render('student/index', {
                students: students
            })
        })
        .catch((error) => {
            console.log(error)
        })
        
});

router.get('/:id', (request, response) => {
    const studentId = request.params.id

    StudentModel.findById(studentId)
        .then((student) => {
            response.render('student/show', {
                student: student
            })
        })

})

router.get('/:id/delete', (request, response) => {

    const studentId = request.params.id

    StudentModel.findOneAndRemove(studentId)
        .then((student) => {
            response.send('You deleted it!')
        })

})

module.exports = router