const express = require('express');
const appRouter = express.Router();
const marathonRouter = require('./marathon/index');
const publicRouter = require('./public/index');
const componentsRouter = require('./components/index');

appRouter.use(marathonRouter);
appRouter.use(publicRouter);
appRouter.use(componentsRouter);

module.exports = appRouter;
