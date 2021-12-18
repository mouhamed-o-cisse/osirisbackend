const Sequelize = require('sequelize');
const db = require("../database/db")

module.exports = db.sequelize.define(
    'order',
    {
        order_id: {
            type: Sequelize.STRING,
            primaryKey: true
            // autoIncrement: true
        },
        names: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },        
        address: {
            type: Sequelize.STRING
        },
        comment: {
            type: Sequelize.STRING
        },        
        brand1: {
            type: Sequelize.STRING
        },
        model1: {
            type: Sequelize.STRING
        },        
        watch_price1: {
            type: Sequelize.STRING
        },
        brand2: {
            type: Sequelize.STRING
        },
        model2: {
            type: Sequelize.STRING
        },        
        watch_price2: {
            type: Sequelize.STRING
        },
        brand3: {
            type: Sequelize.STRING
        },
        model3: {
            type: Sequelize.STRING
        },        
        watch_price3: {
            type: Sequelize.STRING
        },
        delivery_price: {
            type: Sequelize.STRING
        },    
        order_date: {
            type: Sequelize.DATE
        },        
        delivery_date: {
            type: Sequelize.DATE
        },     
        order_treatement: {
            type: Sequelize.STRING
        },
        order_status: {
            type: Sequelize.STRING
        },   
        payment_status: {
            type: Sequelize.STRING
        },
        print_status: {
            type: Sequelize.STRING
        },      
        delivery_status: {
            type: Sequelize.STRING
        },
        delivery_guy: {
            type: Sequelize.STRING
        },
        delivery_guy_phone_number: {
            type: Sequelize.STRING
        },
        registration_date: {
            type: Sequelize.DATE
        },                
    },
    {
        timestamps: false
    }
)