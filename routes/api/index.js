const router = require('express').Router();
const ThoughtRoutes = require('./thoughtRoutes');
const UserRoutes = require('./userRoutes');

router.use('/Thoughts', ThoughtRoutes);
router.use('/Users', UserRoutes);

module.exports = router;
