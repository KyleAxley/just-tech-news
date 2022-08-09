//import User, Post model
const User = require('./User');
const Post = require('./Post');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//export User, Post object
module.exports = { User, Post };