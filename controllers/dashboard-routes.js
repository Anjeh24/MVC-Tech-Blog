const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogs, User, Comments } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
  Blogs.findAll({
      where: {
       user_id: req.session.user_id
      },
      attributes: [
        'id',
        'content',
        'title',
        'date_created',
      ],
      include: [
        {
          model: Comments,
          attributes: ['id', 'comments', 'blogs_id', 'user_id'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(postResponse => {
        const posts = postResponse.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// A route to edit a post
router.get('/edit/:id', withAuth, (req, res) => {
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
        model: Comments,
        attributes: ['id', 'comments', 'blogs_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(postResponse => {
      if (!postResponse) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = postResponse.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edituser', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(userResponse => {
      if (!userResponse) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      const user = userResponse.get({ plain: true });
      res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;