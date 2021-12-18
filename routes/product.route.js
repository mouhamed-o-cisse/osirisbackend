const express = require('express')
const router = express.Router()
const cors = require('cors')

const Product_order = require('../models/product.model')

router.use(cors())


///////////////////////////////////////////////////////////////////////////////////// REGISTRATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REGISTER AN ORDER 
router.post('/new-product', (req, res) => {
  const today = new Date()

  var id =  Math.floor(Math.random() * 100000) ;
 
const product_Data = {
  order_id: id, // To generate
  brand: req.body.brand,
  model: req.body.model,
  registration_date: today
  
}
        Product_order.create(product_Data)
          .then(client_order => {
            let token = jwt.sign(client_order.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })  
          })
    .catch(err => {
      res.send('error: ' + err)
    })
})



// GET PRODUCTS
router.get('/get-products', (req, res, next)=>{
   
  Product_order.findAll({
    order: [
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ], 
  })
  .then(products => {
      if (products) {
        res.json(products)
      } 
    })
    .catch(err => {
      res.send('error: ' + err)
    })     
});


module.exports = router