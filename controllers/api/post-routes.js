
const router = require('express').Router();

const { User, Blogs, Comments } = require('../../models');

const sequelize = require('../../config/connection');

const withAuth = require('../../utils/auth');


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
    .then(postResponse => res.json(postResponse))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
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
        res.json(postResponse);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
    Blogs.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(postResponse => res.json(postResponse))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Blogs.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postResponse => {
        if (!postResponse) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(postResponse);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Blogs.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postResponse => {
        if (!postResponse) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postResponse);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;