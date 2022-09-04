const express = require('express');
const { sequelize, Users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: 'Not authenticated' });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

const scheme = Joi.object({
    name: Joi.string().trim().max(40).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: Joi.string().valid('admin','content_creator').required()
});

const updateScheme = Joi.object({
    name: Joi.string().trim().max(40).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin','content_creator').required()
});

route.use(authToken);

route.get('/users', (req, res) => {
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                Users.findAll()
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                Users.findByPk(id)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.post('/users', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({ msg : error.details[0].message });
                }else{
                    req.body.password = bcrypt.hashSync(req.body.password, 10);
                    Users.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => {res.status(500).json(err)} );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                const result = updateScheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({ msg : error.details[0].message });
                }else{
                    Users.findByPk(id)
                    .then( rows => {
                        userBody = {
                            name : req.body.name,
                            email : req.body.email,
                            password : rows.password,
                            role : req.body.role
                        }
                        Users.update(userBody, { where: { id: id } })
                        .then( num => {
                            if (num == 1){
                                res.status(200).json({msg : "Update successful"});
                            } else {
                                res.status(404).json({msg : "Cannot update user with id :" + id + ". Resource might not exist."});
                            }
                        })
                        .catch( err => res.status(500).json(err) );
                    })
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                Users.destroy({ where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Deletion successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete user with id :" + id + ". Resource might not exist."});
                        }
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;