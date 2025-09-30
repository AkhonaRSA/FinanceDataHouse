const { Router } = require('express');
const userRoutes = require('./user-routes.js');
const financeRoutes = require('./finance-routes.js');

const appRouter = Router();
appRouter.use('/users', userRoutes);

// mount finance routes at root (so /api/finances/upload/:userId/:year and /api/finances/:userId/:year)
appRouter.use('/', financeRoutes);

module.exports = appRouter;
