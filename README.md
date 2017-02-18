Static Render HTML Webpack Plugin
=================================
[![npm version](https://badge.fury.io/js/static-render-html-webpack-plugin.svg)](https://badge.fury.io/js/static-render-html-webpack-plugin)
[![Build status](https://travis-ci.org/donskov/static-render-html-webpack-plugin.svg)](https://travis-ci.org/donskov/static-render-html-webpack-plugin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/donskov/static-render-html-webpack-plugin/blob/master/LICENSE)
<br/>
[![NPM](https://nodei.co/npm/static-render-html-webpack-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/static-render-html-webpack-plugin/)

This is a webpack plugin that simplifies creation of HTML static files using webpack. It will be useful if you are creating a PWA and you need as quickly as possible to show the user first paint.

Installation
------------
Install the plugin with npm:
```shell
$ npm install static-render-html-webpack-plugin --save-dev
```

Basic Usage
-----------

```javascript
var StaticRenderHtmlWebpackPlugin = require('static-render-html-webpack-plugin');
var webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'main.js'
  },
  plugins: [
    new StaticRenderHtmlWebpackPlugin({
        entry: path.join(__dirname, './shells/index.jsx');
    })
  ]
};
```

```javascript
// index.jsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const IndexPage = (props) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>
        Website title
      </title>
    </head>
    <body>
      <div id=""root>
        <span>
	        Index page
        </span>
      </div>
    </body>
  </html>
);

export default {
  index: renderToStaticMarkup(IndexPage),
};
```

This will generate a file `dist/index.html` containing the following:
```html
<html lang="en">
  <head>
    <meta charSet="utf-8" />
    <title>
      Website title
    </title>
  </head>
  <body>
    <div id=""root>
      <span>
         Index page
      </span>
    </div>
  </body>
</html>
```

# License

This project is licensed under [MIT](https://github.com/donskov/static-render-html-webpack-plugin/blob/master/LICENSE.md).