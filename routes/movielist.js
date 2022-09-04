const express = require('express');
const { sequelize, Movielists, Listgroups, Users, Movies } = require('../models');
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
    label : Joi.string().trim().min(5).max(20).required(),
    description: Joi.string().trim().min(10).max(60).required(),
    userId : Joi.number().integer().required()
});

const list_scheme = Joi.object({
    movieId : Joi.number().integer().required(),
    movielistsId : Joi.number().integer().required()
});

const list_body_scheme = Joi.object({
    list_body : Joi.array().items({
        movieId : Joi.number().integer().required(),
        movielistsId : Joi.number().integer().required()
    })
});

route.get('/movielists', (req, res) => {

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                Movielists.findAll({where : {userId : req.user.userId}})
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.get('/movielists/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.role == 'user') {
            Movielists.findOne({
                where: {
                    id: id,
                },
                include : [{
                    model : Movies,
                    as : 'movies',
                    through : {
                        where: {
                            movielistsId: id
                        },
                        attributes: []
                    },
                    include: ['category']
                }]
            })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
        } else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
    
});

route.get('/movielists/:id/movies', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
    .then( usr => {
        if (usr.role == 'user') {
            Listgroups.findAll({
                where: {
                    movielistsId: id,
                },
                attributes: [],
                include: {
                    model: Movies,
                    as: 'movie',
                    include: ['category']
                }
            })
            .then( rows => res.json(rows) )
            .catch( err => res.status(500).json(err) );
        } else {
            res.status(403).json({ msg: "Invalid credentials"});
        }
    })
    .catch( err => res.status(500).json(err) );
});

