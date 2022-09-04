const express = require('express');
const { sequelize, Movies, Users, Roles, Celebrities, Categories, Moviegroups, Reviews } = require('../models');
const jwt = require('jsonwebtoken');
const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');
const { Op } = require('sequelize');
const Joi = JoiBase.extend(JoiDate);
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
    title: Joi.string().trim().max(150).required(),
    synopsis: Joi.string().min(50).max(200).required(),
    release_date: Joi.date().format("YYYY-MM-DD").required(),
    categoryId: Joi.number().integer().required()
});

route.get('/movies', (req, res) => {
    Movies.findAll({
        include: ['category']
    })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

route.get('/category/:id/movies', (req, res) => {
    Movies.findAll({where : {categoryId : req.params.id}})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

// route.get('/movies/search', (req, res) => {
//     Movies.findAll({where : {title : {[Op.like] : `%${req.query.title.toLowerCase()}%`}}, include : ['category']})
//         .then( rows => res.json(rows) )
//         .catch( err => res.status(500).json(err) );
// });

// route.get('/movies/count/search', (req, res) => {
//     Movies.count({where : {title : {[Op.like] : `%${req.query.title.toLowerCase()}%`}}})
//         .then( rows => res.json(rows) )
//         .catch( err => res.status(500).json(err) );
// });

// route.get('/movies/page/:page/search', (req, res) => {
//     Movies.findAll({where : {title : {[Op.like] : `%${req.query.title.toLowerCase()}%`}},
//                             offset : (req.params.page - 1) * 10,
//                             limit : 10,
//                             include : ['category']})
//         .then( rows => res.json(rows) )
//         .catch( err => res.status(500).json(err) );
// });

// route.get('/movies/trending', (req, res) => {
//     Movies.findAll({
//         attributes: {
//           include: [
//              [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'reviewsCount']
//           ]
//         },
//         include: [{
//           attributes: [],
//           model : Reviews,
//           as : 'reviews',
//           duplicating: false
//         }],
//         group: ['Movies.id'],
//         order: [[sequelize.col("reviewsCount"), "DESC"]],
//         limit: 10
//       })
//       .then( rows => res.json(rows) )
//       .catch( err => res.status(500).json(err) );
// });

// route.get('/movies/toprated', (req, res) => {
//     Movies.findAll({
//         attributes: {
//           include: [
//              [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'avgRating']
//           ]
//         },
//         include: [{
//           attributes: [],
//           model : Reviews,
//           as : 'reviews',
//           duplicating: false
//         }],
//         group: ['Movies.id'],
//         order: [[sequelize.col("avgRating"), "DESC"]],
//         limit: 10
//       })
//       .then( rows => res.json(rows) )
//       .catch( err => res.status(500).json(err) );
// });

// route.get('/trending2', (req, res) => {
//     Movies.findAll({
//         attributes: {
//             include : [
//             [sequelize.literal('(SELECT COUNT(*) FROM Reviews WHERE Reviews.movieId = Movies.id)'), 'ReviewCount']
//             ]
//         },
//         order: [[sequelize.literal('ReviewCount'), 'DESC']]
//     })
//       .then( rows => res.json(rows) )
//       .catch( err => res.status(500).json(err) );
// });

// route.get('/movies/:id', (req, res) => {
//     const id = req.params.id;

//     Movies.findOne({
//         where: {
//             id: id
//         },
//         include: [{
//             model: Roles,
//             as: 'roles',
//             through: {
//                 where: {
//                     movieId: id
//                 },
//                 attributes: []
//             },
//             include: [{
//                 model: Celebrities,
//                 as: 'celebrities',
//                 through: {
//                     where: {
//                         movieId: id
//                     },
//                     attributes: []
//                 }
//             }]
//         }, 'category']
//     })
//     .then( rows => res.json(rows) )
//     .catch( err => res.status(500).json(err) );
// });

route.post('/movies', (req, res) => {
      
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
            
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Movies.create(req.body)
                    .then( rows => res.json(rows) )
                    .catch( err => res.status(500).json(err) );
                }
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.put('/movies/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
               
                const result = scheme.validate(req.body);
                const { value, error } = result; 
                const valid = error == null;

                if(!valid){
                    res.status(422).json({msg : error.details[0].message});
                }else{
                    Movies.update(req.body, { where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Update successful"});
                        } else {
                            res.status(404).json({msg : "Cannot update movie with id :" + id + ". Resource might not exist."});
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

route.delete('/movies/:id', (req, res) => {
    const id = req.params.id;

    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
                Movies.destroy({ where: { id: id } })
                    .then( num => {
                        if (num == 1){
                            res.status(200).json({msg : "Deletion successful"});
                        } else {
                            res.status(404).json({msg : "Cannot delete movie with id :" + id + ". Resource might not exist."});
                        }
                    } )
                    .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

route.post('/movies/crew', (req, res) => {
      
    Users.findOne({ where: { id: req.user.userId } })
        .then( usr => {
            if (usr.role == 'admin' || 'content_creator') {
                req.body.forEach(el => {
                   el.createdAt = new Date();
                   el.updatedAt = new Date();
                });

                console.log(req.body);

                Moviegroups.bulkCreate(req.body)
                .then( rows => res.json(rows) )
                .catch( err => res.status(500).json(err) );
            } else {
                res.status(403).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

module.exports = route;