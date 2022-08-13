//import User, Post, Vote model
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

//create associations between tables using foreign key 'user_id'
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id',
});

Post.belongsToMany(User, {
    through: Vote,
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});


//export User, Post object
module.exports = { User, Post, Vote };