route.post('/movielists', (req, res) => {
    
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Movielists.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.post('/movielists/:listId',  async(req, res) => {
    const user = await Users.findOne({where: {id : req.user.userId}});
    if(user.role == "user") {
        const movielists = await Movielists.findOne({where: { userId: req.user.userId, id: req.params.listId }, include : 'listgroups'});
        if(movielists.userId == req.user.userId){
            const result = list_body_scheme.validate(req.body);
            const { value, error } = result; 
            const valid = error == null;

            if(!valid){
                res.status(422).json({msg : error.details[0].message});
            }else{
                const currentList = movielists.toJSON().listgroups;
                const toAddList = req.body.list_body.filter(res => !currentList.map(b => b.movieId).includes(res.movieId));
                const toDeleteList = currentList.filter(res => !req.body.list_body.map(b => b.movieId).includes(res.movieId));
                const deleteIndexes = toDeleteList.map(b => b.movieId);

                if(toAddList.length == 0 && toDeleteList.length == 0){
                    res.status(200).json({message : 'Nothing changed'})
                }else{
                    let t = await sequelize.transaction();
                    try{
                        if(toAddList.length > 1){
                            const listCreate = await Listgroups.bulkCreate(toAddList, {transaction: t});
                        }else if(toAddList.length == 1){
                            const entryCreate = await Listgroups.create(toAddList[0], {transaction: t});
                        }
                        if(toDeleteList.length > 1){
                            const listDelete = await Listgroups.destroy({where : {movieId : deleteIndexes}}, {transaction: t});
                        }else if(toDeleteList.length == 1){
                            const entryDelete = await Listgroups.destroy({where: {movieId : deleteIndexes[0]}}, {transaction: t});
                        }
                        await t.commit();
                        res.status(200).json({ message: 'Done.' });
                    }catch(err){
                        if(t){
                            await t.rollback();
                            res.status(500).json(err);
                        }
                    }
                }
            }

        }else{
            res.status(403).json({ msg: "Invalid credentials"});
        }

    }else{
        res.status(403).json({ msg: "Invalid credentials"});
    }
});

// route.post('/movielists/:listId/movie/:movieId', (req, res) => {

//     Users.findOne({ where: { id: req.user.userId } })
//         .then( usr => {
//             if (usr.role == 'user') {
//                 Movielists.findOne({where: { userId: req.user.userId, movielitsId: req.params.listId }})
//                     .then(list => {
//                         if(list.userId == req.user.userId) {
//                             const result = list_scheme.validate(req.body);
//                             const { value, error } = result; 
//                             const valid = error == null;

//                             if(!valid){
//                                 res.status(422).json({msg : error.details[0].message});
//                             }else{
//                                 Listgroups.create(req.body)
//                                 .then( rows => res.json(rows) )
//                                 .catch( err => res.status(500).json(err) );
//                             }
//                         }else{ 
//                             res.status(403).json({msg : "Invalid credentials"});
//                         }
//                     })
//                     .catch( err => res.status(500).json(err) );
//             } else {
//                 res.status(403).json({ msg: "Invalid credentials"});
//             }
//         })
//         .catch( err => res.status(500).json(err) );
// });

route.put('/movielists/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                Movielists.findOne({where : {id : id}})
                .then(movielist=> {
                    if(movielist.userId == req.user.userId){
                        const result = scheme.validate(req.body);
                        const { value, error } = result; 
                        const valid = error == null;

                        if(!valid){
                            res.status(422).json({msg : error.details[0].message});
                        }else{
                            Movielists.update(req.body, { where: { id: id } })
                            .then( num => {
                                if (num == 1){
                                    res.status(200).json({msg : "Update successful"});
                                } else {
                                    res.status(404).json({msg : "Cannot update review with id :" + id + ". Resource might not exist."});
                                }
                            } )
                            .catch( err => res.status(500).json(err) );;
                        }
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

route.delete('/movielists/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'user') {
                Movielists.findOne({where : {id : id}})
                .then(movielist => {
                    if(movielist.userId == req.user.userId) {
                        Movielists.destroy({ where: { id: id } })
                            .then( num => {
                                if (num == 1){
                                    res.status(200).json({msg : "Deletion successful"});
                                } else {
                                    res.status(404).json({msg : "Cannot delete review with id :" + id + ". Resource might not exist."});
                                }
                            } )
                            .catch( err => res.status(500).json(err) );
                    } else {
                        res.status(403).json({ msg: "Invalid credentials"});
                    }
                } )
                .catch( err => res.status(500).json(err));
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

// route.delete('/listgroups/:id/list/:listId/movie/:movieId', (req, res) => {
//     const id = req.params.id;

//     Users.findOne({ where: { id: req.user.userId } })
//         .then( usr => {
//             if (usr.role == 'user') {
//                 Movielists.findOne({where: { userId: req.user.userId, movielitsId: req.params.listId }})
//                     .then(list => {
//                         if(list.userId == req.user.userId) {
//                             Listgroups.destroy({ where: { id : id } })
//                                 .then( num => {
//                                     if (num == 1){
//                                         res.status(200).json({msg : "Deletion successful"});
//                                     } else {
//                                         res.status(404).json({msg : "Cannot delete review with id :" 
//                                         + id + ". Resource might not exist."});
//                                     }
//                                 } )
//                                 .catch( err => res.status(500).json(err) );
//                         } else { 
//                             res.status(403).json({msg : "Invalid credentials"});
//                         }
//                     })
//                     .catch( err => res.status(500).json(err) );
//             } else {
//                 res.status(403).json({ msg: "Invalid credentials"});
//             }
//         })
//         .catch( err => res.status(500).json(err) );
// });

// route.delete('/listgroups/:id', (req, res) => {
//     const id = req.params.id;

//     Users.findOne({ where: { id: req.user.userId } })
//         .then( usr => {
//             if (usr.role == 'user') {
//                 Listgroups.findOne({where: { id: id }, include: Movielists})
//                     .then(listgroup => {
//                         if(listgroup.movielists.userId == req.user.userId) {
//                             Listgroups.destroy({ where: { id : id } })
//                                 .then( num => {
//                                     if (num == 1){
//                                         res.status(200).json({msg : "Deletion successful"});
//                                     } else {
//                                         res.status(404).json({msg : "Cannot delete review with id :" 
//                                         + id + ". Resource might not exist."});
//                                     }
//                                 } )
//                                 .catch( err => res.status(500).json(err) );
//                         } else {
//                             res.status(403).json({msg : "Invalid credentials"});
//                         }
//                     })
//                     .catch( err => res.status(500).json(err) );
//             } else {
//                 res.status(403).json({ msg: "Invalid credentials"});
//             }
//         })
//         .catch( err => res.status(500).json(err) );
// });

module.exports = route;