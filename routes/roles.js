const express = require('express');
const { sequelize, Roles, Users } = require('../models');
const jwt = require('jsonwebtoken');
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

route.use(authToken);

const scheme = Joi.object({
    role: Joi.string().trim().max(20).required()
});

route.get('/roles', (req, res) => {
    Roles.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/roles', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null; 

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Roles.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/roles/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null; 

                if(!valid){
                    console.log(valid);
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Roles.update(req.body, { where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Update successful"});
                        } else {
                            res.status(404).json({msg : "Cannot update role with id : " + id + ". Resource might not exist."});
                        }
                    } )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/roles/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin') {
                Roles.destroy({ where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Deletion successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete role with id : " + id + ". Resource might not exist."});
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