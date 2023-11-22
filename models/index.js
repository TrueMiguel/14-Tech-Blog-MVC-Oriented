// there might be some issue with user. it isn't showing up as green as post which I think it needs to. 
const User = require('./User');
const Post = require('./Post');

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Post);

module.exports = { User, Post};