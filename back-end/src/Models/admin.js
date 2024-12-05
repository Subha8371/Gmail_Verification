const { Sequelize, DataTypes } = require('sequelize');
const sequelize =require('../database/db')


const Admin = sequelize.define(
  'Admin',
  {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // New users are not verified by default
    },
    emailToken:{
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, 
    }
  },
  {
    tableName: 'admin',
    timestamps: false
}
);



module.exports = Admin;