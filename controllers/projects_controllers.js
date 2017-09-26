const express = require('express')

const router = express.Router({mergeParams: true})
const Schema = require("../db/schema.js");

const StudentModel = Schema.StudentModel;

router.get('/', (request,response)=>{
    const studentId = request.params.studentId;
    StudentModel.findById(studentId)
    .then((student)=>{
        //find all the students projects
        response.render('projects/index', {
            student: student
        })
        //display each project in a div
        
    })
    .catch((error)=>{
        console.log(error)
    })
})

module.exports = router