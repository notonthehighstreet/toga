const express = require('express');
const appRouter = express.Router();
const serverStatusRouter = require('./serverStatus/index');
const publicRouter = require('./public/index');
const componentsRouter = require('./components/index');
const apiVersion = require('../../config/getAppConfig')().apiVersion;

appRouter.use(serverStatusRouter);
appRouter.use(publicRouter);
appRouter.use(`/v${apiVersion}`, componentsRouter);

module.exports = appRouter;
