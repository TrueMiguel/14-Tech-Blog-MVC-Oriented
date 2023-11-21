const { Model, DataTypes, DATE} = require('sequelize');
const sequelize = require('../config/connections');

class Post extends Model {}

Post.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        }, 
        title: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }, 
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }, 
        isComment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

Post.addHook('beforeCreate', (post) => {
    post.createdAt = new Date();
});

module.exports = Post;