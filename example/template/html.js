module.exports = (opts) => {
  return `
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        ${opts.styles.map(style => `<link href=${style} rel="stylesheet" />`).join('')}
      </head>
      <body id="${opts.id}">
      <div id="body"  >${opts.body || ''}</div>
      <div id="footer"  >${opts.footer || ''}</div>
      <div id="newsletter"  >${opts.newsletter || ''}</div>
      <div id="test"  >${opts.test || ''}</div>
      ${opts.scripts.map(script => `<script src=${script} ></script>`).join('')}
      </body>
      </html>
    `;
};
