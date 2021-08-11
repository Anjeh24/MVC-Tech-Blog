const User = require('./User');
const Blogs = require('./blogs');
const Comments = require('./Comments');

User.hasMany(Blogs, {
  foreignKey: 'user_id',
  
});

Blogs.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"

});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comments.belongsTo(Blogs, {
    foreignKey: 'blogs_id',
    onDelete: "cascade"
});


User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Blogs.hasMany(Comments, {
    foreignKey: 'blogs_id',
    onDelete: "cascade"
})

module.exports = { User, Blogs, Comments };
