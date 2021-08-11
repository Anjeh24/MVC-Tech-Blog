const { User } = require('../models');

const userData = [{
        username: 'Anjeh',
        password: 'abcdefgh',
        email: 'anjeh@test.com'
    },
    {
        username: 'Marie',
        password: '12345678',
        email: 'marie@test.com'
    },
    {
        username: 'Bruno',
        password: 'efghijkl',
        email: 'bruno@test.com'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;