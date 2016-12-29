# toga.json

 > Configure your components project to play nice with Toga.

This file is required to tell Toga more information about the components in you project.

[Example toga.json](/components/toga.json)

## coreStyles (string: optional)

Often, in order for your components to look 100% correct, they will rely on an existing stylesheet.
Toga provides a `coreStyles` option so that when viewing your components within Toga, they have these styles applied.

 `"coreStyles": "//cdn.notonthehighstreet.com/styles-toolkit/0.2.1/toolkit.css"`

Once supplied, Toga also provides this as convenience URL which is a redirect to the `coreStyles`.  This URl is available at

`http://localhost:8080/v1/core.css`

This mean your apps (which consume components) won't need to be redeployed to get the latest styles,
simply update Toga and all consuming apps will be updated automatically.

## vendor (object)

As components normally share some 3rd party code, the `vendor` object is here to allow Toga to extract this code away from the components code.
This allows the component JS to stay as small possible.

The vendor object requires a `componentName` and `bundle`.

### componentName (string)

This is the name of the component which contains the vendor code.
Take a look at our [example vendor component](/tests/e2e/components/vendor/index.js).

### bundle (object)

This object states a mapping between the node-module being required and the global variable name.
It should map directly to what is being set within your `vendor` component.

## components (object)

This object is needed to tell Toga about where the components reside within your project.

### path (string)

This should be the path of the directory where the components reside within the project.

Toga will read this directory and try to render every sub-directory as a component.
Currently it assumes the entrance point to each component is `index.js`.

### ignore (string: optional)

As mentioned aboth (in the `path` section), by default, every sub-directory is treated as a component.
If you have any directories within this `path` directory that is not a component, you should tell Toga here.


### Bundles (array: optional)

An array of component bundles that you want bundling.
Each bundle is an array of component names.

E.g. ```
"bundles" : [
  {
    "name": "products-page",
    "components": ["social-share", "campaign-badge"]
  }
]
```
