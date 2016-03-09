# Toga Coding Guidelines

These aim to achieve consistent coding practices throughout the project.

## Convention related concepts

| concept | description |
| ------- | ----------- |
| module | A CommonJS module. |
| bundle | A single file containing Webpack wrapped CommonJS modules. |
| package | A self-contained NPM compatible module stored in `/packages`. |

## Code structure

### Directories

| path | description |
| ---- | ----------- |
| `/components` | contains Toga components |
| `/lib` | contains code of the Toga server itself |
| `/packages` | constains packages to use throughout Toga components |
| `/script` | support scripts for running tests, starting Toga in a Docker container etc. |
| `/spec` | tests for the Toga server itself |

### Modules

#### One function per module
Include one function per module, AKA the Substack pattern. Also, give the function a name so that profiling and debugging becomes less cryptic.
In other words, your module should end with this:

```js
// myThingy.js
module.exports = function myThingy(/*my args*/) {
  // my code
}
```

To organise functions around specific concepts, use the file system, ie. create your own directory structure.

#### No side effects
Module scoped, in the JavaScript sense, variables persist in memory within the module cache. This makes it tempting to introduce state. As an example, take this simple module for keeping a registry of values:

```js
// registry.js

const registry = [];

module.exports = {
  add: (val) => {
    registry.push(val);
  }
  /* some other useful functions to work with the registry */
}
```

You can then include it in your other module:

```js
// myModule.js
const registry = require('./registry');
const myData = require('./data.json');

module.exports = () => {
  myData.forEach(registry.add); //side effect
  registry.doSomethingUseful(); //side effect
}
```

Now we have a shared registry open to abuse and time-consuming to debug. When an operation is executed on it, the information about which part of the program has ordered that operation gets lost as soon as it's finished. This enforces bisection or other methods of deep exploring the program's routines to identify a culprit.
On top of that, it dictates extra complexity and labour in asynchronous scenarios to achieve predictable concurrency.
With "one function per module" and "no side effects" principles in mind, the stack is flat, clutter free and open to explore.

## Naming

### Creation, instantiating

When coding a function that returns an object (think factory), use `create` as the prefix, and then the subject, eg. `createWebpackConfig`.

## Indirection

When picking a tool for a specific job, use a layer of indirection. For example, let's suppose you need to implement caching. From the perspective of the client modules, which will be interested in storing/retrieving information, you could need 2 functions, `getCache` and `setCache`. Let's look at this piece of middleware using `getCache`:

```js
// retrieveCachedResponse.js
const getCache = require('./lib/cache/getCache');
const retrieveCachedResponse = (req, res, next) => {
  getCache(req.url)
    .then(res.send.bind(res))
    .catch(() => {
      next();
    });
};
```

To supply the needed `getCache` function, create a module which will become the said indirection:

```js
// /lib/cache/getCache.js
const thirdPartyCacheProviderClient = require('thirdPartyCacheProviderClient');

module.exports = (...args) => {
  return thirdPartyCacheProviderClient.get.apply(thirdPartyCacheProviderClient, args);
};
```

This way there's a single point of dependency on a third party tool. Switching to another one if needed becomes trivial, as opposed to changing the usage in all cache client modules.

## Promises

Use promises for asynchrounous operations. 

Utilise promise chaining to create success/error routines instead of wrapping promises with other promises.
This module has an extraneous promise wrapping an already existing chain:

```js
// myModule.js

const thirdPartyLib = require('thirdPartyLib');

module.exports = function myExportedFn(someArgForTheLib) {
  return new Promise((resolve, reject) => {
    return thirdPartyLib({someArgForTheLib}).then(resolve).catch(reject);
  });
};
```

This module is returning the existing chain:
```js
// myModule.js

const thirdPartyLib = require('thirdPartyLib');

module.exports = function myExportedFn(someArgForTheLib) {
    return thirdPartyLib({someArgForTheLib});
};
```

If you need to rescue a promise, ie. revert from an error to a success path again in certain conditions, use `return` and `throw`:

```js
// myModule.js

const thirdPartyLib = require('thirdPartyLib');

module.exports = function myExportedFn(someArgForTheLib) {
    return thirdPartyLib({someArgForTheLib}).catch((reason) => {
      if (canWeRescue(reason)) {
        return computeExpectedData(reason); // this return value will be picked up by the next onResolve, ie. then handler in the chain
      }
      else {
        throw reason; // this return value will be picked up by the next onReject, ie. catch handler in the chain
      }
    });
};
```

## Writing tests

TDD is strongly encouraged

### Feature tests

* Very few tests
* Happy path, sad path
* Business driven
* Full application execution

### Integration tests

* e.g. controllers
* [Mock or stub](http://martinfowler.com/articles/mocksArentStubs.html) controller dependencies using Breadboard
* Compose scenarios using pre-canned, reusable, injectable mock dependencies, where appropriate 

### Unit tests

* Anything that can be tested in isolation, to achieve 100% coverage
* Branch coverage rather than line coverage
* Test public functions only
* Test interface, not implementation
* In general, mock or stub dependencies to help drive different scenarios
* Don't mock or stub third part dependencies if the functionality they provide is trivial (e.g. some lodash functions)
