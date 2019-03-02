import React from 'react';
import PropTypes from 'prop-types';

const HtmlWrapper = (props) => {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>
          Static render html webpack plugin
        </title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

HtmlWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HtmlWrapper;
