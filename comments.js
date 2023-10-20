// Create web server

// Import express
const express = require('express')

// Create router
const router = express.Router()

// Import comment controller
const commentController = require('../controllers/commentController')

// Import auth controller
const authController = require('../controllers/authController')

// Import user controller
const userController = require('../controllers/userController')

// Import error controller
const errorController = require('../controllers/errorController')

// Import catchAsync
const { catchAsync } = require('../middlewares/catchAsync')

// Import protect
const { protect } = require('../middlewares/protect')

// Import restrictTo
const { restrictTo } = require('../middlewares/restrictTo')

// Import checkObjectId
const { checkObjectId } = require('../middlewares/checkObjectId')

// Create routes
router
  .route('/')
  .get(
    authController.protect,
    catchAsync(commentController.getAllComments)
  )
  .post(
    authController.protect,
    catchAsync(commentController.createComment)
  )

router
  .route('/:id')
  .get(
    authController.protect,
    checkObjectId('id'),
    catchAsync(commentController.getComment)
  )
  .patch(
    authController.protect,
    checkObjectId('id'),
    catchAsync(commentController.updateComment)
  )
  .delete(
    authController.protect,
    checkObjectId('id'),
    catchAsync(commentController.deleteComment)
  )

// Export module
module.exports = router
