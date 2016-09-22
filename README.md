# TOGA

[![Test Coverage](https://codeclimate.com/repos/56d6f79a4304122460007970/badges/70c559a8e7dbfc647eb1/coverage.svg)](https://codeclimate.com/repos/56d6f79a4304122460007970/coverage)
[![CircleCI](https://circleci.com/gh/notonthehighstreet/toga/tree/master.svg?style=svg&circle-token=fad4a71fbda4e23fb196f5e4c63384bf7db66b6c)](https://circleci.com/gh/notonthehighstreet/toga/tree/master)

Toga magically serves universal components which are pre-rendered on the server and initialised on the client so that they can be instantly used with *any* web-app.

## Toga serves universal components?

> universal components are those that are written once, and can be run on the server and in the browser.

Toga can serve components from any directory and is setup to take the sting out of setting up Universal Components yourself.
Once running, [Toga end-points](#toga-end-points) allow to access the components rendered HTML, compiled CSS and compiled JS;

Using the Toga end-points, you can quickly add the component assets (HTML, CSS + JS) into your Ruby, PHP, Perl or *any* web-app.
Using these end points you can even [pass props to the component](#passing-props-to-components)!

This means you can include the latest components and technology in your existing apps without having to do a complete rebuild.

## What type of components?

Currently, Toga supports any [React](https://github.com/facebook/react) component.
This could be a [redux-based component](/tests/e2e/components/test-redux), a stateless function or *any component* built using React.

As Javascript engineers are known to do crazy things inside components, like trying to import CSS *(what!?)* into Javascript.
This can be pesky to set up, especially on the server.

Out of the box, Toga supports the following imports:
 * SVG
 * CSS/SCSS
 * JSON

In the future, there is no reason why other component types can't be supported.

## Details. How do I do this? quick start!

This will run Toga, which contains a sample component :

```
git clone git@github.com:notonthehighstreet/toga.git
cd toga
npm install
brew install redis
npm start
```
Go to `http://localhost:8080`

How to [serve your own components](#serving-your-own-components-from-toga)

## ...Just show me an example?

We have an example node app doing this for :

 * [one component](/example/routes/one-component.js)
 * [multiple components](/example/routes/multiple-components.js)

Checkout [example/README.md](/example/README.md) more detail about the examples.

## Serving your own components from Toga

* Setup Your Components Project :
  * Write a universal component e.g. [test-one](/tests/e2e/components/test-one/index.js)
  * Add a [toga.json](/toga.json.md) file to the root of your components project
* Link your project to Toga:
  * run `npm link` in the root of your project
  * run `npm link project-name` from within toga
* Run Toga
  * `npm start -- --components=project-name`

Go to `http://localhost:8080`

## Toga end-points

Out of the box, Toga serves both minified and unminified JS and CSS as well as their SourceMaps.

### Component Assets

The endpoint to get the assets for a single component is :

 * JS : `http://localhost:8080/v1/component-name.min.js`
 * CSS : `http://localhost:8080/v1/component-name.min.css`

If you want to include multiple components it is :

 * JS: `http://localhost:8080/v1/components.min.js?components=["component-name","another-component-name"]`
 * CSS: `http://localhost:8080/v1/components.min.css?components=["component-name","another-component-name"]`

### Vendor Bundles

If you have components that share modules, like React, It makes sense to setup a Vendor bundle.
To see how to setup a vendor bundle, take a look at [/toga.json](/toga.json.md) or we have a [vendor example](/example/README.md#vendor-javascript).

This can be reached via:

 * `http://localhost:8080/v1/components-vendor-bundle.min.js`

### Core Styles

If setup with the `coreStyles` string of the `toga.json` file, this end-point will be:

 `http://localhost:8080/v1/core.min.css`

For more information on core styles read [/toga.json.md](/toga.json.md#corestyles-string-optional)


## Passing props to components

You can pass props to components, just like you would any React component.

One Toga is running and you can hit the component endpoint, user the query `?props={"prop-name":"prop-value"}` in the address bar (props must be valid JSON).  For example:

`http://localhost:8080/v1/HelloWorld.html?props={"world":"waynes"}`


## Contributing

 > More information about how to contribute and run the project locally.

[Contributing.md](CONTRIBUTING.md)
