import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import HtmlWrapper from './html_wrapper.jsx';

const Main = () => (
  <div className="main">
    <span>
      Main page
    </span>
  </div>
);

const pageMain = (
  <HtmlWrapper>
    <Main />
  </HtmlWrapper>
);

export default {
  main: renderToStaticMarkup(pageMain),
};
