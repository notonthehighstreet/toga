# noths-frontend

[![Test Coverage](https://codeclimate.com/repos/56d6f79a4304122460007970/badges/70c559a8e7dbfc647eb1/coverage.svg)](https://codeclimate.com/repos/56d6f79a4304122460007970/coverage)

## Prerequisites

* Node.js v4.3.0
* npm v3.7.1

## Installation

Install node module dependencies

`npm install`

Create webpack module mappings (must be re-run when modules change)

`npm run create-bundle-indexes`

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
