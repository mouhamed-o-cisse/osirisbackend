const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'login',
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
          },
          username: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          }
    },
    {
        timestamps: false
    }
)

// module.exports = (sequelize, Sequelize) => {
//     const Tutorial = sequelize.define("tutorial", {
//       title: {
//         type: Sequelize.STRING
//       },
//       description: {
//         type: Sequelize.STRING
//       },
//       published: {
//         type: Sequelize.BOOLEAN
//       }
//     });
  
//     return Tutorial;
//   };