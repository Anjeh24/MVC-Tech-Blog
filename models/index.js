const User = require('./User');
const Blogs = require('./Blogs');
const Blogs = require('./Comments');
const Comments = require('./Commenting');

User.hasMany(Blogs, {
  foreignKey: 'user_id',
  
});

Blogs.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "cascade"

});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'Blogs_id',
    onDelete: "cascade"
});


User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Blogs.hasMany(Comments, {
    foreignKey: 'Blogs_id',
    onDelete: "cascade"
})

module.exports = { User, Blogs, Comments };
