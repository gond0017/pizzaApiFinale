const sanitizeBody = require('../middleware/sanitizeBody')

const Student = require('../Models/student')

const express = require('express')

const User = require('../Models/User')

const authenticate = require('../middleware/auth')

const router = express.Router()

router.get('/', async (req, res) => {

  const student = await Student.find();

  res.send({
    data: student
  })

})

router.post('/', authenticate, sanitizeBody, async (req, res) => {

  let user = await User.findById(req.user._id)

  if (user.isAdmin) {

    let newStudent = new Student(req.sanitizedBody)

    await newStudent.save()

    res.status(201).send({
      
      data: newStudent
    })


  } else {

    res.status(401).send({

      errors: [{

        status: 'Unauthorize User',
        code: '401',
        title: 'You have no permission to Access database'

      }]
    })

  }

})


router.get('/:id', async (req, res) => {

  try {

    const student = await Student.findById(req.user.id)

    if (!student) throw new Error('Resource not found')

    res.send({
      data: student
    })

  } catch (err) {

    console.error(err)

    sendResourceNotFound(req, res)
  }

})


const update = (overwrite = false) => async (req, res) => {

  let user = await User.findById(req.params._id);

  if(user.isAdmin)
  {
    try {

      const student = await Student.findByIdAndUpdate(
  
        req.params.id,
  
        req.sanitizedBody,
  
        {
  
          new: true,
          overwrite,
          runValidators: true
  
        }
      )
      if (!student) throw new Error('Resource not found')
  
      res.send({

        data: student
      })
  
    } catch (err) {

      console.log(err.message);

      sendResourceNotFound(req, res)
    }
  }
  else
  {
    res.status(401).send({

      errors: [{

        status: 'Unauthorize User',
        code: '401',
        title: 'You have no permission to Access database'

      }]
    })
  }
  
}

router.patch('/:id',authenticate, sanitizeBody, update((overwrite = false)))

router.put('/:id',authenticate ,sanitizeBody, update((overwrite = true)))


router.delete('/:id',authenticate, async (req, res) => {

  let user = await User.findById(req.params._id)

  if(user.isAdmin)
  {

    try {

      const student = await Student.findByIdAndRemove(req.user.id)
  
      if (!student) throw new Error('Resource not found')
  
      res.send({
        data: student
      })
  
    } catch (err) {
  
      sendResourceNotFound(req, res)
  
    }
  }
  else
  {

    res.status(401).send({

      errors: [{

        status: 'Unauthorize User',
        code: '401',
        title: 'You have no permission to Access database'

      }]
    })

  }

  
})


function sendResourceNotFound(req, res) {
  {
    console.log(res.message)
    res.status(404).send({

      errors: [{

        status: 'Not found',

        code: '404',

        title: 'Return does not exist',

        description: `We could not find a Student with id : ${req.params.id}`
      }]
    })
  }

}
module.exports = router