# TOGA

[![Test Coverage](https://codeclimate.com/repos/56d6f79a4304122460007970/badges/70c559a8e7dbfc647eb1/coverage.svg)](https://codeclimate.com/repos/56d6f79a4304122460007970/coverage)
[![CircleCI](https://circleci.com/gh/notonthehighstreet/toga.svg?style=svg&circle-token=ed76cf8859cf269882e89ae499b99d61d6e4cd6e)](https://circleci.com/gh/notonthehighstreet/toga)

Toga magically serves front-end components which are pre-rendered on the server and initialised on the client so that they can be instantly used with *any* web-app.

## Toga Serves pre-rendered components?

Once toga is installed and running, you can tell it to use any Git-repo / NPM-package that contain web components.
Toga automatically gives you end points so that you can quickly access the components rendered HTML, compiled CSS and compiled JS;

Once the Toga-served assets (HTML, CSS + JS) have been included in your Ruby, PHP, Perl or *any* web-app,
the components will be rendered on the server and initialised on the client automatically.
The component is then ready to use and behaves as you'd expect.

This means you can include the latest components and technology in your existing apps without having to do complete a rebuild.

## What type of components?

Currently, Toga supports any React component.
This could be redux-based, a stateless function or *any component* built using React.

In the future, there is no reason why other component types can't be supported.

## Details. How do I do this?

To render a component, the CSS, JavaScript and HTML must be pulled into your app.
You need to :

  * Add a component repo to Toga
  * Run Toga
  * include the toga-served component assets in your app

We have an example node app doing this for :

 * [one component](example/routes/one-component.js)
 * [multiple components](example/routes/multiple-components.js)

### Add a component repo to Toga

update xxx to include your repo npm/git url.

For more information on how to ensure your components will work with Toga read [components.md](components.md)

## Run Toga (quick start!)

```nodejs
npm i toga
brew install redis
npm run dev
```

For more information and options to get Toga running, please see [Contributing.md](CONTRIBUTING.md)

## Contributing

 > More information about how to contribute and run the project locally.

[Contributing.md](CONTRIBUTING.md)
