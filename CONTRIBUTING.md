# Contributing


## Prerequisites

* Node.js v4.4.3 - Recommend using NVM
* npm v3.7.1
* Redis i.e. `brew install redis`

## Installation

Install node module dependencies

`npm install`

Create webpack module mappings (must be re-run when modules change)

`npm run create-bundle-indexes`

## Ensure Redis is running

`redis-server`

## Run the server

`npm start`

## Development server
Spins up an extra server under the default port of 3001, which proxies directly to the Toga server. All the routes remain the same, but get bonus auto reloading on style changes

`npm run dev`

## Tests

Run all the Tests

`npm test`

Run the tests and watch for changes

`npm test -- --watch`