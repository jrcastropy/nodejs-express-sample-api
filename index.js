const Joi = require('joi')

const express = require('express');
const app = express()



// app.get()
// app.post()
// app.put()
// app.delete()

app.use(express.json())

const courses = [
    {id:1, name:'courses1'},
    {id:2, name:'courses2'},
    {id:3, name:'courses3'}
];

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) =>{
    const course = validateId(req.params.id)
    if (!course) res.status(404).send('The course with the given ID was not find')
    else res.send(course)
    // res.send(req.params.id)
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // if (!req.body.name || req.body.name < 3) {
    //     res.status(400).send('Name is required')
    //     return;
    // }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course)
});

app.put('/api/courses/:id', (req, res) => {
    const course = validateId(req.params.id)
    if (!course) res.status(404).send('The course with the given ID was not find')

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) =>{
    res.send(req.params)
});

app.delete('/api/courses/:id', (req, res) => {
    const course = validateId(req.params.id)
    if (!course) return res.status(404).send('The course with the given ID was not find'); 

    const index = courses.indexOf(course);
    courses.splice(index, 1)
    res.send(course)
});

const validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}

const validateId = (id) => {
    return courses.find(c => c.id == id)
}

// PORT
const port = process.env.PORT || 3000
console.log(process.env.PORT)
app.listen(port, () => console.log(`Listening on port ${port}`))