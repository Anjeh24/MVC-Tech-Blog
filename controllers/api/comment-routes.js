
const router = require('express').Router();
const { Comments } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comments.findAll()
      
      .then(commentResponse => res.json(commentResponse))
      
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comments.create({
      comments: req.body.comments,
      blogs_id: req.body.blogs_id,
      user_id: req.session.user_id
    })
      .then(commentResponse => res.json(commentResponse))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', withAuth, (req, res) => {
    Comments.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(commentResponse => {
          if (!commentResponse) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(commentResponse);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;