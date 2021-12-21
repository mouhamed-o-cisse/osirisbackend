const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");

const Client_order = require('../models/order.model')
router.use(cors())

process.env.SECRET_KEY = 'secret'

///////////////////////////////////////////////////////////////////////////////////// REGISTRATION ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REGISTER AN ORDER 
router.post('/neworder', (req, res) => {
  const today = new Date()

  var id = 'ORDER-' + req.body.brand1 + '-' + Math.floor(Math.random() * 100000) + '-' + req.body.phone_number;

const client_orderData = {
  order_id: id, // To generate
  names: req.body.names,
  phone_number: '+221' + ' ' +  req.body.phone_number,
  address: req.body.address,
  brand1: req.body.brand1,
  model1: req.body.model1,
  watch_price1: req.body.watch_price1,
  brand2: req.body.brand2,
  model2: req.body.model2,
  watch_price2: req.body.watch_price2,
  brand3: req.body.brand3,
  model3: req.body.model3,
  watch_price3: req.body.watch_price3,
  delivery_price: req.body.delivery_price,
  order_date: req.body.order_date,
  order_treatement: 'not-treated',
  order_status:'in-preparation',
  payment_status: 'unpaid',
  registration_date: today
  
}
        Client_order.create(client_orderData)
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

// UPDATE ORDER PRINT STATUS IF 
router.put('/update-print_status/:order_id', (req, res)=>{

  if(req.body.print_status == 'printed'){
    const postData = {
       print_status: 'printed',
       delivery_status: 'in-preparation'
      //  order_treatement: 'treated',
      } 
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }

  else {
    const postData = {
       print_status: 'something is wrong',
      //  delivery_status: 'treated',
      } 
      const id = req.params.order_id;
      Client_order.update(postData,  
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  } 
})

// UPDATE ORDER STATUS IF 
router.put('/update-order_status/:order_id', (req, res)=>{

  if(req.body.order_status == 'unavailable'){
    const postData = {
       order_status: 'unavailable',
       order_treatement: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }
  
  else if (req.body.order_status == 'reservation'){
    const postData = {
      order_status: 'reservation', 
      order_treatement: 'treated',
      delivery_date: req.body.delivery_date,
     }
     const id = req.params.order_id;  
     Client_order.update(postData, 
              { 
                where: {
                   order_id: id
                 } 
               }
              ).then((client_order) => {
                if(client_order){
                 res.status(200).json({msg:"updated succesfully"});
                }
                else {
                  res.send('client_order not found')
                }
              })
              .catch(err => {
               res.send('error: ' + err)
             })  
  }
  
  else if  (req.body.order_status == 'confirmed') {
    const postData = {
       comment: req.body.comment,
      //  delivery_price: req.body.delivery_price,
       delivery_date: req.body.delivery_date,
       order_status: 'confirmed',
       order_treatement: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }  

  else  if  (req.body.order_status == 'cancelled') {
    const postData = {
       order_status: 'cancelled',
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }  

  else {
    const postData = {
       order_status: 'something is wrong',
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  } 
})

// UPDATE ORDER DELIVERY STATUS IF 
router.put('/update-delivery_status/:order_id', (req, res)=>{

  if(req.body.delivery_status == 'in-preparation'){
    const postData = {
      delivery_status: 'in-preparation',
      //  order_treatement: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }
  
  else if (req.body.delivery_status == 'in-delivery'){
    const postData = {
      delivery_status: 'in-delivery',
      // order_treatement: 'treated',
      // delivery_date: req.body.delivery_date,
     }
     const id = req.params.order_id;  
     Client_order.update(postData, 
              { 
                where: {
                   order_id: id
                 } 
               }
              ).then((client_order) => {
                if(client_order){
                 res.status(200).json({msg:"updated succesfully"});
                }
                else {
                  res.send('client_order not found')
                }
              })
              .catch(err => {
               res.send('error: ' + err)
             })  
  }

  else if (req.body.delivery_status == 'delivered') {
    const postData = {
      delivery_status: 'delivered',
      payment_status: 'paid'
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }  

  
  else if (!req.body.delivery_status) {
    const postData = {
      delivery_status: 'Something wrong',
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  } 

  else {
    const postData = {
      delivery_status: 'very strange',
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('Something went wrong')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }  
})

// UPDATE ORDER PAID STATUS
router.put('/update-payment_status/:order_id', (req, res)=>{

  if(req.body.payment_status == 'paid'){
    const postData = {
      payment_status: 'paid',
      //  order_treatement: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('client_order not found')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }
  
  else {
    const postData = {
      payment_status: 'very strange',
      //  delivery_status: 'treated',
      }
      const id = req.params.order_id;
      Client_order.update(postData, 
               { 
                 where: {
                    order_id: id
                  } 
                }
               ).then((client_order) => {
                 if(client_order){
                  res.status(200).json({msg:"updated succesfully"});
                 }
                 else {
                   res.send('Something went wrong')
                 }
               })
               .catch(err => {
                res.send('error: ' + err)
              })  
  }  
})

///////////////////////////////////////////////////////////////////////////////////// FETCHING ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// GET UNTREATED ORDERS
router.get('/get-untreated', (req, res, next)=>{
   
    Client_order.findAll({
      order: [
        ['registration_date', 'DESC'], // Sorts by id in descending order
    ],
    attributes:['order_id','names','phone_number','address','brand1','model1','watch_price1','brand2','model2','watch_price2','brand3','model3','watch_price3','order_date'],
    where: {
      order_treatement: 'not-treated'
    }

    })
    .then(client_order => {
        if (client_order) {
          res.json(client_order)
        } 
      })
      .catch(err => {
        res.send('error: ' + err)
      })     
 });


 // GET UNAVAILABLE CLIENTS
router.get('/get-unavailable-clients', (req, res, next)=>{
   
  Client_order.findAll({
    order: [
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id','names','phone_number','address','brand1','model1','watch_price1','brand2','model2','watch_price2','brand3','model3','watch_price3','order_date'],
  where: {
    order_treatement: 'treated',
    order_status: 'unavailable'
  }

  })
  .then(client_order => {
      if (client_order) {
        res.json(client_order)
      } 
    })
    .catch(err => {
      res.send('error: ' + err)
    })     
});


// GET RESERVATIONS
router.get('/get-reservations', (req, res, next)=>{
   
  Client_order.findAll({
    order: [
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id','names','phone_number','address','brand1','model1','watch_price1','brand2','model2','watch_price2','brand3','model3','watch_price3','order_date','comment','order_status','delivery_date'],
  where: {
    order_treatement: 'treated',
    order_status:'reservation'
    // order_status: {
    //   [Op.or]: ['confirmed', 'delivered', 'in-delivery']
    // }
  }
  })
  .then(client_order => {
      if (client_order) {
        res.json(client_order)
      } 
    })
    .catch(err => {
      res.send('error: ' + err)
    })     
});

// GET CONFIRMED ORDERS
router.get('/get-delivered-orders', (req, res, next)=>{
   
  Client_order.findAll({
    order: [ 
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id','names','phone_number','address','brand1','model1','watch_price1','brand2','model2','watch_price2','brand3','model3','watch_price3','order_date','comment','order_status',
  'delivery_date','delivery_status','payment_status','print_status'],
  where: {
    order_treatement: 'treated',
    order_status: {
      [Op.or]: ['confirmed']
    },
    delivery_status: {
      [Op.or]: ['delivered']
    }
   
  }
})
.then(client_order => {
    if (client_order) {
      res.json(client_order)
    } 
  })
  .catch(err => {
    res.send('error: ' + err)
  })     
});
 

// GET CONFIRMED ORDERS
router.get('/get-confirmed-orders', (req, res, next)=>{
   
  Client_order.findAll({
    order: [ 
      ['registration_date', 'DESC'], // Sorts by id in descending order
  ],
  attributes:['order_id','names','phone_number','address','brand1','model1','watch_price1','brand2','model2','watch_price2','brand3','model3','watch_price3','order_date','comment','order_status',
  'delivery_date','delivery_status','payment_status','print_status'],
  where: {
    order_treatement: 'treated',
    order_status: {
      [Op.or]: ['confirmed']
    },
    delivery_status: {
        [Op.or]: ['in-preparation', 'in-delivery',""]
      }
  }

  })
  .then(client_order => {
      if (client_order) {
        res.json(client_order)
      } 
    })
    .catch(err => {
      res.send('error: ' + err)
    })     
});


// GET ONE POST NOT TOUCHED

router.get('/get-one/:order_id', (req, res) => {
  const id = req.params.order_id;

  Client_order.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    }); 
}) 

// GET CLIENT POSTS OF A MERCHANDISE
router.get('/client-posts-merchandise/:merchandise_type', (req, res) => {
  const m_type = req.params.merchandise_type;

  client_order.findAll({
    where: {
      merchandise_type : m_type
    },
    order: [
      ['created', 'DESC'], // Sorts by id in descending order
       ],
  })  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + m_type
      });
    });
})


// GET CLIENT POSTS
router.get('/client-posts/:client_id', (req, res) => {
  const id = req.params.client_id;

  client_order.findAll({
    where: {
      client_id : id
    },
    order: [
      ['created', 'DESC'], // Sorts by id in descending order
       ],
  }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
})







 
module.exports = router