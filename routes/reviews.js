const express = require('express');
const { sequelize, Reviews, Users } = require('../models');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const e = require('express');
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
    summary : Joi.string().trim().max(50).required(),
    comment : Joi.string().trim().max(200).required(),
    rating: Joi.number().integer().min(1).max(10).required()
});

route.get('/reviews', (req, res) => {
    Reviews.findAll()
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/movie/:id/reviews', (req, res) => {
    Reviews.findAll({where : {movieId : req.params.id}})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/reviews/:id', (req, res) => {
    const id = req.params.id;

    Reviews.findByPk(id)
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.post('/reviews', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Reviews.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/reviews/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                Reviews.findOne({where : {id : id}})
                .then(review => {
                    if(review.userId == req.user.userId){
                    const result = scheme.validate(req.body);
                    const { value, error } = result; 
                    const valid = error == null;

                    if(!valid){
                        res.status(422).json({msg : error.details[0].message});
                    }else{
                        Reviews.update(req.body, { where: { id: id } })
                        .then( num => {
                            if (num == 1){
                                res.status(200).json({msg : "Update successful"});
                            } else {
                                res.status(404).json({msg : "Cannot update review with id :" + id + ". Resource might not exist."});
                            }
                        } )
                        .catch( err => res.status(500).json(err) );
                        }
                    }else{
                        res.status(403).json({ msg: "Invalid credentials"});
                    }
                })
                .catch( err => res.status(500).json(err) )
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.delete('/reviews/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                Reviews.findOne({where : {id : id}})
                .then(review => {
                    if(review.userId == req.user.userId){
                        Reviews.destroy({ where: { id: id } })
                        .then( num => {
                            if (num == 1){
                                res.status(200).json({msg : "Deletion successful"});
                            } else {
                                res.status(404).json({msg : "Cannot delete review with id :" + id + ". Resource might not exist."});
                            }
                        } )
                        .catch( err => res.status(500).json(err) );
                    }else{
                        res.status(403).json({ msg: "Invalid credentials"});
                    }
                })
                .catch( err => res.status(500).json(err));
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;