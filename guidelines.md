# Toga Guidelines

These aim to achieve a consistent domain language and coding practices throughout the project.

## Domain concepts

These are concepts specific to Toga.

| concept | description |
| ------- | ----------- |
| component, <br>Toga component | A front-end component, as they would be developed for Toga consumers. |
| consumer | A client requesting Toga components, eg. as a static HTML page with a couple of `<script>` and `<link rel="stylesheet">` tags. |
| scope id, <br>`scopeId` | The unique identifier for a component instance, used for eg. mounting of React components, scoping CSS, etc. |
| components bundle | A bundle containing code of multiple components. |
| components vendor bundle | A bundle containing a set of shared 3rd party dependencies. |
| component context | Data to bootstrap a component with. Think of it as options rather than data. |

## Convention related concepts

| concept | description |
| ------- | ----------- |
| module | a CommonJS module |
| bundle | a single file containing Webpack wrapped CommonJS modules |
| package | a self-contained NPM compatible module stored in `/packages` |

## Code structure

### Directories

| path | description |
| ---- | ----------- |
| `/components` | contains Toga components |
| `/lib` | contains code of the Toga server itself |
| `/packages` | constains packages to use throughout Toga components |

### Modules

#### One function per module
Include one function per module, AKA the Substack pattern. In other words, your module should end with this:

```js
module.exports = function(/*my args*/) {
  // my code
}
```
or
```js
module.exports = varNamePointingToMyFunction;
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
