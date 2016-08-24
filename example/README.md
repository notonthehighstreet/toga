# Examples

 > An example showing how an external (NodeJS) App would consume components

## Running

As the example is a demo of how a separate app would consume components from Toga, we must first start Toga, then the example app. From the project root run :

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

This was achieved by updating the `toga.json`.
To understand more about how to set this up take a look at [/toga.json.md](toga.json.md#vendor)


### Stylesheets

All javascript files will also be served with their `.map` files.
They are also optionally served as `.min.css` or `.css`.

#### Component StyleSheet

The endpoint to get the CSS for a single component is :

 `http://localhost:8080/v1/component-name.min.css`

If you want to include multiple components it is :

 `http://localhost:8080/v1/components.min.css?components=["component-name","another-component-name"]`

#### Core Styles

If setup with the `coreStyles` string of the `toga.json` file, this end-point will be:

 `http://localhost:8080/v1/core.min.css`

For more information on core styles read [/toga.json.md](/toga.json.md#corestyles-string-optional)


### HTML

Our example app make a call to Toga for the html :

 `http://localhost:8080/v1/component-name.raw.html`

Some of our examples appends a `props` query string which is a JSON object.
These props are passed down to the component and affect how the server renders the HTML.

 `?props={"prop-name":"prop-value"}`
