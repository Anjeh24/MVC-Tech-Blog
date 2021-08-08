const { User } = require('../models');

const userData = [{
        username: 'Anjeh',
        password: 'abcd'

    },
    {
        username: 'Marie',
        password: '12345'
    },
    {
        username: 'Bruno',
        password: 'efgh'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;