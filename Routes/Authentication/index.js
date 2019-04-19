
const express = require('express')

const jwt = require('jsonwebtoken')

const authorize = require('../../middleware/auth')

const sanitizeBody = require('../../middleware/sanitizeBody')

const User = require('../../Models/User')

const LoginInfo = require('../../Models/authenticate_attempts')

const router = express.Router()

router.post('/users', sanitizeBody, async (req, res) => {

    try {
  
      let newUser = new User(req.sanitizedBody)

      //newUser.password = await bcrypt.hash(newUser.password, saltRounds)
  
      await newUser.save()
  
      res.status(201).send({data: newUser})
  
    } catch (err) {
  
      console.log(err.message)
  
      res.status(500).send({
  
        errors: [
          {
            status: 'Internal Server Error',
            code: '500',
            title: 'Problem saving document to the database.'
          }
        ]
      })
    }
})


router.get('/users/me',authorize, async ( req, res)=>{

  const user = await User.findById(req.user._id).select('-password -__v')

  if(!user)
  {
      var login= new LoginInfo({

        username : user.firstName,

        ipAddress : req.ip,

        didSucceed : false,

        createAt : new Date()
      })

      login.save()
  }
  else
  {
    var login = new LoginInfo({

      username : user.firstName,

      ipAddress : req.ip,

      didSucceed : true,

      createAt : new Date()

    })

    login.save()
  }
   // console.log(user.)
  
    res.send({data: user})
    
})

router.post('/tokens', sanitizeBody, async (req, res) => {

    const {email, password} = req.sanitizedBody
  
    const user = await User.authenticate(email,password)
  
    if (!user) {
        
      return res.status(401).send({ errors: ['we will build this later'] })
  
    }
  
    res.status(201).send({data: {token : user.generateAuthToken()}})
    // if any condition failed, return an error message
  
    if (!user) {
  
      return res.status(401).send({
  
        errors: [
  
          {
            status: 'Unauthorized',
            code: '401',
            title: 'Incorrect username or password.'
  
          }
        ]
      })
    }
  
})
module.exports = router