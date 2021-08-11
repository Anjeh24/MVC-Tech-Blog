const {Comments } = require('../models');

const commentData = [{
        comments: "That's awesome!",
        user_id: 1,
        blogs_id: 1
    },
    {
        comments: "Great analogy.",
        user_id: 2,
        blogs_id: 2
    },
    {
        comments: "That is true about life",
        user_id: 3,
        blogs_id: 3
    }
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;