# TOGA

[![Test Coverage](https://codeclimate.com/repos/56d6f79a4304122460007970/badges/70c559a8e7dbfc647eb1/coverage.svg)](https://codeclimate.com/repos/56d6f79a4304122460007970/coverage)
[![CircleCI](https://circleci.com/gh/notonthehighstreet/toga.svg?style=svg&circle-token=ed76cf8859cf269882e89ae499b99d61d6e4cd6e)](https://circleci.com/gh/notonthehighstreet/toga)

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

  * Write a universal component e.g. [test-one](/tests/components/test-one/index.js)
  * Add a [toga.json](toga.json.md) file to the root of your components project
  * Run Toga (pointing it to your components directory)
  * include the toga-served component assets in your app

### ...Just show me an example?

We have an example node app doing this for :

 * [one component](example/routes/one-component.js)
 * [multiple components](example/routes/multiple-components.js)

Checkout [example/README.md](example/README.md) more detail about the examples.

### Serving components from Toga

Add a `toga.json` file to the root of the project which contains the components.

When starting Toga, be sure to add `-- --components=../project-name`. Thats it.

For more information on how to ensure your components will work with Toga read [components.md](components.md)

## Run Toga (quick start!)

```nodejs
npm i notonthehighstreet/toga
brew install redis
npm run dev
```

For more information and options to get Toga running, please see [Contributing.md](CONTRIBUTING.md)

## Contributing

 > More information about how to contribute and run the project locally.

[Contributing.md](CONTRIBUTING.md)
