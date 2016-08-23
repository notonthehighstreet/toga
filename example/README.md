# Examples

 > An example showing how an external (NodeJS) App would consume components

## Running

As the example is purposely a separate app, we must first start Toga, then the example app.
From the project root run :

 * `npm start`
 * `npm run example`

Each Route within this app showcases how to consume a different type of component.

 * A single components : http://localhost:3000/one
 * Multiple components : http://localhost:3000/multiple
 * Multiple components that talk to each other : http://localhost:3000/communication
 * Nested components : http://localhost:3000/nested

## Details

The NodeJS app sets-up the component required by including any Javascript and CSS urls.
It then passes these URLs to a template which simply wraps them either a `script` or `link` tag.

Our NodeJS app also makes a promised call to the html which it will resolve and pass the result straight into the template.

### Javascript

All javascript files will also be served with their `.map` files.
They are also optionally served as `.min.js` or `.js`.

#### Component Javascript

The endpoint to get the JS for a single component is :

 `http://localhost:8080/v1/component-name.min.js`

If you want to include multiple components it is :

 `http://localhost:8080/v1/components.min.js?components=["component-name","another-component-name"]`

#### Vendor Javascript

In our examples we have setup a `vendor` javascript bundle, which is reached via a Toga endpoint:

 `http://localhost:8080/v1/components-vendor-bundle.min.js`

We dont want the following to be included in every component js, so we set them to be external  :
 * React
 * React-Dom
 * React-bem-helper

This was achieved by updating the [toga.json](/toga.json).
The `vendor.bundle` object states a mapping between the node-module being required and the global variable name.
The 2nd part required to get this to work is the `vendor.componentName`.
Currently, the mapping mentioned then also has to be setup inside a real component.
The `vendor.componentName` tells Toga which component does this.
Our example uses [tests/components/vendor/index.js](/tests/components/vendor/index.js).

### Stylesheets

All javascript files will also be served with their `.map` files.
They are also optionally served as `.min.css` or `.css`.

#### Component StyleSheet

The endpoint to get the CSS for a single component is :

 `http://localhost:8080/v1/component-name.min.css`

If you want to include multiple components it is :

 `http://localhost:8080/v1/components.min.css?components=["component-name","another-component-name"]`

#### Core Styles

Often, there will already be an existing stylesheet which includes a few core-styles.
So Toga provides a convenience url which is setup with the `coreStyles` string of the [/toga.json](toga.json) file.

 `http://localhost:8080/v1/core.min.css`

These means your apps which consume components won't need to be redeployed to get the latest styles,
simply update Toga and all consuming apps will be updated automatically.


### HTML

Our example app make a call to Toga for the html :

 `http://localhost:8080/v1/component-name.raw.html`

Some of our examples appends a `props` query string which is a JSON object.
These props are passed down to the component and affect how the server renders the HTML.

 `?props={"prop-name":"prop-value"}`
