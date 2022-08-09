const router = require('express').Router();

//import for user and post routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

//call to use user and post routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;