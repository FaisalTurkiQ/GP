const Course = require('../models/courses')

const getAll = (req,res) => {
    Course.find({}).then((courses) => {
        res.status(200).json({'courses':courses});
    }).catch((err) => {
        res.status(500).json({'error':err});
    });
}

const getById = (req,res) => {
    Course.findById(req.params.id).then( course => {
        res.status(200).json(course);
    }).catch(err => {
        res.status(500).json({'error':err});
    })
}

const update = (req, res) => {
    Course.findByIdAndUpdate(req.params.id,req.body).then(() => {
        res.status(200).json({'message':'Course updated successful','course':req.body});
    }).catch(err => {
        res.status(500).json({'error':err});
    });
}


const create = (req, res) => {
    const newCourse = new Course(req.body)
    newCourse.save().then(() => {
        res.status(200).json({'message': 'Course created successfully','course':newCourse});
    }).catch(err => {
        res.status(500).json({'error':err});
    });
}

const deleteByID = (req, res) => {
    Course.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).json({'message': 'Course deleted successfully'})
    }).catch(err => {
        res.status(500).json({'error':err});
    });
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteByID
}