import React from 'react';
import HtmlWrapper from './html_wrapper';

const Main = () => (
  <div className="main">
    <span>
      Main page
    </span>
  </div>
);

const PageMain = () => (
  <HtmlWrapper>
    <Main />
  </HtmlWrapper>
);

export default {
  main: <PageMain />,
};
