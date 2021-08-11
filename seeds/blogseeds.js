const { Blogs } = require('../models');

const postData = [{
        title: 'My First Blog App',
        content: 'What you need to know about coding.',
        user_id: 1

    },
    {
        title: 'How to become Good at Code',
        content: 'Anjeh Learns to code through practice.',
        user_id: 2
    },
    {
        title: 'Lets Talk About life',
        content: 'Life is full of ups and some downs. However, the storm will pass.',
        user_id: 3
    }
];

const seedPosts = () => Blogs.bulkCreate(postData);

module.exports = seedPosts;