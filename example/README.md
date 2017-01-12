# Examples

 > An example showing how an external (NodeJS) App would consume components

## Running

The example is a demo of how a separate app would consume components from Toga. From the project root run :

 * `npm run example`

Each Route within this app showcases how to consume a different type of component.

 * A single components : http://localhost:3000/one
    * Shows how to integrate a single component into your app
 * Multiple components : http://localhost:3000/multiple
    * Shows how to integrate a multiple components into your app
 * Multiple Chatty components : http://localhost:3000/communication
    * Shows how to integrate multiple components that talk/affect each other
 * Redux component : http://localhost:3000/redux
    * Shows how to integrate a Redux app/component into your own app

## Details

The NodeJS app sets-up the component required by including any Javascript and CSS urls.
It then passes these URLs to a template which simply wraps them either a `script` or `link` tag.

Our NodeJS app also makes a promised call to the html which it will resolve and pass the result straight into the template.

### Javascript + CSS

All javascript and CSS files will also be served with their `.map` files.  You can see which files/bundles are available by hitting the Toga server on :

  * `http://localhost:3001/asset-bundles`

#### Vendor Assets

In our examples we have setup a `vendor` javascript bundle, which is reached via a Toga endpoint:

We dont want the following to be included in every component js, so we set them to be external  :
 * React
 * React-Dom
 * React-bem-helper

This was achieved by updating the `toga.json`.
To understand more about how to set this up take a look at [/toga.json.md](toga.json.md#vendor)

### HTML

Our example app make a call to Toga for the html :

 `http://localhost:8080/component-name.raw.html`

Some of our examples appends a `props` query string which is a JSON object.
These props are passed down to the component and affect how the server renders the HTML.

 `?props={"prop-name":"prop-value"}`
