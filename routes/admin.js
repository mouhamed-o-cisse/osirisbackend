const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin.modal')
router.use(cors())

process.env.SECRET_KEY = 'secret'


router.post('/login', (req, res) => {
  Admin.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
    .then(admin => {
      if (admin) {
        let token = jwt.sign(admin.dataValues, process.env.SECRET_KEY, {
          expiresIn: 86400
        })
        res.json({ token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    }) 
})


// PROFILE

// router.get('/profile', (req, res) => {
//   var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

//   Admin.findOne({
//     where: {
//       admin_id: decoded.admin_id 
//     }
//   })
//     .then(admin => {
//       if (admin) {
//         res.json(admin)
//       } else { 
//         res.send('admin does not exist')
//       }
//     }) 
//     .catch(err => {
//       res.send('error: ' + err) 
//     })
// })


module.exports = router 