const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Session = require('./session');

User.hasMany(Post, {
    foreignKey: 'author_id',
    allowNull: false,
});
Post.belongsTo(User, {
    foreignKey: 'author_id',
    allowNull: false,
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    allowNull: false,
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    allowNull: false,
});

User.hasMany(Comment, {
    foreignKey: 'author_id',
    allowNull: false,
});
Comment.belongsTo(User, {
    foreignKey: 'author_id',
    allowNull: false,
});

module.exports = { User, Post, Comment, Session };