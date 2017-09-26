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
router.get('/new', (request,response)=>{
    response.render('student/new')
})

router.get('/:id', (request, response) => {
    const studentId = request.params.id

    StudentModel.findById(studentId)
        .then((student) => {
            response.render('student/show', {
                student: student
            })
        })

})
router.get('/:id/edit', (request,response)=>{
    const studentId = request.params.id
    StudentModel.findById(studentId)
    .then(()=>{
        response.render('student/edit')
        student: student
    }
)})
router.get('/:id/delete', (request, response) => {

    const studentId = request.params.id

    StudentModel.findOneAndRemove(studentId)
        .then((student) => {
            response.send('You deleted it!')
        })

})
//CREATE ROUTE PART 2 - THIS IS WHAT MAKES NEW INFORMATION SAVE
router.post("/", (request, response) => {
    //request.body refers to what was in form but turned into a JS object bc we used body parser
    const newStudent = request.body;
    //saves what came through form and creates new student with data from that js object
    //you use whole "student" object we created and pass as parameter for .create
    //you can use (newStudent) in next line instead of ({name: newStudent.name, age: newStudent.age}). body parser created the newStudent object for us. truthfully you could use (request.body) instead of (newStudent)
    StudentModel.create(newStudent)
        .then(() => {
            response.redirect("/students")
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router