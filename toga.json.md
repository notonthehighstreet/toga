# toga.json

 > Configure your components project to play nice with Toga.

This file is required to tell Toga more information about the components in you project.

[Example toga.json](/components/toga.json)


## vendor (object)

As components normally share some 3rd party code, the `vendor` object is here to allow Toga to extract this code away from the components code.
This allows the component JS to stay as small possible.

The vendor object requires a `componentName`.

### componentName (string)

This is the name of the component which contains the vendor code.
Take a look at our [example vendor component](/tests/e2e/components/vendor/index.js).

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

## staticComponents (array: optional)

An array of components that should have there respective .html files generated at build time

E.g. ```
"staticComponents" : ["header", "footer"]
```
