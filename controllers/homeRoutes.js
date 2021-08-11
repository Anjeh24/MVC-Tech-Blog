const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogs, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Render the home page
router.get('/', (req, res) => {
  Blogs.findAll({
      attributes: [
          'id',
          'content',
          'title',
          'date_created',
        ],
      order: [[ 'date_created', 'DESC']],
      include: [
          {
              model: User,
              attributes: ['username']
          },
          {
              model: Comments,
              attributes: ['id', 'comments', 'blogs_id', 'user_id'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          }
      ]
  })
  .then(postResponse => {
   const posts = postResponse.map(post => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/post/:id', (req, res) => {
  Blogs.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'content',
      'title',
      'date_created',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
          model: Comments,
          attributes: ['id', 'comments', 'blogs_id', 'user_id'],
          include: {
              model: User,
              attributes: ['username']
          }
      }
    ]
  })
    .then(postResponse => {
      if (!postResponse) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = postResponse.get({ plain: true });
      res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;