const express = require('express');
const middleware = require('./api.middlware')
const globalMiddlewares = require('../middlewares/global.middleware')
const controller = require('./api.controller')

const router = express.Router();



 //router.use(globalMiddlewares.basicAuth)
 router.use(globalMiddlewares.apiKeyAuth)



// get item
router.get('/', controller.Getitems)

router.post('/', globalMiddlewares.checkAdmin, middleware.CheckProgram, controller.Createitems)

router.get('/:id', controller.getOneitem)//(req, res) => {
   // const id = req.params.id
//})
router.patch('/:id', globalMiddlewares.checkAdmin, controller.updateitem)
router.delete('/:id', globalMiddlewares.checkAdmin, controller.deleteitem)
module.exports = router
