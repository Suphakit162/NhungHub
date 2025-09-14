const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const Movies = sequelize.define('Movies', {    
    name: {
    type: DataTypes.STRING,
    allowNull: false
},
    image: {
    type: DataTypes.STRING,
    allowNull: false
},
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
},
    description: {
    type: DataTypes.TEXT,
    allowNull: true
},
    genre: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
},
    review: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: true
}
});


module.exports = Movies;