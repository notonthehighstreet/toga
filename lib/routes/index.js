const express = require('express');
const appRouter = express.Router();
const marathonRouter = require('./marathon/index');
const publicRouter = require('./public/index');
const componentsRouter = require('./components/index');
const apiVersion = require('../../config/appConfig').apiVersion;

appRouter.use(marathonRouter);
appRouter.use(publicRouter);
appRouter.use(`/v${apiVersion}`, componentsRouter);

module.exports = appRouter;
