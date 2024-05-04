const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

// var tasklist = [
//     {
//         description: "excersie",
//         duedate: "MAY 2, 2019",
//         category: "work",
//         phone: "8209944142"

//     }
// ]

app.get('/', function(req, res){
    // return res.render('home', {
    //     title: "TODO APP",
    //     task_list: tasklist
    // });
    Task.find({})
    .then(tasks => {
        return res.render('home', {
            title: "TODO APP",
            task_list: tasks
        }); 
    })
    .catch(err => {
        console.log('Error in fetching task from db');
        return;
    });
});

app.post('/create-task', function(req, res){
    // tasklist.push(req.body);
    // return res.redirect('back');
    Task.create({
        description: req.body.description,
        duedate: req.body.duedate,
        category: req.body.category,
        phone: req.body.phone
    })
    .then(newTask => {
        console.log('********', newTask);
        return res.redirect('back');
    })
    .catch(err => {
        console.log('error in creating a task');
        return;
    })
});

app.get('/delete-task', function(req, res){
    // console.log(req.query);
    
    // let phone = req.query.phone;
    // let taskIndex = tasklist.findIndex(contact => contact.phone == phone);
    // if(taskIndex != -1){
    //     tasklist.splice(taskIndex, 1);
    // }
    // return res.redirect('back');
    let id = req.query.id;
    Task.findByIdAndDelete(id)
    .catch(err => {
        console.log('error in deleting an object from database');
        return;
    })
    return res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server`);
        return;
    }
        console.log(`Server is up and running on the Port: ${port}`);
});