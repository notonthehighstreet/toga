const express = require('express');
const appRouter = express.Router();
const publicRouter = require('./public/index');
const componentsRouter = require('./components/index');

appRouter.use(publicRouter);
appRouter.use(componentsRouter);

module.exports = appRouter;
