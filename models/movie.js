const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db');

const Movies = sequelize.define('Movies', {    
    name: {
    type: DataTypes.STRING,
    allowNull: false
},
    movie: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        isUrl: true 
    }
},
    image: {
    type: DataTypes.STRING, 
    allowNull: false,
    validate: {
        isUrl: true 
    }
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
    type: DataTypes.STRING,
    allowNull: true
},
    genre: {
    type: DataTypes.STRING,
    allowNull: true
}
});

module.exports = Movies;