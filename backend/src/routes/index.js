const { Router } = require('express');
const userRoutes = require('./user-routes.js');
const financeRoutes = require('./finance-routes.js');

const appRouter = Router();
appRouter.use('/users', userRoutes);


appRouter.use('/', financeRoutes);
module.exports = appRouter;
