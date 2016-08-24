# TOGA

[![Test Coverage](https://codeclimate.com/repos/56d6f79a4304122460007970/badges/70c559a8e7dbfc647eb1/coverage.svg)](https://codeclimate.com/repos/56d6f79a4304122460007970/coverage)
[![CircleCI](https://circleci.com/gh/notonthehighstreet/toga/tree/master.svg?style=svg&circle-token=fad4a71fbda4e23fb196f5e4c63384bf7db66b6c)](https://circleci.com/gh/notonthehighstreet/toga/tree/master)

Toga magically serves universal components which are pre-rendered on the server and initialised on the client so that they can be instantly used with *any* web-app.

## Toga serves universal components?

> universal components are those that are written once, and can be run on the server and in the browser.

Toga can serve components from any directory and is setup to take the sting out of setting up Universal Components yourself.
Once running, Toga automatically gives you end points so that you can quickly access the components rendered HTML, compiled CSS and compiled JS;

Using the Toga end-points, you can quickly add the component assets (HTML, CSS + JS) into your Ruby, PHP, Perl or *any* web-app.
The component is then ready to use.

This means you can include the latest components and technology in your existing apps without having to do a complete rebuild.

## What type of components?

Currently, Toga supports any React component.
This could be redux-based, a stateless function or *any component* built using React.

In the future, there is no reason why other component types can't be supported.

## Details. How do I do this?

To render a component, you will need to :

  * Write a universal component e.g. [test-one](/tests/e2e/components/test-one/index.js)
  * Add a [toga.json](/toga.json.md) file to the root of your components project
  * for now, install required build tools
    * `npm i -S node-sass webpack css-loader style-loader sass-loader notonthehighstreet/toga-loader babel-loader postcss-loader svg-inline-loader file-loader json-loader `
  * Run Toga (pointing it to your components directory)
  * include the toga-served component assets in your app

### ...Just show me an example?

We have an example node app doing this for :

 * [one component](/example/routes/one-component.js)
 * [multiple components](/example/routes/multiple-components.js)

Checkout [example/README.md](/example/README.md) more detail about the examples.

## Run Toga (quick start!)

This will run Toga, which contains a sample component :

 * `npm i notonthehighstreet/toga`
 * `brew install redis`
 * `npm run dev`
 * Go to `http://localhost:8080`

### Serving components from Toga

Add a `toga.json` file to the root of the project which contains the components.
The components project also needs to linked to Toga using `npm link`.

  * run `npm link` in the root of your project
  * run `npm link project-name` from within toga
  * run `npm run dev -- --components=project-name`
  * Go to `http://localhost:8080/v1/component-name`
## Contributing

 > More information about how to contribute and run the project locally.

[Contributing.md](CONTRIBUTING.md)
