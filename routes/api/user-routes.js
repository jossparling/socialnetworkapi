const router = require('express').Router();
const mongoose = require('../../config/connection');
const { User, Thought } = require('../../models');

// get all users
router.get('/', (req, res) => {
    Post.findall({
        attributes: [
            'username',
            'email',
            'thought',
            'friends'
        ],
        include: [
            {
                model: Thought,
                attributes: ['thoughtTest', 'createdAt', 'username', 'reactions'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;