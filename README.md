# noths-frontend

[![Test Coverage](https://codeclimate.com/repos/56d6f79a4304122460007970/badges/70c559a8e7dbfc647eb1/coverage.svg)](https://codeclimate.com/repos/56d6f79a4304122460007970/coverage)
[![CircleCI](https://circleci.com/gh/notonthehighstreet/noths-frontend.svg?style=svg&circle-token=ed76cf8859cf269882e89ae499b99d61d6e4cd6e)](https://circleci.com/gh/notonthehighstreet/noths-frontend)

# Consuming a Component

Toga Components rely on NOTHS [Styles-Toolkit](https://github.com/notonthehighstreet/styles-toolkit) to get the core styles.
The Styles-Toolkit CSS file must be included in your project.

To render a component, the CSS, JavaScript and HTML must be pulled into your app.
We have an example node app doing this for :

 * [one component](example/routes/one-component.js)
 * [multiple components](example/routes/multiple-components.js)

# Browser Support

Some components need special styles to make old version of Internet Explorer work.
To ensure you get these styles in your app, please add the following script to your `head`:

```javascript
<script>
      var dm = document.documentMode;
      document.documentElement.className += dm ? ' oldie ie' + dm : '';
</script>
```

## Contributing

 > More information about how to contribute and run the project locally.

[Contributing.md](CONTRIBUTING.md)
