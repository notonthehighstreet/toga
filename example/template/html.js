module.exports = (opts) => {
  const styles = opts.styles;
  const footer = opts.footer;
  const newsletter = opts.newsletter;
  const scripts = opts.scripts;
  return `
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        ${styles.map(style => `<link href=${style} rel="stylesheet" />`).join('')}
      </head>
      <body>
      <div id="footer"  >${footer || ''}</div>
      <div id="newsletter"  >${newsletter || ''}</div>
      ${scripts.map(script => `<script src=${script} ></script>`).join('')}
      </body>
      </html>
    `;
};
