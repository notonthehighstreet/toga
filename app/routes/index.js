const express = require('express');
const appRouter = express.Router();
const publicRouter = require('./public');
const componentsRouter = require('./components');

appRouter.use(publicRouter);
appRouter.use(componentsRouter);

module.exports = appRouter;
