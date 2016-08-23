# Contributing

1. [Getting Toga working locally](#getting-toga-working-locally)
  1. [Installation](#installation)
  2. [Running the servers](#running-the-servers)
  3. [Viewing the components](#viewing-the-components)
  4. [Testing](#testing)
2. [Getting Toga working with Docker](#getting-toga-working-with-docker)
  1. [Installation](#installation-toga)
  2. [Running the servers](#running-the-servers-toga)
  3. [Viewing the components](#viewing-the-components-toga)
  4. [Testing](#testing-toga)
3. [Toga Workflow](#toga-workflow)
  1. [Toga Server](#toga-server)
  2. [Toga Components](#toga-components)
  3. [Submitting code](#submitting-code)

## Getting Toga working locally

### Installation

#### Prerequisites

* Node.js v6.2.2 - Recommend using NVM
* npm v3.10.3
* Redis i.e. `brew install redis`
* PhantomJS i.e. `npm install -g phantomjs-prebuilt`

#### Node Modules

Install node module dependencies

`npm install`

### Running the Servers

#### Redis

Ensure redis is running

`redis-server`

#### Precache components

To have all components ready for serving without compiling on the fly, run

`npm run precache`

#### Run the prod server

`npm start`

#### Development server

Spins up a server under the port of 3001

`npm run dev`

### Viewing the Components

All components can be previewed once the servers are up and running using the localhost url and the name of the component.

To view Components, any required props must be set within the context of that component using the url. e.g.

`http://localhost:8080/v1/button.html?context={"children":"button text","fullWidth":true,"size":"large"}`

### Testing

Our unit tests are written with the help of [Enzyme](https://github.com/airbnb/enzyme) and a few variations of [Chai](https://github.com/chaijs/chai)
([sinon-chai](https://github.com/domenic/sinon-chai), [chai-as-promised](https://github.com/domenic/chai-as-promised), [chai-enzyme](https://github.com/producthunt/chai-enzyme))

 * `npm run lint`
 * `npm run test-unit` or `npm run test-unit -- --watch`
 * `npm run test-integration`

#### e2e

We have end-to-end tests which uses [Nightwatch](https://github.com/nightwatchjs/nightwatch)
 and [PhantomJS](https://github.com/ariya/phantomjs) and also need the servers running first :

 * `npm run dev`
 * `npm run example`
 * `npm run test-e2e`


## Getting Toga working with Docker

<a name="installation-toga"></a>
### Installation
Install node module dependencies

* `Docker` - Recommend using native installations
 - https://docs.docker.com/engine/installation/mac/
 - https://docs.docker.com/engine/installation/linux/
 - https://docs.docker.com/engine/installation/windows/
* `docker-compose` - Comes packaged with Docker

### Running the servers<a name="running-the-servers-toga"></a>

### Basic Server
Starts the server without any development dependencies. This is the closest approximation to what will run on QA and Production environments.

`docker-compose up`

### Development Server
Watches for changes in the following folders and restarts the application picking up the changes.

- `app`
- `components`
- `script`


`docker-compose -f ./docker-compose-dev.yml up`

**NOTE:** Upon making changes in `package.json`, you will need to rebuild the docker container for the respective environment.

```
docker-compose build
docker-compose -f ./docker-compose-dev.yml build
```

<a name="viewing-the-components-toga"></a>
### Viewing the Components

When running in Docker the components are available on the same domain and port as a local installation.


<a name="testing-toga"></a>
### Testing

### Unit and Integration
Run the unit and integration tests within the docker container.

`docker-compose -f ./docker-compose-testing.yml run toga`

To run the test and watch for changes, this will have to be run locally until it is integrated with Docker.

`npm test -- --watch`

### End to End
This has not yet been integrated with Docker and will need to be run locally

## Toga Workflow

### Toga Server

The Toga Server uses [Breadboard](https://github.com/notonthehighstreet/breadboard) which means the code and testing is different from what you might expect.
Please take a look over the Breadboard [README.md](https://github.com/notonthehighstreet/breadboard/blob/master/README.md) to understand how this works.

The Toga Server code lives within `/app` and the corresponding tests within `/tests`.

### Toga Components

Components should be developed in a separate repo which will then be linked during startup following the guide in the [README.md](README.md).

The only exceptions are components which show particular functionality of toga it live in the example components.

The Toga Components is a collection of [React](https://github.com/facebook/react) components which include a `toga.json` file in the root.
Toga Components should be universal i.e. written so that they can be rendered server-side and client-side.

### Submitting Code

We would love some extra hands to help improve the Toga server and the Toga Components.
If you want to help, please try to follow the following workflow to help make PRs accepted quickly.

1. Raise an issue
2. create a branch
3. Write tests
4. Submit a PR
