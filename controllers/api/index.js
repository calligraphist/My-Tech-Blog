const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bolgRoutes = require('./blogRoutes');

router.use('/user', userRoutes);
router.use('/blog', bolgRoutes);

module.exports = router;
