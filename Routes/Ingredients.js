// const Course = require('../Models/Ingredient')

// const sanitizeBody = require('../middleware/sanitizeBody')

// const express = require('express')

// let User = require('../Models/User')

// let authenticate = require('../middleware/auth')

// const router = express.Router()

// router.get('/', async(req, res, ) => {

//     const course=await Course.find().populate('students');

//     res.send({Courses : course})
// })


// router.post('/', authenticate, sanitizeBody, async ( req, res) =>{

//     let user = await User.findById(req.user._id)

//     if(user.isAdmin)
//     {

//         let newcourse = new Course(req.sanitizedBody)

//         await newcourse.save()

//         res.status(201).send({ data: newcourse })


//     }
//     else
//     {   

//         res.status(401).send({

//             errors: [{
      
//               status: 'Unauthorize User',
//               code: '401',
//               title: 'You have no permission to Access database'
      
//             }]
//           })

//     }

// })


// router.get('/:id', async (req, res) =>{

//     try{

//         const course = await Course.findById(req.params.id).populate('students')

//         if(!course) throw new Error('Resourse not found')

//         res.send({Courses : course})
//     }
//     catch(err)
//     {

//         console.log(err)

//         sendResourceNotFound(req, res)
//     }
// })

// const update = (overwrite = false) => async (req, res) => {


//     let user = await User.findById(req.user._id)

//     if(user.isAdmin)
//     {

//         try {

//             const course = await Course.findByIdAndUpdate(
      
//               req.params.id,
      
//               req.sanitizedBody,
      
//               {
//                 new: true,
//                 overwrite,
//                 runValidators: true
//               }
//             )
      
//             if (!course) throw new Error('Resource not found')
      
//             res.send({ data: course })
      
//           } 
//           catch (err)
//            {
      
//             sendResourceNotFound(req, res)
      
//           }

//     }
//     else
//     {
//         res.status(401).send({

//             errors: [{
      
//               status: 'Unauthorize User',
//               code: '401',
//               title: 'You have no permission to Access database'
      
//             }]
//           })
//     }

//   }
  
// router.put('/:id',authenticate, sanitizeBody, update((overwrite=true)))
  
// router.patch('/:id', authenticate, sanitizeBody, update((overwrite=false)))


// router.delete('/:id', authenticate, async (req,res) => {

//     let user = await User.isAdmin(req.user._id)

//     if(user.isAdmin)
//     {
//         try {

//             const course = await Course.findByIdAndRemove(req.params.id)
    
//             if(!course) throw Error('Resource not found')
    
//             res.send({Courses : course})
//         }
//         catch(err){
    
//             sendResourceNotFound(req,res)
//         }

//     }
//     else
//     {
//         res.status(401).send({

//             errors: [{
      
//               status: 'Unauthorize User',
//               code: '401',
//               title: 'You have no permission to Access database'
      
//             }]
//           })
//     }

    
// })

// function sendResourceNotFound(req,res)
// {
//     {
//         res.status(404).send({

//             error : [
//                 {

//                     status : 'Not found',

//                     code : '404',

//                     title : 'Return does not exist',

//                     description : `We could not find a course with id : ${req.params.id}`
//                 }
//             ]
//         })
//     }
// }

// module.exports = router;
