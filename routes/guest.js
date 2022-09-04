const express = require('express');
const { sequelize, Movies, Categories , Roles, Celebrities, Reviews } = require('../models');
const jwt = require('jsonwebtoken');
const JoiBase = require('joi');
const JoiDate = require('@hapi/joi-date');
const { Op } = require('sequelize');
const Joi = JoiBase.extend(JoiDate);
require('dotenv').config();

const route = express.Router();
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/movies/trending', (req, res) => {
    Movies.findAll({
        attributes: {
          include: [
             [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'reviewsCount']
          ]
        },
        include: [{
          attributes: [],
          model : Reviews,
          as : 'reviews',
          duplicating: false
        }],
        group: ['Movies.id'],
        order: [[sequelize.col("reviewsCount"), "DESC"]],
        limit: 10
      })
      .then( rows => res.json(rows) )
      .catch( err => res.status(500).json(err) );
});

route.get('/movies/toprated', (req, res) => {
    Movies.findAll({
        attributes: {
          include: [
             [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'avgRating']
          ]
        },
        include: [{
          attributes: [],
          model : Reviews,
          as : 'reviews',
          duplicating: false
        }],
        group: ['Movies.id'],
        order: [[sequelize.col("avgRating"), "DESC"]],
        limit: 10
      })
      .then( rows => res.json(rows) )
      .catch( err => res.status(500).json(err) );
});

route.get('/movies/search', (req, res) => {
    Movies.findAll({where : {title : {[Op.like] : `%${req.query.title.toLowerCase()}%`}}, include : ['category']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/movies/count/search', (req, res) => {
    Movies.count({where : {title : {[Op.like] : `%${req.query.title.toLowerCase()}%`}}})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/movies/page/:page/search', (req, res) => {
    Movies.findAll({where : {title : {[Op.like] : `%${req.query.title.toLowerCase()}%`}},
                            offset : (req.params.page - 1) * 10,
                            limit : 10,
                            include : ['category']})
        .then( rows => res.json(rows) )
        .catch( err => res.status(500).json(err) );
});

route.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    Movies.findOne({
        where: {
            id: id
        },
        include: [{
            model: Roles,
            as: 'roles',
            through: {
                where: {
                    movieId: id
                },
                attributes: []
            },
            include: [{
                model: Celebrities,
                as: 'celebrities',
                through: {
                    where: {
                        movieId: id
                    },
                    attributes: []
                }
            }]
        }, 
        {
            model : Categories,
            as :'category'
        }, 
        {
            model : Reviews,
            as : 'reviews',
            include : ['user']
        }]
    })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

route.get('/celebrities/:id', (req, res) => {
    const id = req.params.id;

    Celebrities.findOne({
        where: {
            id: id
        },
        include: [{
            model: Roles,
            as: 'roles',
            through: {
                where: {
                    celebrityId: id
                },
                attributes: []
            },
            include: [{
                model: Movies,
                as: 'movies',
                attributes: ['id', 'title'],
                through: {
                    where: {
                        celebrityId: id
                    },
                    attributes: []
                }
            }]
        }]
    })
    .then( rows => res.json(rows) )
    .catch( err => res.status(500).json(err) );
});

module.exports = route;