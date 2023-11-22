const { Model, DataTypes, DATE} = require('sequelize');
const sequelize = require('../config/connections');
const moment = require('moment-timezone');

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
            type: DataTypes.TEXT,
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
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'post',
    }
);

Post.addHook('beforeValidate', (post) => {
    const formattedDate = moment().tz('America/New_York').format('M/D/YYYY');
    post.setDataValue('createdAt', formattedDate);
  });

module.exports = Post;