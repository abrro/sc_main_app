const express = require('express');
const { sequelize, Categories, Users } = require('../models');
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
    label: Joi.string().trim().max(40).required()
});

route.get('/categories', (req, res) => {
    Categories.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/categories/:id', (req, res) => {
    const id = req.params.id;

    Categories.findByPk(id)
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/categories', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null; 

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Categories.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/categories/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null; 

                if(!valid){
                    console.log(valid);
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Categories.update(req.body, { where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Update successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete category with id : " + id + ". Resource might not exist."});
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

route.delete('/categories/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
                Categories.destroy({ where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Deletion successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete category with id : " + id + ". Resource might not exist."});
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