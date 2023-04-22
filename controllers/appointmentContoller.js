const Appointment = require('../models/appointment');

exports.getAllController = (req, res, next) => {
    Appointment.findAll()
        .then(response => { res.send(JSON.stringify(response)) })
        .catch(err => console.log(err));
}

exports.postAddController = (req, res, next) => {
    Appointment.create({
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })
        .then(response => { res.send(JSON.stringify(response)) })
        .catch(err => console.log(err));
}

exports.getSingleAppointmentController = (req, res, next) => {
    Appointment.findByPk(req.params.id)
        .then(response => { res.send(JSON.stringify(response)) })
        .catch(err => console.log(err));
}

exports.putUpdateController = (req, res, next) => {
    Appointment.update({
        fullName: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    },
        {
            where: {
                id: req.params.id
            }
        })
        .then(response => { res.send(JSON.stringify(response)) })
        .catch(err => console.error(err));
}

exports.deleteController = (req, res, next) => {
    Appointment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(response => { res.send(JSON.stringify(response)) })
        .catch(err => console.error(err));
}