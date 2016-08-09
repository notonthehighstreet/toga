# Building components for Toga

## Where to create the component

Inside of the [Noths-frontend](https://github.com/notonthehighstreet/noths-frontend) project there is a components folder which is where the components currently live. This is likely to change in the future.

Creating a new component you should create a new directory.

Each components entry point is an `index.js` file.

## Component code
Each components should be written as a [React](https://facebook.github.io/react/) components.

The component should have a default export (ES6 preferred not required) of the component.

```js
import React from 'react';

class HelloWorld extends React.Component {
    render() {
        return <div className="toga-helloWorld">Hello World</div>;
    }
}

export default HelloWorld;
```

## Styles
Styles for each component should be kept in the directory of the component, this helps make sure that the components do not rely on any styles other than the [styles toolkit](https://github.com/notonthehighstreet/styles-toolkit).

You should import your styles inside your component. The component `index.js` is recommended E.g:
```js
import React from 'react';

import './styles.scss';

class HelloWorld extends React.Component {
    render() {
        return <div className="toga-helloWorld">Hello World</div>;
    }
}

export default HelloWorld;
```

These will then be used by [webpack](https://webpack.github.io/) to bundle the `components.css` file.

We are looking to follow [BEM](http://getbem.com/introduction/) as a way to organise styles and avoid nesting.

For any styles are are needed across the site it is recommended that they are added to the [styles toolkit](https://github.com/notonthehighstreet/styles-toolkit) as these styles are a dependency of toga-components.


## Responsive design
When writing styles for components write them mobile first then overriding styles for desktop.

You should rarely have to use the mobile breakpoint. Look at the helper classes provided by the styles toolkit.

__Incorrect__
```css
.toga-newsletter-subscribe {

  @include breakpoint(large) {
    padding: 5px;
    border: 1px solid black;
  }

  @include breakpoint(small) {
    padding: 10px;
    border: 2px solid black;
  }
}
```

__Correct__
```css
.toga-newsletter-subscribe {
  padding: 10px;
  border: 2px solid black;

  @include breakpoint(large) {
    padding: 5px;
    border: 1px solid black;
  }
}
```

## element class
Each component needs to preceed with the class ```toga-``` E.g.
```jsx
<div className="toga-newsletterSubscribe">
    <h1>Newsletter</h1>
</div>
```

The name after the `toga-` prefix should match the name of the component/directory name.

This helps us keep all of the components scoped and hopefully avoid any conflicts with other css on the page.

## Vendor bundle

For common packages that are used in lots of different components we havea a compiled vendor bundle. To see what packages are already included in the vendor bundle look at: `/lib/bundler/vendorFiles.js`


## Testing

The current Testing framework is [Mocha](https://github.com/mochajs/mocha) which is used to run the tests

[Chai](http://chaijs.com/api/bdd/) is used as our assertion library

With [Enzyme](http://airbnb.io/enzyme/) as our React component testing utility

Other kinds of testing are to be decided.



# Ruby integration
TODO: Create toga GEM
## Global components
The frontend controller will request all of the global components used by the app by calling the `:fetch_global_toga_components` function. This is a list of components that will need to be updated after creating another global component. This will request all of the global components and have them ready to be called in the erb files

These can then be rendered into an erb
```erb
<%= toga_render(:footer) %>
```

When components are called it stores it as part of `toga_assets` and as part of the `application.html.erb` will iterate over each of the CSS and JS files outputting them in their respective tags in the page.

## Individual components
To request an individual component you will need to call the `fetch_toga_components` method inside of the revelent controller passing in any context and locale you might need. The name of the component you are requesting is the name of the directory of the toga component. See below for a toga component called 'social-share' and passing the prodouct title as the context:
```rb
fetch_toga_components([{name: 'social-share', context: {title: @product.title }}])
```

After requesting the component you can then render the component into your erb using the `toga_render` method
```erb
<%= toga_render('social-share') %>
```
