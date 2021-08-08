const {Comments } = require('../models');

const commentData = [{
        comment_text: "That's awesome!",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Great analogy.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "That is true about life",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;