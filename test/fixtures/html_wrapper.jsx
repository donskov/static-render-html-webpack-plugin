import React from 'react';

const HtmlWrapper = (props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>
        Static render html webpack plugin
      </title>
    </head>
    <body>
      { props.children }
    </body>
  </html>
);

export default HtmlWrapper;
