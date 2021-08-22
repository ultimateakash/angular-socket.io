'use strict';
module.exports = (sequelize, DataTypes) => { 
    
    const Movie = sequelize.define('Movie', { 
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        rating: DataTypes.INTEGER
    }, {
        underscored: true
    })

    Movie.associate = function(models) {
        // define your relations 
    }

    return Movie;
};
